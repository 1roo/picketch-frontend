import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import React from "react";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router"; // 🔹 `router.tsx`에서 import

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
