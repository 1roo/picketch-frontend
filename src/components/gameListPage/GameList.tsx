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

        console.log("📡 서버에서 받은 게임방 목록:", response.data);

        if (!response.data?.data?.waitingRooms) {
          console.error("❌ 서버에서 게임방 데이터를 받지 못했습니다.");
          return;
        }

        const fetchedRooms = response.data.data.waitingRooms.map(
          (room: any) => ({
            roomId: room.roomId,
            roomName: room.roomName,
            isLock: room.is_lock,
            playerCount: room.playCount || 1,
          })
        );
        console.log("✅ 변환된 게임방 목록:", fetchedRooms);
        setGameRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching game rooms:", error);
      }
    };

    fetchGameRooms();
  }, []);

  const handleRoomSelect = (gameId: number, isLock: boolean) => {
    const inputPw = isLock ? prompt("비밀번호를 입력해주세요") || "" : "";

    console.log("🔄 방 입장 요청:", {
      userId: localStorage.getItem("userId"),
      gameId,
      inputPw,
    });

    socket.emit("joinGame", {
      userId: localStorage.getItem("userId"),
      gameId,
      inputPw,
    });

    socket.on("joinGame", (response) => {
      console.log("🎯 서버 응답:", response);
      if (response.type === "SUCCESS") {
        console.log("✅ 게임 입장 성공!", response.data);

        if (!response.data?.gameId) {
          console.error("❌ gameId가 없습니다!", response.data);
          alert("방 입장 실패: 서버에서 gameId를 받지 못했습니다.");
          return;
        }
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
