import { createBrowserRouter } from "react-router-dom";
import LayoutPrivate from "../layout/LayoutPrivate";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import Post from "../views/Post";
import User from "../views/User";
import PostCreate from "../views/PostCreate";
import PostEdit from "../views/PostEdit";
import LayoutPublic from "../layout/LayoutPublic";
import Register from "../views/Register";
import Login from "../views/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrivate />,
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
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },

      {
        path: "/login",
        element: <Login />,
      },
    ]

  }
]);
