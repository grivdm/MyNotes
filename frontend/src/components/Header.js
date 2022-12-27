import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ReactComponent as LogOutButton } from "../assets/logout.svg";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="app-header">
      <h1>My Notes</h1>
      {user && <p>{user.username}</p>}
      <h3>
        <LogOutButton onClick={logoutUser} />
      </h3>
    </div>
  );
};

export default Header;
