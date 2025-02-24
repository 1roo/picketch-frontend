import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearTokens: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      setAccessToken: (accessToken) => set({ accessToken, isLoggedIn: true }),

      setRefreshToken: (refreshToken) =>
        set({ refreshToken, isLoggedIn: true }),

      clearTokens: () =>
        set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
    }),
    {
      name: "login-storage",
    }
  )
);

export default useLoginStore;
