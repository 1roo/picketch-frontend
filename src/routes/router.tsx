import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React, { Suspense } from "react";

const LoginPage = React.lazy(() => import("../components/pages/LoginPage"));
const SideBar = React.lazy(
  () => import("../components/ui/gameListPage/sideBar/SideBar")
);
const GameList = React.lazy(
  () => import("../components/layouts/gameListLayout/GameList")
);
const GameListPage = React.lazy(
  () => import("../components/pages/GameListPage")
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
