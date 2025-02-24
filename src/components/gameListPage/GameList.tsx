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

interface GameRoom {
  id: number;
  roomName: string;
  isPrivate: boolean;
  playerCount: number;
}

const GameList: React.FC = () => {
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [showMakeRoomModal, setShowMakeRoomModal] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchGameRooms = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/game-room`);
        const fetchedRooms = response.data.data.gameRooms.map((room: any) => ({
          id: room.room_id,
          roomName: room.roomName,
          isPrivate: room.is_lock === "true",
          playerCount: room.playCount || 1,
        }));
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
          <GameRoomBox key={room.id} {...room} />
        ))}
      </GameRoomsContainer>
      {showMakeRoomModal && <MakeNewGame onClose={closeMakeRoomModal} />}
    </GameListContainer>
  );
};

export default GameList;
