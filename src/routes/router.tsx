import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React, { Suspense } from "react";

const LoginPage = React.lazy(() => import("../components/mainPage/LoginPage"));
const SideBar = React.lazy(() => import("../components/sideBar/SideBar"));
const GameList = React.lazy(
  () => import("../components/common/gameListPage/GameList")
);
const GameListPage = React.lazy(
  () => import("../components/common/gameListPage/GameListPage")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/side",
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <SideBar />
          </Suspense>
        ),
      },
      {
        path: "/game-list",
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <GameList />
          </Suspense>
        ),
      },
      {
        path: "/game-list-page",
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <GameListPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
