import { createWithEqualityFn } from "zustand/traditional";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setRefreshToken: (token: string) => void;
  clearRefreshToken: () => void;
  setLogin: () => void;
  setLogout: () => void;
}

const useAuthStore = createWithEqualityFn<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",

  setAccessToken: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({ accessToken });
  },
  clearAccessToken: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },

  setRefreshToken: (refreshToken) => {
    localStorage.setItem("refreshToken", refreshToken);
    set({ refreshToken });
  },
  clearRefreshToken: () => {
    localStorage.removeItem("refreshToken");
    set({ refreshToken: null });
  },

  setLogin: () => {
    localStorage.setItem("isLoggedIn", "true");
    set({ isLoggedIn: true });
  },
  setLogout: () => {
    localStorage.setItem("isLoggedIn", "false");
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
