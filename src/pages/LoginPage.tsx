import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import * as M from "../styles/loginPage/mainPageStyle";

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
  /*
   * 1. 구글 로그인
   */
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse.access_token) {
        console.log("✅ 구글 로그인 성공!", tokenResponse);

        try {
          const res = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
          );
          const userInfo = await res.json();
          console.log("✅ 유저 정보:", userInfo);
        } catch (err) {
          console.error("❌ 유저 정보 가져오기 실패:", err);
        }
      } else {
        console.error("❌ 구글 로그인 실패: access_token 없음");
      }
    },
    onError: () => console.error("❌ 구글 로그인 실패"),
  });

  const handleGoogleLogin = () => googleLogin();

  /*
   *  2. 카카오 로그인
   */
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUri}`;

  const handleKakaoLogin = () => {
    console.log("✅ 카카오 로그인 시작!");
    window.location.href = kakaoLoginUrl;
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

    window.location.href = naverLoginUrl;
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
