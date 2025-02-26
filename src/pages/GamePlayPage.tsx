import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatBox from '../components/gamePlayPage/ChatBox';
import GameDrawing from '../components/gamePlayPage/GameDrawing';
import TopComponents from '../components/gamePlayPage/TopComponent';
import UserList from '../components/gamePlayPage/UserList';
import {
  PageContainer,
  CenterComponents,
} from '../styles/gameplayPage/gameplayPageStyle';
import socket from '../socket/gameSocket';

export default function GamePlayPage() {
  const { gameId } = useParams();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [gameTitle, setGameTitle] = useState(
    location.state?.gameName || '게임 제목 없음'
  );
  const [managerId, setManagerId] = useState<number>(0);

  useEffect(() => {
    socket.on('updateGameInfo', (response) => {
      console.log('🔥 서버에서 받은 updateGameInfo 응답:', response);
      if (response.type === 'SUCCESS') {
        setUsers(response.data.players);
        setGameTitle(response.data.gameName);
        setManagerId(response.data.managerId);
      }
    });
    socket.on('endRound', (response) => {
      console.log('🔥 서버에서 받은 endRound 응답:', response);
    });

    return () => {
      if (gameId) {
        const userId = Number(localStorage.getItem('userId'));

        // ✅ 페이지 나갈 때 자동으로 `leaveGame` 요청 전송
        socket.emit('leaveGame', { userId, gameId: Number(gameId) });
        console.log('🚪 페이지 떠날 때 leaveGame 요청 보냄:', {
          userId,
          gameId,
        });

        socket.off('updateGameInfo');
      }
    };
  }, [gameId]);

  return (
    <PageContainer>
      <TopComponents
        socket={socket}
        gameTitle={gameTitle}
        managerId={managerId}
      />
      <CenterComponents>
        <UserList users={users} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <GameDrawing socket={socket} />
          <ChatBox socket={socket} />
        </div>
      </CenterComponents>
    </PageContainer>
  );
}
