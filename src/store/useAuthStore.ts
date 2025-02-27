import { createWithEqualityFn } from "zustand/traditional";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  userId: number | string | null;
  setUserId: (userId: number | string) => void;
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
  userId: localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId")) || localStorage.getItem("userId")
    : null,

  setUserId: (userId) => {
    localStorage.setItem("userId", String(userId));
    set({ userId });
  },

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isManager");
    localStorage.setItem("isLoggedIn", "false");
    set({
      accessToken: null,
      refreshToken: null,
      userId: null,
      isLoggedIn: false,
    });
  },
}));

export default useAuthStore;
