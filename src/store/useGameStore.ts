import { create } from "zustand";

interface Player {
  nickname: string;
  profileImg: string;
  score: number;
  isDrawer: boolean;
  ready: boolean;
}

interface GameState {
  gameState: "waiting" | "playing" | "finished";
  round: number;
  maxRounds: number;
  timer: number;
  drawer: string | null;
  players: Player[];

  setGameState: (state: GameState["gameState"]) => void;
  setRound: (round: number) => void;
  setTimer: (time: number) => void;
  setPlayers: (players: Player[]) => void;
  setDrawer: (drawer: string) => void;
  setPlayerReady: (playerId: string, ready: boolean) => void;
  checkAllReady: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
  gameState: "waiting",
  round: 1,
  maxRounds: 5,
  timer: 60,
  drawer: null,
  players: [],

  setGameState: (state) => set({ gameState: state }),
  setRound: (round) => set({ round }),
  setTimer: (time) => set({ timer: time }),
  setPlayers: (players) => set({ players }),
  setDrawer: (drawer) => set({ drawer }),

  setPlayerReady: (playerNickname, ready) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.nickname === playerNickname ? { ...player, ready } : player
      ),
    })),

  checkAllReady: () => {
    const { players, setGameState } = get();
    const allReady = players.length > 0 && players.every((p) => p.ready);

    if (allReady) {
      setGameState("playing");
    }
  },
}));

export default useGameStore;
