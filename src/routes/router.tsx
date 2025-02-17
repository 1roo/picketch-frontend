import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React, { Suspense } from "react";
import LoadingAnimaation from "../components/etc/LoadingAnimation";

const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const SideBar = React.lazy(() => import("../components/sideBar/SideBar"));
const MakeNewGame = React.lazy(
  () => import("../components/newGame/MakeNewGame")
);

const GameList = React.lazy(
  () => import("../components/gameListPage/layout/GameList")
);
const GameListPage = React.lazy(() => import("../pages/GameListPage"));

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
    ],
  },
]);

export default router;
