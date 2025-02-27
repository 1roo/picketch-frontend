import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [gameTitle, setGameTitle] = useState(
    location.state?.gameName || "게임 제목 없음"
  );
  const [managerId, setManagerId] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [maxRound, setMaxRound] = useState<number>(0);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [isStartGame, setIsStartGame] = useState<boolean>(false);
  const [currentTurnUserId, setCurrentTurnUserId] = useState<
    number | undefined
  >();

  // 새로고침, 뒤로가기 방지
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const handlePopState = () => {
      if (
        !window.confirm(
          "진행중인 게임은 저장되지 않습니다. 게임을 나가시겠습니까?"
        )
      ) {
        window.history.pushState(null, "", window.location.href);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    window.history.pushState(null, "", window.location.href);
  });

  useEffect(() => {
    socket.emit("updateGameInfo", (response: any) => {
      console.log("🔥 서버에서 받은 updateGameInfo 응답:", response);
      if (response.type === "SUCCESS") {
        setUsers(response.data.players);
        setGameTitle(response.data.gameName);
        setManagerId(response.data.managerId);
        setCurrentRound(response.data.currentRound);
        setMaxRound(response.data.maxRound);
        setCurrentTurnUserId(response.data.currentTurnUserId);
        setIsGameEnd(response.data.isGameEnd);
      }
    });
    socket.on("updateGameInfo", (response) => {
      console.log("🔥 서버에서 받은 updateGameInfo 응답:", response);
      if (response.type === "SUCCESS") {
        setUsers(response.data.players);
        setGameTitle(response.data.gameName);
        setManagerId(response.data.managerId);
        setCurrentRound(response.data.currentRound);
        setMaxRound(response.data.maxRound);
        setCurrentTurnUserId(response.data.currentTurnUserId);
        setIsGameEnd(response.data.isGameEnd);
        setCurrentRound(response.data.currentRound);
        setMaxRound(response.data.maxRound);
        setCurrentTurnUserId(response.data.currentTurnUserId);
        setIsGameEnd(response.data.isGameEnd);
      }
    });
    socket.on("endRound", (response) => {
      console.log("🔥 서버에서 받은 endRound 응답:", response);
    });

    socket.on("startGame", (response: any) => {
      if (response.type === "SUCCESS") {
        setKeyword(response.data.keyword);
        console.log("다음턴 시작시 키워드정보", response.data);
        setIsStartGame(true);
      }
    });

    socket.on("nextTurn", (response: any) => {
      //다음턴 시작시 키워드 정보 받음
      if (response.type === "SUCCESS") {
        setKeyword(response.data.keyword);
        console.log("다음턴 시작시 키워드정보", response.data);
      }

      //만약 마지막 라운드일 경우에는 endGame 이벤트 emit 하기
      if (response.type === "ERROR") {
        socket.emit("endGame");
      }
    });

    return () => {
      if (gameId) {
        const userId = Number(localStorage.getItem("userId"));

        // ✅ 페이지 나갈 때 자동으로 `leaveGame` 요청 전송
        socket.emit("leaveGame", { userId, gameId: Number(gameId) });
        console.log("🚪 페이지 떠날 때 leaveGame 요청 보냄:", {
          userId,
          gameId,
        });
        socket.emit("leaveGame", { userId, gameId: Number(gameId) });
        console.log("🚪 페이지 떠날 때 leaveGame 요청 보냄:", {
          userId,
          gameId,
        });

        socket.off("updateGameInfo");
        socket.off("startGame");
        socket.off("nextTurn");
        socket.off("endRound");
      }
    };
  }, []);

  return (
    <PageContainer>
      <TopComponents
        socket={socket}
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
