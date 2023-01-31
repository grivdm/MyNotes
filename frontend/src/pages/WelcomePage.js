import React, { useRef, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import RegistrationComponent from "../components/RegistrationComponent";

import { CSSTransition, SwitchTransition } from "react-transition-group";

const WelcomePage = () => {
  const Emoji = (props) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );

  const [state, setState] = useState(false);
  const logRef = useRef(null);
  const regRef = useRef(null);
  const nodeRef = state ? logRef : regRef;
  return (
    <div className="welcome-page">
      <p>
        Hi there
        <Emoji symbol="👋" /> This single-page application is the best place to
        jot down quick thoughts and ideas or to save longer notes.
        <Emoji symbol="📝🧠" />
      </p>
      <div className="reglog-div">
        <button
          className={!state ? "reglog-button-active" : "reglog-button"}
          onClick={() => setState(false)}
        >
          Log In
        </button>

        <button
          className={state ? "reglog-button-active" : "reglog-button"}
          onClick={() => setState(true)}
        >
          Sign Up
        </button>
      </div>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          timeout={300}
          key={state ? "reg" : "log"}
          nodeRef={nodeRef}
          classNames="fade"
        >
          <div ref={nodeRef}>
            {!state ? <LoginComponent /> : <RegistrationComponent />}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default WelcomePage;
