import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      console.error("카카오 인가 코드 없음");
      return;
    }

    const fetchKakaoToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/kakao`,
          { code },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.data.hasProfile) {
          navigate("/");
        } else {
          navigate("/user-setting-page");
        }
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
      }
    };

    fetchKakaoToken();
  }, [navigate]);

  return <div></div>;
}

export default KakaoLogin;
