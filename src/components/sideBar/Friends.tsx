import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as S from '../../styles/sideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import api from '../../utils/axios';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

interface FriendsProps {
  toggleDmChat: (friendId: number, friendNickname: string) => void;
}

interface Friend {
  friendId: number;
  friendNickname: string;
  status?: string; // 'ONLINE', 'OFFLINE', 'IN_GAME'
}

// 친구 상태 데이터 인터페이스 정의
interface FriendStatusData {
  userId: number;
  status: string;
  isOnline?: boolean;
  lastSeen?: string;
  gameRoomId?: string;
}

// 소켓 에러 인터페이스
interface SocketError {
  code: string;
  message: string;
}

export default function Friends({ toggleDmChat }: FriendsProps) {
  const [friends, setFriends] = useState<Friend[]>([]); // 친구 목록을 저장할 상태
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null); // DM할 친구 저장
  const socketRef = useRef<Socket | null>(null); // 소켓 연결 저장 참조

  // 소켓 연결 함수
  const connectSocket = (): void => {
    try {
      // 로컬스토리지에서 정보 가져오기
      const userId = localStorage.getItem('userId');
      const nickname = localStorage.getItem('nickname') || '';
      const token = localStorage.getItem('accessToken');

      console.log('친구 상태 소켓 연결 시도:', { userId, nickname });

      if (!userId || userId === '0') {
        console.error(
          '유효한 사용자 ID를 찾을 수 없습니다. 소켓 연결을 중단합니다.',
        );
        return;
      }

      // query 매개변수 설정
      const options = {
        path: '/socket.io',
        transports: ['websocket'],
        query: {
          userId: parseInt(userId, 10), // 문자열을 숫자로 변환
          nickname,
          token, // 인증 토큰 추가
        },
        // 재연결 관련 설정
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      };

      // API 서버와 동일한 URL 사용
      const backendUrl = api.defaults.baseURL || '';
      console.log('Backend URL:', backendUrl);

      // 소켓 서버 URL 결정 (백엔드와 동일한 도메인 사용)
      const socketServerUrl = backendUrl || 'http://localhost:3001';
      console.log('소켓 서버 URL:', socketServerUrl);

      // 소켓 연결 - 네임스페이스가 /friendStatus인지 확인
      console.log(`소켓 연결 시도: ${socketServerUrl}/friendStatus`);

      // 기존 연결이 있으면 정리
      if (socketRef.current) {
        console.log('기존 소켓 연결 해제');
        socketRef.current.disconnect();
      }

      const socket = io(`${socketServerUrl}/friendStatus`, options);
      socketRef.current = socket;

      // 소켓 연결 시 상태 변경 이벤트 직접 전송
      socket.on('connect', () => {
        console.log('소켓 연결 성공! Socket ID:', socket.id);

        // 소켓 연결 즉시 상태 업데이트 요청 (온라인 상태로)
        const changeStatusData = {
          userId: parseInt(userId, 10),
          inGame: false,
          gameRoomId: null,
        };

        // 연결 성공 후 약간의 지연을 두고 상태 변경 요청 전송
        setTimeout(() => {
          console.log('온라인 상태로 변경 요청 전송:', changeStatusData);
          socket.emit('GAME_STATUS_CHANGE', changeStatusData);
        }, 500); // 0.5초 후 상태 변경 요청
      });

      // 연결 에러 이벤트
      socket.on('connect_error', (error: Error) => {
        console.error(`연결 에러: ${error.message}`);
      });

      // 서버 에러 이벤트
      socket.on('ERROR', (data: { error: SocketError }) => {
        console.error(`서버 에러: ${data.error.code} - ${data.error.message}`);
      });

      // 친구 상태 업데이트 이벤트
      socket.on(
        'FRIEND_STATUS',
        (data: { data: FriendStatusData; type: string }) => {
          console.log(`친구 상태 업데이트 수신:`, data);
          if (data && data.data) {
            updateFriendStatus(data.data);
          }
        },
      );

      // 연결 종료 이벤트
      socket.on('disconnect', () => {
        console.log('소켓 연결이 종료되었습니다.');
      });
    } catch (error) {
      console.error('소켓 초기화 중 알 수 없는 에러가 발생했습니다.');
    }
  };

  // 친구 상태 업데이트 함수
  const updateFriendStatus = (statusData: FriendStatusData): void => {
    const userId = statusData.userId;
    const status = statusData.status;

    console.log(`친구 상태 업데이트 처리: ID=${userId}, 상태=${status}`);

    setFriends((prevFriends: Friend[]) => {
      // 이미 존재하는 친구인지 확인
      const friendExists = prevFriends.some(
        friend => friend.friendId === userId,
      );

      // 기존 친구 상태 업데이트
      const updatedFriends = prevFriends.map(friend => {
        if (friend.friendId === userId) {
          console.log(
            `친구 ${friend.friendNickname}(${friend.friendId})의 상태를 ${status}로 업데이트`,
          );
          return { ...friend, status: status };
        }
        return friend;
      });

      console.log('업데이트된 친구 목록:', updatedFriends);
      return updatedFriends;
    });
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
    const userId = localStorage.getItem('userId');
    console.log('로컬스토리지의 사용자 ID:', userId);

    if (!userId || userId === '0') {
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

        console.log('친구 목록 요청 전 헤더:', headers);
        const response = await api.get('/api/friend', { headers });
        console.log('친구 목록 응답 데이터:', response.data);

        // 친구 데이터를 상태에 저장
        const friendsList = response.data.data.friends || [];
        console.log('설정할 친구 목록:', friendsList);

        // 각 친구에게 기본 오프라인 상태 설정
        const friendsWithStatus = friendsList.map((friend: any) => ({
          ...friend,
          status: 'OFFLINE', // 기본 상태를 오프라인으로 설정
        }));

        setFriends(friendsWithStatus);
      } catch (error) {
        console.error('친구 목록을 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    getFriends(); // 함수 실행
    connectSocket(); // 소켓 연결

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socketRef.current) {
        console.log('소켓 연결 해제');
        socketRef.current.disconnect();
      }
    };
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <S.FriendsDiv>
      <p>친구목록</p>

      {friends.length > 0 ? (
        friends.map(friend => (
          <S.FrindDiv key={friend.friendId}>
            <span>{friend.friendNickname}</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  toggleDmChat(friend.friendId, friend.friendNickname);
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
