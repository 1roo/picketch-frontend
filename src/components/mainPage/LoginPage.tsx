import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import * as M from "../../styles/loginPage/mainPageStyle";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginPageContent />
    </GoogleOAuthProvider>
  );
}

function LoginPageContent() {
  /*
   * 구글 로그인
   * 하나래
   * */
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (tokenResponse.access_token) {
        console.log("구글 로그인 성공!", tokenResponse);
        fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
        )
          .then((res) => res.json())
          .then((userInfo) => {
            console.log("유저 정보:", userInfo);
          })
          .catch((err) => console.error("유저 정보 가져오기 실패:", err));
      } else {
        console.error("구글 로그인 실패: access_token 없음");
      }
    },
    onError: () => console.error("구글 로그인 실패"),
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  /*
   * 카카오 로그인
   * 오태원
   */
  const RestApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_KAKAO_APP_REDIRECT_URL;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${RestApiKey}&redirect_uri=${REDIRECT_URI}`;
  const handleKakaoLogin = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    window.location.href = kakaoURL;
    console.log("카카오 로그인 로직 실행!");
  };

  const handleNaverLogin = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    console.log("네이버 로그인 로직 실행!");
  };

  return (
    <M.Container>
      <M.LogoBox>
        <M.MainLogo src="/images/picketch.png" alt="logo-image" />
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
            alt="네이버 로그인 버튼"
            onClick={handleNaverLogin}
          />

          <M.SocialLogo
            src="/images/kakao_logo.png"
            alt="카카오 로그인 버튼"
            onClick={handleKakaoLogin}
          />
        </M.LoginBox>
      </M.LoginContainer>
    </M.Container>
  );
}
