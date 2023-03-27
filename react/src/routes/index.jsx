import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import Post from "../views/Post";
import User from "../views/User";
import PostCreate from "../views/PostCreate";
import PostEdit from "../views/PostEdit";

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
        path: "/posts/:slug",
        element: <Post />,
      },
      {
        path: "/posts/create",
        element: <PostCreate />,
      },
      {
        path: "/posts/:slug/edit",
        element: <PostEdit />,
      },
      {
        path: "/users/:username",
        element: <User />,
      },
    ],
  },
]);
