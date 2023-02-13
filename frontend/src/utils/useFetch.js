import { useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import AuthContext from "../context/AuthContext";



const useFetch = () => {
  let config = {};
  let { authToken, setAuthToken, logoutUser, setUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);



  const baseURL = "http://127.0.0.1:8000";

  const originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    const response = await fetch(url, config);
    if (response) {
      const data = await response.json();
      return { response, data };
    }
  };

  const refreshToken = async (refresh) => {
    setLoading(true);
    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refresh }),
      }
    )
      .then(async (response) => {
        let data = await response.json();
        if (response.status == 200) {
          console.log('old: ' + localStorage.getItem("authToken"))
          localStorage.setItem("authToken", JSON.stringify(data));
          console.log('new: ' + localStorage.getItem("authToken"))
          setAuthToken(data);
          setUser(jwt_decode(data.access));
        }else if(response.status == 401){
          console.log('401')
        } else {
          logoutUser();
        }
        return data;
      })

      .catch((err) => {
        setLoading(false);
        alert("Smth went wrong! Please try again!" + err.message);
      });

    setLoading(false);
    return response;
  };

  const callFetch = async (url, settings) => {
    let actualtoken = {...authToken};

    const user = jwt_decode(actualtoken?.access);
    const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;

    if (isExpired && !loading) {
      actualtoken = await refreshToken(actualtoken.refresh);
    }

    config = {
      ...settings,
      headers: {
        Authorization: `Bearer ${actualtoken?.access}`,
        "Content-Type": "application/json",
      },
    };

    const { response, data } = await originalRequest(url, config);
    return { response, data };
  };

  return callFetch;
};

export default useFetch;
