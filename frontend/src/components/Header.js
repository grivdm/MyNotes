import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { ReactComponent as LogOutButton } from "../assets/logout.svg";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="app-header">
      <h1>My Notes</h1>

      <div className="app-header-right" onClick={logoutUser}>
        {user && <LogOutButton />}
      </div>
    </div>
  );
};

export default Header;
