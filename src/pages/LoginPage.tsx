import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import * as M from "../styles/loginPage/mainPageStyle";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import api from "../utils/axios";
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
const kakaoRestApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
const kakaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URL;
const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const naverRedirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI;
const naverGenerateState = () => Math.random().toString(36).substring(2, 15);

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <LoginPageContent />
    </GoogleOAuthProvider>
  );
}

function LoginPageContent() {
  const { setAccessToken, setRefreshToken, setLogin, setUserId } =
    useAuthStore();
  const navigate = useNavigate();
  /*
   * 1. 구글 로그인
   */

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      console.log("구글로그인응답: ", response);

      if (!response.access_token) {
        console.error("Access Token 없음");
        return;
      }

      try {
        const { data } = await api.post(
          `/api/auth/google`,
          {
            accessToken: response.access_token,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("백엔드 응답: ", data);

        if (data.code === "SU") {
          setAccessToken(data.data.data.accessToken);
          setRefreshToken(data.data.data.refreshToken);
          setUserId(data.data.data.userId);
          console.log(data.data.data);

          setLogin();

          navigate(
            data.data.hasProfile ? "/game-list-page" : "/user-setting-page"
          );
        } else {
          console.error("백엔드 로그인 실패:", data.message);
        }
      } catch (err) {
        if (api.isAxiosError(err)) {
          console.error("서버 요청 실패:", err.response?.data || err.message);
        } else {
          console.error("알 수 없는 오류 발생:", err);
        }
      }
    },
    onError: () => console.error("구글 로그인 실패"),
  });

  const handleGoogleLogin = () => googleLogin();

  /*
   *  2. 카카오 로그인
   */
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUri}`;

  const handleKakaoLogin = () => {
    console.log("✅ 카카오 로그인 시작!");
    navigate(kakaoLoginUrl);
  };
  /*
   *  3. 네이버 로그인
   */
  const handleNaverLogin = () => {
    const state = naverGenerateState();
    sessionStorage.setItem("naver_state", state);
    const safeNaverRedirectUri = naverRedirectUri ?? "";

    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${encodeURIComponent(
      safeNaverRedirectUri
    )}&state=${state}`;
    console.log("✅ 네이버 로그인 시작!");
    console.log("네이버 uri???", naverLoginUrl);

    navigate(naverLoginUrl);
  };

  return (
    <M.Container>
      <M.LogoBox>
        <M.MainLogo src="/images/picketch.png" alt="Picketch Logo" />
      </M.LogoBox>
      <M.LoginContainer>
        <M.LoginBox>
          <M.Title>소셜로그인</M.Title>

          <M.SocialLogo
            src="/images/google_logo.png"
            alt="Google 로그인 버튼"
            onClick={handleGoogleLogin}
          />

          <M.SocialLogo
            src="/images/naver_logo.png"
            alt="Naver 로그인 버튼"
            onClick={handleNaverLogin}
          />

          <M.SocialLogo
            src="/images/kakao_logo.png"
            alt="Kakao 로그인 버튼"
            onClick={handleKakaoLogin}
          />
        </M.LoginBox>
      </M.LoginContainer>
    </M.Container>
  );
}
