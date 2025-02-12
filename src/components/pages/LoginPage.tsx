import * as M from "../../styles/loginPage/mainPageStyle";

export default function LoginPage() {
  const handleGoogleLogin = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    console.log("구글 로그인 로직 실행!");
  };
  const handleKakaoLogin = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    console.log("카카오오 로그인 로직 실행!");
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
            alt="카카오오 로그인 버튼"
            onClick={handleKakaoLogin}
          />
        </M.LoginBox>
      </M.LoginContainer>
    </M.Container>
  );
}
