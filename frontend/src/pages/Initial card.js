import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const MainCard = () => {
  let { user } = useContext(AuthContext)
  return(
    <div className="init-card">
      <p>Hi {user.username}!!
      For creating a new note click Plus button on the sidebar</p>
    </div>
  );
};

export default MainCard;
