import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React, { Suspense } from "react";
import LoadingAnimaation from "../components/etc/LoadingAnimation";

const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const SideBar = React.lazy(() => import("../components/sideBar/SideBar"));
const MakeNewGame = React.lazy(
  () => import("../components/newGame/MakeNewGame")
);
const GamePlayPage = React.lazy(() => import("../pages/GamePlayPage"));

const GameList = React.lazy(
  () => import("../components/gameListPage/GameList")
);
const GameListPage = React.lazy(() => import("../pages/GameListPage"));
const ProfilePage = React.lazy(() => import("../pages/EditProfilePage"));
const UserSetupPage = React.lazy(() => import("../pages/UserSetupPage"));
const VictoryAlert = React.lazy(
  () => import("../components/gamePlayPage/VictoryAlert")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/side",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <SideBar />
          </Suspense>
        ),
      },
      {
        path: "/newGame",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <MakeNewGame />
          </Suspense>
        ),
      },
      {
        path: "/gamePage",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <GamePlayPage />
          </Suspense>
        ),
      },
      {
        path: "/game-list",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <GameList />
          </Suspense>
        ),
      },
      {
        path: "/game-list-page",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <GameListPage />
          </Suspense>
        ),
      },
      {
        path: "/user-setting-page",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <UserSetupPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/victory",
        element: (
          <Suspense fallback={<LoadingAnimaation />}>
            <VictoryAlert
              username="너구리"
              profileImg="/images/dog.png"
              onPlayAgain={() => console.log("한 판 더!")}
              onGoToGameList={() => console.log("게임 리스트로 이동!")}
            />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
