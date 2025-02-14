import React from "react";
import GameRoomBox from "../GameRoomBox";
import ActionButtons from "../ActionButtons";
import {
  ButtonContainer,
  GameListContainer,
  GameRoomsContainer,
} from "../../../styles/gameRoomStyle";

const gameRooms = [
  {
    id: 1,
    title: "너가 그렇게 그림을 잘 그려?",
    isPrivate: true,
    playerCount: 4,
  },
  { id: 2, title: "퀴즈 마스터", isPrivate: false, playerCount: 6 },
  { id: 3, title: "전략의 달인", isPrivate: true, playerCount: 3 },
];

const GameList: React.FC = () => {
  return (
    <GameListContainer>
      <ButtonContainer>
        <ActionButtons
          onRandomJoin={() => alert("랜덤참여 클릭!")}
          onCreateRoom={() => alert("방 생성 클릭!")}
        />
      </ButtonContainer>
      <GameRoomsContainer>
        {gameRooms.map((room) => (
          <GameRoomBox key={room.id} {...room} />
        ))}
      </GameRoomsContainer>
    </GameListContainer>
  );
};

export default GameList;
