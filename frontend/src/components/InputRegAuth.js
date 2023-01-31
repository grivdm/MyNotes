import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const InputRegAuth = ({
  type = "text",
  name,
  label,
  value,
  errFlag,
  errMes,
  oth,
  ...props
}) => {
  const nodeRef = useRef(null);

  return (
    <div className="input-w-element">
      <input type={type} name={name} value={value} {...props} />
      <label className={value && "filled"} htmlFor={name}>
        {label}
      </label>

      <CSSTransition
        classNames="inputErr-transition"
        nodeRef={nodeRef}
        in={errFlag}
        timeout={300}
        unmountOnExit
      >
        <div className="registration-form-error" ref={nodeRef}>
          {errMes}
        </div>
      </CSSTransition>

      {oth}
    </div>
  );
};

export default InputRegAuth;
