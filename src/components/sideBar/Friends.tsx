import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as S from '../../styles/sideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import api from '../../utils/axios';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

interface FriendsProps {
  toggleDmChat: (friendNickname: string) => void;
}

interface Friend {
  friendId: number;
  friendNickname: string;
  status?: string; // 'ONLINE', 'OFFLINE', 'IN_GAME'
}

interface FriendStatusData {
  userId: number;
  status: string;
  isOnline?: boolean;
  lastSeen?: string;
  gameRoomId?: string;
}

interface SocketError {
  code: string;
  message: string;
}

export default function Friends({ toggleDmChat }: FriendsProps) {
  const [friends, setFriends] = useState<Friend[]>([]); // 친구 목록을 저장할 상태
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null); // DM할 친구 저장
  const socketRef = useRef<Socket | null>(null); // 소켓 연결 저장 참조
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  // 친구 상태 업데이트 함수
  const updateFriendStatus = (statusData: FriendStatusData): void => {
    const userId = parseInt(statusData.userId.toString(), 10);
    const status = statusData.status;

    console.log(`친구 상태 업데이트 처리: ID=${userId}, 상태=${status}`);
    console.log(
      '업데이트 전 친구 목록:',
      friends.map(f => ({
        id: f.friendId,
        name: f.friendNickname,
        status: f.status,
      })),
    );

    setFriends((prevFriends: Friend[]) => {
      // 친구 목록에 해당 userId가 있는지 확인 (타입 확인 추가)
      const friendIndex = prevFriends.findIndex(
        friend => parseInt(friend.friendId.toString(), 10) === userId,
      );

      console.log(
        `친구 ID ${userId} 찾기 결과: ${
          friendIndex !== -1 ? '찾음' : '없음'
        }, 인덱스: ${friendIndex}`,
      );

      if (friendIndex === -1) {
        console.log(
          '친구를 찾지 못했습니다. 친구 ID 목록:',
          prevFriends.map(f => f.friendId),
        );
        return prevFriends;
      }

      // 친구 상태 업데이트
      const updatedFriends = [...prevFriends];
      updatedFriends[friendIndex] = {
        ...updatedFriends[friendIndex],
        status: status,
      };

      console.log(
        `친구 ${updatedFriends[friendIndex].friendNickname}(${userId})의 상태를 ${status}로 업데이트함`,
      );
      return updatedFriends;
    });
  };

  // 소켓 연결 함수
  const connectSocket = (): void => {
    try {
      // 로컬스토리지에서 정보 가져오기
      const currentUserId = localStorage.getItem('userId');
      setUserId(currentUserId);
      const nickname = localStorage.getItem('nickname') || '';
      const token = localStorage.getItem('accessToken');

      console.log('친구 상태 소켓 연결 시도:', {
        userId: currentUserId,
        nickname,
      });

      if (!currentUserId || currentUserId === '0') {
        console.error(
          '유효한 사용자 ID를 찾을 수 없습니다. 소켓 연결을 중단합니다.',
        );
        return;
      }

      if (socketRef.current && socketConnected) {
        console.log('이미 소켓이 연결되어 있습니다.');
        return;
      }

      if (socketRef.current) {
        console.log('기존 소켓 연결 해제');
        socketRef.current.disconnect();
        setSocketConnected(false);
      }

      const options = {
        path: '/socket.io',
        transports: ['websocket'],
        query: {
          userId: parseInt(currentUserId, 10),
          nickname,
          token,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      };

      // API 서버와 동일한 URL 사용
      const backendUrl = api.defaults.baseURL || '';
      console.log('Backend URL:', backendUrl);

      // 소켓 서버 URL 결정 (백엔드와 동일한 도메인 사용)
      const socketServerUrl = backendUrl || 'http://localhost:3001';

      const socket = io(`${socketServerUrl}/friendStatus`, options);
      socketRef.current = socket;

      // 소켓 연결 시 상태 변경 이벤트 직접 전송
      socket.on('connect', () => {
        console.log('소켓 연결 성공! Socket ID:', socket.id);
        setSocketConnected(true);

        // 소켓 연결 즉시 상태 업데이트 요청 (온라인 상태로)
        const changeStatusData = {
          userId: parseInt(currentUserId, 10),
          inGame: false,
          gameRoomId: null,
        };

        console.log('온라인 상태로 변경 요청 전송:', changeStatusData);
        socket.emit('GAME_STATUS_CHANGE', changeStatusData);
      });

      // 연결 에러 이벤트
      socket.on('connect_error', (error: Error) => {
        console.error(`연결 에러: ${error.message}`);
        setSocketConnected(false);
      });

      // 서버 에러 이벤트
      socket.on('ERROR', (data: { error: SocketError }) => {
        console.error(`서버 에러: ${data.error.code} - ${data.error.message}`);
      });

      // 친구 상태 업데이트 이벤트
      socket.on('friend_status', (data: any) => {
        console.log('친구 상태 수신:', data);

        if (data && typeof data === 'object') {
          const userId = data.userId;
          const status = data.status;

          if (userId && status) {
            console.log(`친구 ${userId}의 상태 업데이트: ${status}`);
            updateFriendStatus({ userId, status });
          }
        }
      });

      // 일반 친구 상태 이벤트 (다른 클라이언트로부터의 이벤트)
      socket.on('FRIEND_STATUS', (data: any) => {
        console.log('FRIEND_STATUS 이벤트 데이터:', data);

        const userId = data.userId || (data.data && data.data.userId);
        const status = data.status || (data.data && data.data.status);

        if (userId && status) {
          console.log(`친구 상태 업데이트: ID=${userId}, 상태=${status}`);
          updateFriendStatus({ userId, status });
        } else {
          console.error('인식할 수 없는 친구 상태 데이터 형식:', data);
        }
      });

      // 개인 친구 상태 업데이트 이벤트
      const myUserId = parseInt(currentUserId, 10);
      const personalEventName = `friend_status_for_${myUserId}`;

      socket.on(personalEventName, (data: any) => {
        console.log(
          `개인 친구 상태 이벤트(${personalEventName}) 데이터:`,
          data,
        );

        if (data && typeof data === 'object') {
          const userId = data.userId;
          const status = data.status;

          if (userId && status) {
            console.log(
              `개인 친구 상태 업데이트: ID=${userId}, 상태=${status}`,
            );
            updateFriendStatus({ userId, status });
          }
        }
      });

      // 연결 종료 이벤트
      socket.on('disconnect', () => {
        console.log('소켓 연결이 종료되었습니다.');
        setSocketConnected(false);
      });
    } catch (error) {
      console.error('소켓 초기화 중 알 수 없는 에러가 발생했습니다.', error);
      setSocketConnected(false);
    }
  };

  // 상태에 따른 색상 반환 함수
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'ONLINE':
        return '#4caf50'; // 초록색
      case 'IN_GAME':
        return '#ff5722'; // 주황색
      case 'OFFLINE':
      default:
        return '#888888'; // 회색
    }
  };

  // 컴포넌트가 마운트될 때 친구 목록을 가져오는 함수
  useEffect(() => {
    // 로컬스토리지에서 사용자 ID 가져오기
    const currentUserId = localStorage.getItem('userId');
    setUserId(currentUserId);
    console.log('로컬스토리지의 사용자 ID:', currentUserId);

    if (!currentUserId || currentUserId === '0') {
      console.error(
        '유효한 사용자 ID를 찾을 수 없습니다. 로그인 상태를 확인하세요.',
      );
      return;
    }

    // 로컬스토리지에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    console.log(
      '로컬스토리지의 토큰:',
      token ? token.substring(0, 15) + '...' : 'null',
    );

    const getFriends = async (): Promise<void> => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get('/api/friend', { headers });
        const friendsList = response.data.data.friends || [];

        const friendsWithStatus = friendsList.map((friend: Friend) => ({
          ...friend,
          status: 'OFFLINE',
        }));

        setFriends(friendsWithStatus);
        console.log('상태가 업데이트된 친구 목록:', friendsWithStatus);
      } catch (error) {
        console.error('친구 목록을 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    getFriends().then(() => {
      // 친구 목록을 가져온 후 소켓 연결
      console.log('친구 목록 로드 완료, 소켓 연결 시작');
      connectSocket();
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socketRef.current) {
        console.log('컴포넌트 언마운트: 소켓 연결 해제');
        socketRef.current.disconnect();
        setSocketConnected(false);
      }
    };
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <S.FriendsDiv>
      <p>친구목록 {socketConnected ? '(연결됨)' : '(연결 중...)'}</p>

      {friends.length > 0 ? (
        friends.map(friend => (
          <S.FrindDiv key={friend.friendId}>
            <span>{friend.friendNickname}</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  toggleDmChat(friend.friendNickname);
                }}
              >
                DM
              </button>
              <FontAwesomeIcon
                icon={faCircle}
                style={{
                  fontSize: '10px',
                  color: getStatusColor(friend.status || 'OFFLINE'),
                  marginLeft: '5px',
                }}
              />
            </div>
          </S.FrindDiv>
        ))
      ) : (
        <p>친구가 없습니다.</p>
      )}
    </S.FriendsDiv>
  );
}
