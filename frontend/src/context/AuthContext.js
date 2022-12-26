import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // console.log('AuthProvider')

  const navigate = useNavigate()

  let [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );

  let [authToken, setAuthTokens] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  let [load, setLoad] = useState(true);

  useEffect(() => {
    // console.log('useEffect')
    if (authToken) {
      setUser(jwt_decode(authToken.access));
    };

    setLoad(false)
  }, [authToken, load]);

  let logoutUser = () => {
    console.log('logoutUser')
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate('/login')
  };

  let loginUser = async (e) => {
    console.log('loginUser')
    e.preventDefault();
    let response = await fetch(`http://127.0.0.1:8000/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      navigate('/')
    } else {
      alert("Smth went wrong! Please try again!");
    }
  };

  // let updateToken = async () => {
  //   if (authToken){
  //     let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ refresh: authToken?.refresh }),
  //     });
  //     console.log("updateToken");
  
  //     let data = await response.json();
      
  //     if (response.status === 200) {
  //       setAuthTokens(data);
  //       setUser(jwt_decode(data.access));
  //       localStorage.setItem("authToken", JSON.stringify(data));
  //     } else {
  //       logoutUser();
  //     };
  //   }


  //   if (load) {
  //     setLoad(false);
  //   }
  // };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authToken: authToken,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{load? null : children}</AuthContext.Provider>
  );
};
