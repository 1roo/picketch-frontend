//import "./styles/global.css";
import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./components/pages/LoginPage";
import { GameRoom } from "./components/interfaces/GameRoom";
import GameRoomBox from "./components/common/GameRoomBox";
import ActionButtons from "./components/common/ActionButtons";
import {
  ButtonContainer,
  GameListContainer,
  GameRoomsContainer,
} from "./styles/gameRoomStyle";

const gameRooms: GameRoom[] = [
  {
    id: 1,
    title: "너가 그렇게 그림을 잘 그려?",
    isPrivate: true,
    playerCount: 4,
  },
  { id: 2, title: "퀴즈 마스터", isPrivate: false, playerCount: 6 },
  { id: 3, title: "전략의 달인", isPrivate: true, playerCount: 3 },
];

function App() {
  return (
    <>
      <GlobalStyle />
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
    </>
  );
}

export default App;
