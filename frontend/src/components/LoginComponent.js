import React, { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import InputRegAuth from "./InputRegAuth";
import { ReactComponent as EyeButton } from "../assets/eye.svg";
import { CSSTransition } from "react-transition-group";

const LoginComponent = () => {
  const nodeRef = useRef(null);
  const { loginUser, setLoginerr, loginerr } = useContext(AuthContext);
  const [login, setLogin] = useState({
    username: "",
    email: "",
    password: "",
  });

  function changeInputLogin(e) {
    e.persist();
    setLogin((prev) => ({ 
      ...prev,
      [e.target.name]: e.target.value 
    }));
  }
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(e);
  };

  return (
    <div>
      <form className="input-form" onSubmit={onSubmit}>
        <InputRegAuth
          name="email"
          label="Enter email:"
          errFlag={Boolean(loginerr.email)}
          errMes={loginerr.email}
          value={login.email}
          onChange={(e) => {
            changeInputLogin(e);
            setLoginerr((prevState) => ({ ...prevState, email: "" }));
          }}
        />
        <InputRegAuth
          name="password"
          type={isRevealPwd ? "text" : "password"}
          label="Enter password:"
          errFlag={Boolean(loginerr.password)}
          errMes={loginerr.password}
          onChange={(e) => {
            changeInputLogin(e);
            setLoginerr((prevState) => ({ ...prevState, password: "" }));
          }}
          value={login.password}
          oth={
            <div
              className="registration-form-show-password"
              title={isRevealPwd ? "Hide password" : "Show password"}
              src={isRevealPwd ? EyeButton : ""}
              onClick={() => setIsRevealPwd((prevState) => !prevState)}
            >
              <EyeButton />
            </div>
          }
        />
        <div className="submit-button-div">
          <input className="submit-button" type="submit" value="LOG IN" />
          <CSSTransition
            classNames="inputErr-transition"
            nodeRef={nodeRef}
            in={Boolean(loginerr.detail)}
            timeout={300}
            unmountOnExit
          >
            <div className="registration-form-error" ref={nodeRef}>
              {loginerr.detail}
            </div>
          </CSSTransition>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
