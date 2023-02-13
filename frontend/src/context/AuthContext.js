import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const LSAuthToken = localStorage.getItem("authToken");

  const [user, setUser] = useState(
    LSAuthToken ? jwt_decode(LSAuthToken) : null
  );

  const [authToken, setAuthToken] = useState(
    LSAuthToken ? JSON.parse(LSAuthToken) : null
  );

  const [load, setLoad] = useState(true);
  const [loginerr, setLoginerr] = useState({
    email: "",
    password: "",
    detail: "",
  });

  useEffect(() => {
    if (authToken) {
      setUser(jwt_decode(authToken.access));
    }
    setLoad(false);
  }, [authToken]);

  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  let loginUser = async (e) => {
    await fetch(`http://127.0.0.1:8000/api/auth/jwt/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status >= 400 && response.status < 500) {
          const map = new Map();
          Object.keys(data).forEach((key) => {
            map.set(key, data[key]);
          });

          map.forEach((value, key) => {
            setLoginerr((prevState) => ({ ...prevState, [key]: value }));
          });
        } else if (response.status === 200) {
          setAuthToken(data);
          setUser(jwt_decode(data.access));
          localStorage.setItem("authToken", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch(() => {
        alert("Smth went wrong! Please try again!");
      });
  };

  let contextData = {
    user,
    loginUser,
    logoutUser,
    authToken,
    setAuthToken,
    setUser,
    loginerr,
    setLoginerr,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {load ? null : children}
    </AuthContext.Provider>
  );
};
