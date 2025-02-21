import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

export default function NaverCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      console.error("❌ 네이버 인가 코드 없음");
      return;
    }

    console.log("📡 네이버 인가 코드 백엔드로 전송:", code);

    axios
      .post(`${BACKEND_URL}/api/auth/naver`, { code })
      .then(({ data }) => {
        if (data.code === "SU") {
          console.log("✅ 네이버 로그인 성공:", data);
          localStorage.setItem("accessToken", data.accessToken);

          if (!data.hasProfile) {
            navigate("/user-setting-page");
          } else {
            navigate("/profile");
          }
        } else {
          console.error("❌ 네이버 로그인 실패:", data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("❌ 네이버 로그인 요청 실패:", err);
        navigate("/login");
      });
  }, [navigate]);

  return <div>네이버 로그인 중...</div>;
}
