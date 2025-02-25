import axios, { AxiosInstance } from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ AxiosInstance 타입을 확장해서 isAxiosError 추가
interface CustomAxiosInstance extends AxiosInstance {
  isAxiosError: typeof axios.isAxiosError;
}

const api: CustomAxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
}) as CustomAxiosInstance;

// 요청 인터셉터: 모든 요청에 Authorization 헤더 자동 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ axios의 isAxiosError를 api 인스턴스에 추가 (타입 확장 적용)
api.isAxiosError = axios.isAxiosError;

export default api;
