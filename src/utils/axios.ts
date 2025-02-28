import axios, { AxiosInstance, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"; // 기본값 설정

// ✅ AxiosInstance 타입 확장
interface CustomAxiosInstance extends AxiosInstance {
  isAxiosError: typeof axios.isAxiosError;
}

const api: CustomAxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
}) as CustomAxiosInstance;

// 🔥 요청 인터셉터: `accessToken`을 모든 요청에 자동 추가 (구글 로그인 예외 처리)
api.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken || accessToken === "null" || accessToken === "undefined") {
      console.warn("⚠️ 잘못된 accessToken 값:", accessToken);
      accessToken = null;
      localStorage.removeItem("accessToken");
    }

    // ✅ 구글 로그인 요청(`/api/auth/google`)에는 `Authorization`을 추가하지 않음
    if (accessToken && !config.url?.includes("/api/auth/google")) {
      console.log("📡 요청 Authorization 헤더 추가:", `Bearer ${accessToken}`);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔥 응답 인터셉터: `401 Unauthorized` 발생 시 토큰 재발급 처리
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error("🚨 401 Unauthorized - 토큰 만료 감지, 재발급 시도");

      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.warn("❌ Refresh Token 없음. 자동 로그아웃");
        handleLogout();
        return Promise.reject(error);
      }

      try {
        console.log("🔄 토큰 재발급 요청 실행");
        const { data } = await axios.post(
          `${BACKEND_URL}/api/auth/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ 토큰 재발급 성공:", data);

        // ✅ 새로운 `accessToken`을 저장 후 기존 요청 다시 실행
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return api(originalRequest!);
      } catch (refreshError) {
        console.error("❌ 토큰 재발급 실패. 자동 로그아웃 처리");
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  event.returnValue = "";
};

const handleLogout = () => {
  console.warn("👋 자동 로그아웃 실행");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.clear();

  // ✅ 새로고침 방지 이벤트 제거 (로그아웃할 때는 새로고침 가능해야 함)
  window.removeEventListener("beforeunload", handleBeforeUnload);

  // ✅ 강제 이동 (useNavigate 대신 사용)
  window.location.href = "/";
};

// ✅ `isAxiosError` 추가 방식 개선
Object.assign(api, { isAxiosError: axios.isAxiosError });
export default api;
