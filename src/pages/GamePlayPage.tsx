import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/gamePlayPage/ChatBox";
import GameDrawing from "../components/gamePlayPage/GameDrawing";
import TopComponents from "../components/gamePlayPage/TopComponent";
import UserList from "../components/gamePlayPage/UserList";
import {
  PageContainer,
  CenterComponents,
} from "../styles/gameplayPage/gameplayPageStyle";
import socket from "../socket/gameSocket";
import useGameStore from "../store/useGameStore";

export default function GamePlayPage() {
  const { currentGame, setCurrentGame } = useGameStore();
  const { gameId } = useParams();

  useEffect(() => {
    console.log("🟢 게임 페이지 마운트됨");

    socket.off("updateGameInfo");
    socket.emit("readyGame", {
      userId: localStorage.getItem("userId"),
      gameId: Number(gameId),
      isReady: true,
    });
    socket.on("updateGameInfo", (response) => {
      console.log("🔥 [클라이언트] updateGameInfo 수신:", response);
      if (response.type === "SUCCESS") {
        setCurrentGame(response.data);
      }
    });
    socket.emit("readyGame", {
      userId: localStorage.getItem("userId"),
      gameId: Number(gameId),
      isReady: false,
    });
    return () => {
      if (gameId) {
        const userId = Number(localStorage.getItem("userId"));
        socket.emit("leaveGame", { userId, gameId: Number(gameId) });
        console.log("🚪 leaveGame 요청 보냄:", { userId, gameId });
        socket.off("updateGameInfo");
      }
    };
  }, [gameId, setCurrentGame]);

  const users = currentGame?.players || [];
  const gameTitle = currentGame?.gameName || "게임 제목 없음";
  return (
    <PageContainer>
      <TopComponents socket={socket} gameTitle={gameTitle} />
      <CenterComponents>
        <UserList users={users} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <GameDrawing socket={socket} />
          <ChatBox socket={socket} />
        </div>
      </CenterComponents>
    </PageContainer>
  );
}
