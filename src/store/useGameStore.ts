import { create } from "zustand";

interface Player {
  userId: number;
  nickname: string;
  score: number;
  ready: boolean;
  character: string;
  region: string; // ✅ region 추가 (소켓 응답 데이터와 일치)
}

interface GameInfo {
  gameId: number;
  gameName: string;
  managerId: number;
  currentTurnUserId: number | null;
  maxRound: number;
  currentRound: number | null;
  isAnswerFound: boolean | null;
  players: Player[];
}

interface GameState {
  currentGame: GameInfo | null;
  setCurrentGame: (game: GameInfo) => void;
  clearGame: () => void;
}

const useGameStore = create<GameState>((set) => ({
  currentGame: null,
  setCurrentGame: (game) => set({ currentGame: game }),
  clearGame: () => set({ currentGame: null }),
}));

export default useGameStore;
