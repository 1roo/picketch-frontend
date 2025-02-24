import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import LoadingAnimation from "./components/etc/LoadingAnimation";
import useLoginStore from "./store/useLoginStore";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const MakeNewGame = React.lazy(
  () => import("./components/newGame/MakeNewGame")
);
const GameListPage = React.lazy(() => import("./pages/GameListPage"));
const GamePlayPage = React.lazy(() => import("./pages/GamePlayPage"));
const ProfilePage = React.lazy(() => import("./pages/EditProfilePage"));
const UserSetupPage = React.lazy(() => import("./pages/UserSetupPage"));
const VictoryAlert = React.lazy(
  () => import("./components/gamePlayPage/VictoryAlert")
);

interface OAuthCallbackHandlerProps {
  provider: "naver" | "kakao";
}

const OAuthCallbackHandler: React.FC<OAuthCallbackHandlerProps> = ({
  provider,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken, setRefreshToken } = useLoginStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(`${provider} 로그인 성공!`, data);

          if (data.data && data.data.accessToken && data.data.refreshToken) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);

            if (!data.data.hasProfile) {
              navigate("/user-setting-page");
            } else {
              navigate("/game-list-page");
            }
          } else {
            console.error("❌ 로그인 응답에 토큰 없음:", data);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(`${provider} 로그인 실패:`, error);
          navigate("/");
        });
    }
  }, [provider, location, navigate, setAccessToken, setRefreshToken]);

  return null;
};

function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/newGame" element={<MakeNewGame />} />
          <Route path="/game-list-page" element={<GameListPage />} />
          <Route path="/user-setting-page" element={<UserSetupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/game-page" element={<GamePlayPage />} />
          <Route
            path="/victory"
            element={
              <VictoryAlert
                username="너구리"
                profileImg="/images/dog.png"
                onPlayAgain={() => console.log("한 판 더!")}
                onGoToGameList={() => console.log("게임 리스트로 이동!")}
              />
            }
          />
          <Route
            path="/auth/naver/callback"
            element={<OAuthCallbackHandler provider="naver" />}
          />
          <Route
            path="/auth/kakao/callback"
            element={<OAuthCallbackHandler provider="kakao" />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
