import styled from "styled-components";
import { GameRoom } from "../interfaces/GameRoom";

const GameRoomContainer = styled.div`
  position: relative;
  border: 2px solid #bada55;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  font-size: 16px;
  transition: 0.3s;
  width: 100%;
  min-height: 40px;
  justify-content: space-between;

  &:hover {
    background-color: #bada55;
    color: black;
  }

  @media (max-width: 768px) {
    min-height: 35px;
  }
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LockIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PlayerInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const GameRoomBox: React.FC<GameRoom> = ({
  id,
  title,
  isPrivate,
  playerCount,
}) => {
  return (
    <GameRoomContainer>
      <RoomHeader>
        <span>{title}</span>
        {isPrivate && <LockIcon>🔒</LockIcon>}
      </RoomHeader>
      <PlayerInfo>
        <span>👥 {playerCount}</span>
      </PlayerInfo>
    </GameRoomContainer>
  );
};

export default GameRoomBox;
