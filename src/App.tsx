import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import LoadingAnimation from "./components/etc/LoadingAnimation";
import useAuthStore from "./store/useAuthStore";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
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
  const { setAccessToken, setRefreshToken, setLogin, setUserId } =
    useAuthStore();

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

          const userData = data.data.data;

          if (data.code === "SU") {
            setAccessToken(userData.accessToken);
            setRefreshToken(userData.refreshToken);
            setUserId(userData.userId);
            setLogin();

            navigate(
              userData.hasProfile ? "/game-list-page" : "/user-setting-page"
            );
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
  }, [provider, location, navigate, setAccessToken, setRefreshToken, setLogin]);

  return null;
};

const PrivateRoute = () => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          {/* 로그인 페이지는 항상 접근 가능 */}
          <Route path="/" element={<LoginPage />} />

          {/* 로그인 필요 페이지 PrivateRoute로 감싸기 */}
          <Route element={<PrivateRoute />}>
            <Route path="/game-list-page" element={<GameListPage />} />
            <Route path="/user-setting-page" element={<UserSetupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/game-page/:gameId" element={<GamePlayPage />} />
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
          </Route>

          {/* OAuth Callback 처리 */}
          <Route
            path="/auth/naver/callback"
            element={<OAuthCallbackHandler provider="naver" />}
          />
          <Route
            path="/auth/kakao/callback"
            element={<OAuthCallbackHandler provider="kakao" />}
          />

          {/* 존재하지 않는 페이지 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
