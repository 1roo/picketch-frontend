import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface TopComponentsProps {
  socket: any;
  gameTitle: string;
  managerId: number;
  keyword: string;
  currentRound: number;
  maxRound: number;
  currentTurnUserId: number | undefined;
  isGameEnd: boolean;
  isGameStart: boolean;
  remainingTime: number | undefined;
  isNextRoundSettled: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  padding: 10px;
  background-color: #101010;
  border-radius: 10px;
  flex-wrap: nowrap;
  gap: 5px;
`;

const RoomTitle = styled.span`
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  color: #d8ff91;
  min-width: 140px;
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Timer = styled.span`
  font-size: 1.1em;
  font-weight: bold;
  color: white;
  min-width: 50px;
`;

const ReadyButton = styled.button<{ $isReady: boolean }>`
  width: 90px;
  height: 32px;
  background-color: ${(props) => (props.$isReady ? '#d8ff91' : 'gray')};
  color: ${(props) => (props.$isReady ? '#101010' : '#d8ff91')};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

const ExitButton = styled.span`
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1em;
  transition: color 0.3s ease;
  &:hover {
    color: #d8ff91;
  }
`;

export default function TopComponents({
  socket,
  gameTitle,
  managerId,
  keyword,
  currentRound,
  maxRound,
  currentTurnUserId,
  isGameEnd,
  isGameStart,
  remainingTime,
  isNextRoundSettled,
}: TopComponentsProps) {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const { gameId } = useParams(); // ✅ 현재 게임 ID 가져오기
  const userId = Number(localStorage.getItem('userId'));
  console.log('임시', isGameStart);
  const handleReady = () => {
    const newReadyState = !isReady;
    setIsReady(newReadyState);

    // ✅ "readyGame" 소켓 이벤트 전송
    socket.emit('readyGame', {
      userId,
      gameId: Number(gameId),
      isReady: newReadyState,
    });
    console.log('✅ readyGame 요청 보냄:', {
      userId,
      gameId,
      isReady: newReadyState,
    });
  };

  const handleStart = () => {
    socket.emit('startGame', {
      userId,
      gameId: Number(gameId),
    });
  };

  const handleLeaveGame = () => {
    if (!gameId) {
      console.warn('🚨 gameId가 존재하지 않습니다!');
      return;
    }
    socket.emit('leaveGame', { gameId });
    socket.disconnect();
    navigate('/game-list-page');
  };
  console.log('유저아이디', userId);
  console.log('매니저 아이디', managerId);
  return (
    <Container>
      {maxRound && `${currentRound} / ${maxRound} 라운드`}
      <RoomTitle>방제: {gameTitle || '게임 제목 없음'}</RoomTitle>
      {isNextRoundSettled && remainingTime}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {keyword && userId === currentTurnUserId
        ? `키워드는       ' ${keyword ? keyword : ''}`
        : ''}
      {!isGameStart && (
        <ReadyButton
          $isReady={isReady}
          onClick={managerId === userId ? handleStart : handleReady}
        >
          {managerId === userId ? 'START' : 'READY'}
        </ReadyButton>
      )}
      {isGameStart && isGameEnd && '모든 라운드 종료'}
      <ExitButton onClick={handleLeaveGame}>나가기</ExitButton>
    </Container>
  );
}
