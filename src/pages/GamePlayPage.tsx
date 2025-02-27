import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import ChatBox from "../components/gamePlayPage/ChatBox";
import GameDrawing from "../components/gamePlayPage/GameDrawing";
import TopComponents from "../components/gamePlayPage/TopComponent";
import UserList from "../components/gamePlayPage/UserList";
import { PageContainer, CenterComponents } from "../styles/gameplayPage/gameplayPageStyle";

export default function GamePlayPage() {
  const { gameId } = useParams();
  const [users, setUsers] = useState([]);
  const [gameTitle, setGameTitle] = useState("게임 제목 없음");
  const [managerId, setManagerId] = useState(0)
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!gameId) return;
    const isManager = localStorage.getItem('manager')
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("유효하지 않은 userId");
      return;
    }

    console.log("🚀 게임 페이지 마운트, gameId:", gameId);

    // 소켓 생성: 백엔드 URL, 네임스페이스, query에 gameId와 userId 포함, transports 설정
    const newSocket = io(`${process.env.REACT_APP_API_BASE_URL}/game`, {
      query: { gameId, userId: Number(userId) },
      transports: ["websocket"],
    });
    if(isManager){
      setManagerId(Number(userId));
    }
    // updateGameInfo 이벤트 리스너를 즉시 등록
    newSocket.on("updateGameInfo", (data: any) => {
      console.log("🔥 updateGameInfo 이벤트 수신:", data);
      if (data && data.data) {
        setUsers(data.data.players || []);
        setGameTitle(data.data.gameName || "게임 제목 없음");
       
      }
    });

    newSocket.on("connect", () => {
      console.log("✅ 시소켓 연결 성공, 소켓 ID:", newSocket.id);
      // joinGame 이벤트를 emit하여 방에 입장
      newSocket.emit("joinGame", { gameId: Number(gameId), userId: Number(userId) });
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ 소켓 연결 실패:", err);
    });

    setSocket(newSocket);

    return () => {
      console.log("🚪 게임 페이지 떠날 때 소켓 연결 해제");
      newSocket.emit("leaveGame", { gameId });
      newSocket.disconnect();
    };
  }, [gameId]);

  return (
    <PageContainer>
      <TopComponents socket={socket} gameTitle={gameTitle} managerId={managerId} />
      <CenterComponents>
        <UserList users={users} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {socket ? (
            <>
              <GameDrawing socket={socket} />
              <ChatBox socket={socket} />
            </>
          ) : (
            <p>소켓 연결 중...</p>
          )}
        </div>
      </CenterComponents>
    </PageContainer>
  );
}
