import React, { useEffect, useState } from "react";
import GameRoomBox from "./GameRoomBox";
import ActionButtons from "./ActionButtons";
import {
  ButtonContainer,
  GameListContainer,
  GameRoomsContainer,
} from "../../styles/gameRoomStyle";
import axios from "axios";
import MakeNewGame from "../newGame/MakeNewGame";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

interface GameRoom {
  roomId: number;
  roomName: string;
  isLock: boolean;
  playerCount: number;
}

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

const GameList: React.FC = () => {
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [showMakeRoomModal, setShowMakeRoomModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameRooms = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/game-room`, {
          params: { status: "waiting" },
        });

        const fetchedRooms = response.data.data.waitingRooms.map(
          (room: any) => ({
            roomId: room.roomId,
            roomName: room.roomName,
            isLock: room.is_lock,
            playerCount: room.playCount || 1,
          })
        );
        setGameRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching game rooms:", error);
      }
    };

    fetchGameRooms();
  }, []);

  const handleMakeRoom = () => {
    setShowMakeRoomModal(true);
  };

  const closeMakeRoomModal = () => {
    setShowMakeRoomModal(false);
  };

  const handleRoomSelect = (gameId: number, isLock: boolean) => {
    const inputPw = isLock ? prompt("비밀번호를 입력해주세요") || "" : "";

    const socket: Socket = io(`${BACKEND_URL}/game`, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("accessToken")
          ? `Bearer ${localStorage.getItem("accessToken")}`
          : "",
      },
      query: { userId: 5 },
    });

    socket.on("connect", () => {
      console.log("소켓 연결 성공");
      socket.emit("joinGame", {
        userId: 5,
        gameId,
        inputPw,
      });
    });

    socket.on("joinGame", (response) => {
      if (response.type === "SUCCESS") {
        navigate(`/game-page/${response.data.gameId}`, {
          state: response.data,
        });
      } else {
        alert(`방 입장 실패: ${response.message}`);
        socket.disconnect();
      }
    });

    socket.on("connect_error", (error) => {
      console.error("소켓 연결 에러", error);
      alert("소켓 연결 에러: 방에 입장할 수 없습니다.");
      socket.disconnect();
    });
  };

  return (
    <GameListContainer>
      <ButtonContainer>
        <ActionButtons
          onRandomJoin={() => alert("랜덤참여 클릭!")}
          onCreateRoom={handleMakeRoom}
        />
      </ButtonContainer>
      <GameRoomsContainer>
        {gameRooms.map((room) => (
          <GameRoomBox
            key={room.roomId}
            {...room}
            onClick={() => handleRoomSelect(room.roomId, room.isLock)}
          />
        ))}
      </GameRoomsContainer>
      {showMakeRoomModal && <MakeNewGame onClose={closeMakeRoomModal} />}
    </GameListContainer>
  );
};

export default GameList;
