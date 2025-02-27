import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams, useLocation } from 'react-router-dom';
import ChatBox from '../components/gamePlayPage/ChatBox';
import GameDrawing from '../components/gamePlayPage/GameDrawing';
import TopComponents from '../components/gamePlayPage/TopComponent';
import UserList from '../components/gamePlayPage/UserList';
import {
  PageContainer,
  CenterComponents,
} from '../styles/gameplayPage/gameplayPageStyle';

export default function GamePlayPage() {
  const { gameId } = useParams();
  const [users, setUsers] = useState([]);
  const location = useLocation();

  const [gameTitle, setGameTitle] = useState(
    location.state?.gameName || '게임 제목 없음'
  );
  const [managerId, setManagerId] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [maxRound, setMaxRound] = useState<number>(0);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [isStartGame, setIsStartGame] = useState<boolean>(false);
  const [currentTurnUserId, setCurrentTurnUserId] = useState<
    number | undefined
  >();

  const socketRef = useRef<Socket | null>(null); // useRef로 소켓을 관리

  // 새로고침, 뒤로가기 방지
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    const handlePopState = () => {
      if (
        !window.confirm(
          '진행중인 게임은 저장되지 않습니다. 게임을 나가시겠습니까?'
        )
      ) {
        window.history.pushState(null, '', window.location.href);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    window.history.pushState(null, '', window.location.href);
  });

  const userId = localStorage.getItem('userId');
  const isManager = localStorage.getItem('isManager');

  // 소켓 연결: useRef를 사용하여 한 번만 연결되도록 설정
  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io(`${process.env.REACT_APP_API_BASE_URL}/game`, {
        query: { gameId, userId: Number(userId) },
        transports: ['websocket'],
      });

      socketRef.current = newSocket;

      if (isManager) {
        setManagerId(Number(userId));
      }

      newSocket.on('updateGameInfo', (data: any) => {
        console.log('🔥 updateGameInfo 이벤트 수신:', data);
        if (data && data.data) {
          setUsers(data.data.players || []);
          setGameTitle(data.data.gameName || '게임 제목 없음');
        }
      });

      newSocket.on('connect', () => {
        console.log('✅ 시소켓 연결 성공, 소켓 ID:', newSocket.id);
        newSocket.emit('joinGame', {
          gameId: Number(gameId),
          userId: Number(userId),
        });
      });

      newSocket.on('connect_error', (err) => {
        console.error('❌ 소켓 연결 실패:', err);
      });

      newSocket.on('startGame', (response: any) => {
        if (response.type === 'SUCCESS') {
          setKeyword(response.data.keyword);
          setIsStartGame(true);
        }
      });

      newSocket.on('nextTurn', (response: any) => {
        if (response.type === 'SUCCESS') {
          setKeyword(response.data.keyword);
        }

        if (response.type === 'ERROR') {
          newSocket.emit('endGame');
        }
      });

      return () => {
        console.log('🚪 게임 페이지 떠날 때 소켓 연결 해제');
        newSocket.emit('leaveGame', { gameId });
        newSocket.disconnect();
      };
    }
  }, [gameId]);

  return (
    <PageContainer>
      <TopComponents
        socket={socketRef.current}
        gameTitle={gameTitle}
        managerId={managerId}
        keyword={keyword}
        currentRound={currentRound}
        maxRound={maxRound}
        currentTurnUserId={currentTurnUserId}
        isGameEnd={isGameEnd}
        isStartGame={isStartGame}
      />

      <CenterComponents>
        <UserList users={users} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {socketRef.current ? (
            <>
              <GameDrawing socket={socketRef.current} />
              <ChatBox socket={socketRef.current} />
            </>
          ) : (
            <p>소켓 연결 중...</p>
          )}
        </div>
      </CenterComponents>
    </PageContainer>
  );
}
