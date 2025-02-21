import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      console.error("❌ 카카오 인가 코드 없음");
      navigate("/login"); // 오류 발생 시 로그인 페이지로 이동
      return;
    }

    console.log("📡 카카오 인가 코드 백엔드로 전송:", code);

    axios
      .post(`${BACKEND_URL}/api/auth/kakao`, { code })
      .then(({ data }) => {
        if (data.code === "SU") {
          console.log("✅ 카카오 로그인 성공:", data);
          localStorage.setItem("accessToken", data.accessToken);

          if (!data.hasProfile) {
            navigate("/user-setting-page"); // 회원 정보 입력 페이지로 이동
          } else {
            navigate("/profile"); // 프로필 페이지로 이동
          }
        } else {
          console.error("❌ 카카오 로그인 실패:", data.message);
          navigate("/login"); // 로그인 실패 시 로그인 페이지로 이동
        }
      })
      .catch((err) => {
        console.error("❌ 카카오 로그인 요청 실패:", err);
        navigate("/login");
      });
  }, [navigate]);

  return <div>카카오 로그인 중...</div>;
}
