import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React, { Suspense } from "react";

// React.lazy로 컴포넌트를 동적 import
const LoginPage = React.lazy(() => import("../components/mainPage/LoginPage"));
const SideBar = React.lazy(() => import("../components/sideBar/SideBar"));

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
    ],
  },
]);

export default router;
