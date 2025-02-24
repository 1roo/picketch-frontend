import io from "socket.io-client";
import ChatBox from "../components/gamePlayPage/ChatBox";
import GameDrawing from "../components/gamePlayPage/GameDrawing";
import TopComponents from "../components/gamePlayPage/TopComponent";
import UserList from "../components/gamePlayPage/UserList";
import {
  PageContainer,
  CenterComponents,
} from "../styles/gameplayPage/gameplayPageStyle";
import { useLocation, useParams } from "react-router-dom";

const socket = io(
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SOCKET_SERVER_URL
    : "http://localhost:8080",
  { transports: ["websocket"] }
);

const users = [
  {
    nickname: "cow",
    score: 1200,
    region: "중랑구",
    profileImg: "/images/cow.png",
  },
  {
    nickname: "dog",
    score: 950,
    region: "마포구",
    profileImg: "/images/dog.png",
  },
  {
    nickname: "sheep",
    score: 1100,
    region: "은평구",
    profileImg: "/images/sheep.png",
  },
  {
    nickname: "horse",
    score: 850,
    region: "동작구",
    profileImg: "/images/horse.png",
  },
  {
    nickname: "monkey",
    score: 1300,
    region: "강서구",
    profileImg: "/images/monkey.png",
  },
  {
    nickname: "pig",
    score: 1050,
    region: "강동구",
    profileImg: "/images/pig.png",
  },
  {
    nickname: "rabbit",
    score: 990,
    region: "도봉구",
    profileImg: "/images/rabbit.png",
  },
  {
    nickname: "snake",
    score: 920,
    region: "성북구",
    profileImg: "/images/snake.png",
  },
];

export default function GamePlayPage() {
  const { gameId } = useParams();
  console.log("받은 gameId는:", gameId);
  const location = useLocation();

  console.log(gameId); // URL의 gameId 잘 전달되는지 확인
  console.log(location.state); // navigate로 전달한 state 확인

  return (
    <PageContainer>
      <TopComponents socket={socket} />
      <CenterComponents>
        <UserList users={users.slice(0, 4)} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <GameDrawing socket={socket} />
          <ChatBox socket={socket} />
        </div>
        <UserList users={users.slice(4, 8)} />
      </CenterComponents>
    </PageContainer>
  );
}
