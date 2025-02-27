import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import ChatBox from "../components/gamePlayPage/ChatBox";
import GameDrawing from "../components/gamePlayPage/GameDrawing";
import TopComponents from "../components/gamePlayPage/TopComponent";
import UserList from "../components/gamePlayPage/UserList";
import {
  PageContainer,
  CenterComponents,
} from "../styles/gameplayPage/gameplayPageStyle";

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
  const [socket, setSocket] = useState<Socket | null>(null);

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

  const userId = localStorage.getItem("userId");
  const isManager = localStorage.getItem("isManager");

  // 소켓 생성: 백엔드 URL, 네임스페이스, query에 gameId와 userId 포함, transports 설정
  const newSocket = io(`${process.env.REACT_APP_API_BASE_URL}/game`, {
    query: { gameId, userId: Number(userId) },
    transports: ["websocket"],
  });
  if (isManager) {
    setManagerId(Number(userId));
  }
  useEffect(() => {
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
      newSocket.emit("joinGame", {
        gameId: Number(gameId),
        userId: Number(userId),
      });
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

  useEffect(() => {
    newSocket.emit("updateGameInfo", (response: any) => {
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
    newSocket.on("updateGameInfo", (response) => {
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
    newSocket.on("endRound", (response) => {
      console.log("🔥 서버에서 받은 endRound 응답:", response);
    });

    newSocket.on("startGame", (response: any) => {
      if (response.type === "SUCCESS") {
        setKeyword(response.data.keyword);
        console.log("다음턴 시작시 키워드정보", response.data);
        setIsStartGame(true);
      }
    });

    newSocket.on("nextTurn", (response: any) => {
      //다음턴 시작시 키워드 정보 받음
      if (response.type === "SUCCESS") {
        setKeyword(response.data.keyword);
        console.log("다음턴 시작시 키워드정보", response.data);
      }

      //만약 마지막 라운드일 경우에는 endGame 이벤트 emit 하기
      if (response.type === "ERROR") {
        newSocket.emit("endGame");
      }
    });

    return () => {
      if (gameId) {
        const userId = Number(localStorage.getItem("userId"));

        // ✅ 페이지 나갈 때 자동으로 `leaveGame` 요청 전송
        newSocket.emit("leaveGame", { userId, gameId: Number(gameId) });
        console.log("🚪 페이지 떠날 때 leaveGame 요청 보냄:", {
          userId,
          gameId,
        });
        newSocket.emit("leaveGame", { userId, gameId: Number(gameId) });
        console.log("🚪 페이지 떠날 때 leaveGame 요청 보냄:", {
          userId,
          gameId,
        });

        newSocket.off("updateGameInfo");
        newSocket.off("startGame");
        newSocket.off("nextTurn");
        newSocket.off("endRound");
      }
    };
  }, [gameId]);

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
