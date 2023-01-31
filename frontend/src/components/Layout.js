import { Outlet } from "react-router-dom";
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import Header from "./Header";

function Layout() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
      <footer className="footer">
          made with love
        </footer>
    </>
  );
}

export { Layout };
