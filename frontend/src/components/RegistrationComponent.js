import React, { useContext, useState } from "react";
import validator from "validator";
import AuthContext from "../context/AuthContext";
import { ReactComponent as EyeButton } from "../assets/eye.svg";
import InputRegAuth from "./InputRegAuth";

const RegistrationComponent = () => {
  let { loginUser } = useContext(AuthContext);

  const [register, setRegister] = useState(() => {
    return {
      username: "",
      email: "",
      password: "",
    };
  });

  function changeInputRegister(e) {
    e.persist();
    setRegister((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  const [validateFlag, setValidateFlag] = useState(() => {
    return {
      username: false,
      email: true,
      password: true,
    };
  });

  const [err, setErr] = useState(() => {
    return {
      username: "",
      email: "",
      password: "",
    };
  });

  const emailForm = (e) => {
    if (validator.isEmail(e.target.value)) {
      setValidateFlag({ ...validateFlag, email: false });
      setErr({ ...err, email: "" });
    } else {
      setValidateFlag({ ...validateFlag, email: true });
      setErr({ ...err, email: "Incorrect Email" });
    }
  };
  const usernameForm = (e) => {
    if (5 <= e.target.value.length && e.target.value.length < 50) {
      setValidateFlag({ ...validateFlag, username: false });
      setErr({ ...err, username: "" });
    } else {
      setValidateFlag({ ...validateFlag, username: true });
      setErr({
        ...err,
        username: "Username must be between 5 and 50 characters long.",
      });
    }
  };

  const passwordForm = (e) => {
    if (validator.isStrongPassword(e.target.value, { minLength: 8 })) {
      setValidateFlag({ ...validateFlag, password: false });
      setErr({ ...err, password: "" });
    } else {
      setValidateFlag({ ...validateFlag, password: true });
      setErr({
        ...err,
        password:
          "Password must be at least 8 characters including lowercase [a-z], uppercase [A-Z] and a number",
      });
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/api/auth/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: register.email,
        username: register.username,
        password: register.password,
      }),
    })
      .then(async (response) => {
        if (response.status !== 201) {
          let data = await response.json();
          const map = new Map();
          Object.keys(data).forEach((key) => {
            map.set(key, data[key][0]);
          });

          map.forEach((value, key) => {
            setErr((prevState) => ({ ...prevState, [key]: value }));
            setValidateFlag((prevState) => ({ ...prevState, [key]: true }));
          });
        } else {
          loginUser(e);
        }
      })
      .catch(() => {
        alert("An error occurred on the server");
      });
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <>
      <form className="input-form" onSubmit={submitRegister}>
        <InputRegAuth
          name="email"
          label="Enter email:"
          onChange={(e) => {
            changeInputRegister(e);
            emailForm(e);
          }}
          value={register.email}
          errFlag={Boolean(err.email)}
          errMes={err.email}
          autoComplete="off"
        />

        <InputRegAuth
          name="username"
          label="Enter username:"
          errFlag={Boolean(err.username)}
          errMes={err.username}
          onChange={(e) => {
            changeInputRegister(e);
            usernameForm(e);
          }}
          value={register.username}
          autoComplete="off"
        />

        <InputRegAuth
          name="password"
          type={isRevealPwd ? "text" : "password"}
          label="Enter password:"
          onChange={(e) => {
            changeInputRegister(e);
            passwordForm(e);
          }}
          value={register.password}
          errFlag={Boolean(err.password)}
          errMes={err.password}
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
          <input
            className="submit-button"
            type="submit"
            value="SIGN UP"
            disabled={
              validateFlag.email ||
              validateFlag.password ||
              validateFlag.username
            }
          />
        </div>
      </form>
    </>
  );
};

export default RegistrationComponent;
