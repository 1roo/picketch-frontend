import { create } from "zustand";

interface Player {
  userId: number;
  nickname: string;
  score: number;
  ready: boolean;
  character: string;
  region: string;
}

interface GameInfo {
  gameId: number;
  gameName: string;
  managerId: number;
  currentTurnUserId: number | null;
  maxRound: number;
  currentRound: number | null;
  isAnswerFound: boolean | null;
  isWaiting: boolean;
  isLock: boolean;
  pw: string | null;
  keywords: string[] | null;
  currentRoundKeyword: string | null;
  isNextRoundSettled: boolean | null;
  isGameEnd: boolean | null;
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
