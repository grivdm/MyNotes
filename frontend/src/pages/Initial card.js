import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const MainCard = () => {
  let {loginUser}  = useContext(AuthContext)
  return(
    <div>
      <form onSubmit={loginUser}>
        <input type='text' name='username' placeholder='Enter Username'/>
        <input type='password' name='password' placeholder='Enter password'/>
        <input type='submit' value="submit"/>
      </form>
    </div>
  );
};

export default MainCard;
