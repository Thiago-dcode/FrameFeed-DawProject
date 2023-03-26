import React from "react";
import ReactDOM from "react-dom/client";
import "./css/home.css";
import "./css/navbar.css";
import "./css/Effects.css";
import "./css/post.css";
import "./css/index.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
