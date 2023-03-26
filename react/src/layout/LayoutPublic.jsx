import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function LayoutPublic() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
