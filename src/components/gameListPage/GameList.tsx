import React, { useEffect, useState } from 'react';
import GameRoomBox from './GameRoomBox';
import ActionButtons from './ActionButtons';
import {
  ButtonContainer,
  GameListContainer,
  GameRoomsContainer,
} from '../../styles/gameRoomStyle';
import MakeNewGame from '../newGame/MakeNewGame';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket/gameSocket';
import api from '../../utils/axios';

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
        console.log('📡 서버에서 받은 게임방 목록:', response.data);

        if (!response.data?.data?.waitingRooms) {
          console.error('❌ 서버에서 게임방 데이터를 받지 못했습니다.');
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

        console.log('✅ 변환된 게임방 목록:', fetchedRooms);
        setGameRooms(fetchedRooms);
      } catch (error) {
        console.error('Error fetching game rooms:', error);
      }
    };

    // 최초 데이터 불러오기
    fetchGameRooms();
    // 3초마다 게임방 목록 갱신
    const interval = setInterval(fetchGameRooms, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRoomSelect = async (
    gameId: number,
    isLock: boolean,
    roomName: string
  ) => {
    const inputPw = isLock ? prompt('비밀번호를 입력해주세요') || '' : '';

    console.log('🔄 방 입장 요청:', {
      userId: localStorage.getItem('userId'),
      gameId,
      inputPw,
    });

    try {
      socket.emit('joinGame', { gameId, inputPw });

      socket.on('joinGame', (socketResponse) => {
        console.log('🎯 소켓 응답:', socketResponse);
        if (socketResponse.type === 'SUCCESS') {
          navigate(`/game-page/${socketResponse.data.gameId}`, {
            state: { gameName: roomName }, // ✅ roomName 추가
          });
        } else {
          alert(`방 입장 실패: ${socketResponse.message}`);
        }
      });
    } catch (error) {
      console.error('❌ 방 입장 중 오류 발생:', error);
      alert('방 입장 중 오류가 발생했습니다.');
    }
  };

  const handleRandomJoin = () => {
    const availableRooms = gameRooms.filter((room) => !room.isLock);

    if (availableRooms.length === 0) {
      alert('참여 가능한 공개 방이 없습니다!');
      return;
    }

    const randomRoom =
      availableRooms[Math.floor(Math.random() * availableRooms.length)];
    console.log('🎲 랜덤 선택된 방:', randomRoom);

    socket.emit('joinGame', {
      userId: localStorage.getItem('userId'),
      gameId: randomRoom.roomId,
      inputPw: '',
    });

    socket.on('joinGame', (response) => {
      console.log('🎯 서버 응답:', response);
      if (response.type === 'SUCCESS') {
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
