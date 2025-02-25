import React, { useEffect, useState } from "react";
import GameRoomBox from "./GameRoomBox";
import ActionButtons from "./ActionButtons";
import {
  ButtonContainer,
  GameListContainer,
  GameRoomsContainer,
} from "../../styles/gameRoomStyle";
import MakeNewGame from "../newGame/MakeNewGame"; // ✅ MakeNewGame 가져오기
import { useNavigate } from "react-router-dom";
import socket from "../../socket/gameSocket";
import api from "../../utils/axios";

interface GameRoom {
  roomId: number;
  roomName: string;
  isLock: boolean;
  playerCount: number;
}

const GameList: React.FC = () => {
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [showMakeRoomModal, setShowMakeRoomModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameRooms = async () => {
      try {
        const response = await api.get(`/api/game-room`);

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

  const handleRoomSelect = (gameId: number, isLock: boolean) => {
    const inputPw = isLock ? prompt("비밀번호를 입력해주세요") || "" : "";

    socket.emit("joinGame", {
      userId: localStorage.getItem("userId"),
      gameId,
      inputPw,
    });

    socket.on("joinGame", (response) => {
      if (response.type === "SUCCESS") {
        navigate(`/game-page/${response.data.gameId}`, {
          state: response.data,
        });
      } else {
        alert(`방 입장 실패: ${response.message}`);
      }
    });
  };

  return (
    <GameListContainer>
      <ButtonContainer>
        <ActionButtons
          onRandomJoin={() => alert("랜덤참여 클릭!")}
          onCreateRoom={() => setShowMakeRoomModal(true)}
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
      {showMakeRoomModal && (
        <MakeNewGame onClose={() => setShowMakeRoomModal(false)} />
      )}
    </GameListContainer>
  );
};

export default GameList;
