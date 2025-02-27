import React, { useEffect, useState } from "react";
import GameRoomBox from "./GameRoomBox";
import ActionButtons from "./ActionButtons";
import {
  ButtonContainer,
  GameListContainer,
  GameRoomsContainer,
} from "../../styles/gameRoomStyle";
import MakeNewGame from "../newGame/MakeNewGame";
import { useNavigate } from "react-router-dom";
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
            playerCount: room.playerCount || 1,
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

  const handleRoomSelect = async (
    gameId: number,
    isLock: boolean,
    roomName: string
  ) => {
    const inputPw = isLock ? prompt("비밀번호를 입력해주세요") || "" : "";
    const userId = localStorage.getItem("userId");
  
    console.log("🔄 방 입장 요청:", { userId, gameId, inputPw });
  
    try {
      const response = await api.post(`/api/game-room/join`, { 
        gameId, 
        inputPw,
        userId: Number(userId)  // userId 추가
      });
  
      if (response.data.code === "SU") {
        navigate(`/game-page/${gameId}`, { state: { gameName: roomName } });
      } else {
        alert(`방 입장 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error("❌ 방 입장 중 오류 발생:", error);
      alert("방 입장 중 오류가 발생했습니다.");
    }
  };
  

  const handleRandomJoin = () => {
    const availableRooms = gameRooms.filter((room) => !room.isLock);
    
    if (availableRooms.length === 0) {
      alert("참여 가능한 공개 방이 없습니다!");
      return;
    }
  
    const randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
    console.log("🎲 랜덤 선택된 방:", randomRoom);
  
    navigate(`/game-page/${randomRoom.roomId}`, {
      state: { gameName: randomRoom.roomName },
    });
  };
  

  return (
    <GameListContainer>
      <ButtonContainer>
      <ActionButtons 
  onRandomJoin={handleRandomJoin} 
  onCreateRoom={() => setShowMakeRoomModal(true)} 
/>

      </ButtonContainer>
      <GameRoomsContainer>
        {gameRooms.map((room) => (
          <GameRoomBox
            key={room.roomId}
            {...room}
            onClick={() =>
              handleRoomSelect(room.roomId, room.isLock, room.roomName)
            }
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
