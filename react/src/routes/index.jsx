import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import Post from "../views/Post";
import User from "../views/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
       index: true,
        element: <Home />,
      },

      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
]);
