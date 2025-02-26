import React, { useEffect, useState } from "react";
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

export default function GamePlayPage() {
  const { gameId } = useParams();
  const [users, setUsers] = useState([]);
  const [gameTitle, setGameTitle] = useState(""); // ✅ 게임 제목 상태 추가

  useEffect(() => {
    socket.emit("joinGame", { gameId });

    // ✅ 서버에서 게임 정보 업데이트 받을 때 게임 제목도 저장
    socket.on("updateGameInfo", (response) => {
      console.log("🔥 서버에서 받은 updateGameInfo 응답:", response);
      if (response.type === "SUCCESS") {
        setUsers(response.data.players);
        setGameTitle(response.data.gameName); // ✅ 게임 제목 저장
      }
    });

    return () => {
      socket.emit("leaveGame", { gameId });
      socket.off("updateGameInfo");
    };
  }, [gameId]);

  return (
    <PageContainer>
      <TopComponents socket={socket} gameTitle={gameTitle} />{" "}
      {/* ✅ 게임 제목 전달 */}
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
