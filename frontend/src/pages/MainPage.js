import React, { useState, useEffect, useContext, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Sidebar from "../components/Sidebar";
import NotePage from "./NotePage";
import MainCard from "./Initial card";
import AuthContext from "../context/AuthContext";
import WelcomePage from "./WelcomePage";

import useFetch from "../utils/useFetch";
import PrivateRoute from "../utils/PrivateRoute";

const Manager = () => {
  let customFetch = useFetch();
  let [notes, setNotes] = useState([]);
  let { user, logoutUser } = useContext(AuthContext);
  const nodeRefSidebar = useRef(null);

  useEffect(() => {
    getNotes();
  }, [user]);

  let getNotes = async () => {
    if (user) {
      let { response, data } = await customFetch("/api/note/", {
        method: "GET",
      });
      if (response.status === 200) {
        setNotes(data);
      } else if (response.status === 401) {
        logoutUser();
      }
    }
  };

  return (
    <div className="main">
      <CSSTransition
        classNames="sidebar-transition"
        nodeRef={nodeRefSidebar}
        in={Boolean(user)}
        timeout={300}
        unmountOnExit
      >
        <div className="sidebar" ref={nodeRefSidebar}>
          <Sidebar notes={notes} />
        </div>
      </CSSTransition>

      <div className="workspace">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<MainCard />} />
            <Route
              path="/note/:noteid"
              element={<NotePage getNotes={getNotes} />}
            />
          </Route>
          <Route
            path="/welcome"
            element={<WelcomePage />}
            getNotes={getNotes}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Manager;
