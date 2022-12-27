import React, { useState, useEffect, useContext } from "react";
import NotesListPage from "./NotesListPage";
import NotePage from "./NotePage";
import { Routes, Route } from "react-router-dom";
import MainCard from "./Initial card";
import PrivateRoute from '../utils/PrivateRoute'
import AuthContext from "../context/AuthContext";
import useFetch from "../utils/useFetch";

const Manager = () => {
  let customFetch = useFetch() 
  let [notes, setNotes] = useState([]);
  let {user, logoutUser} = useContext(AuthContext)
  useEffect(() => {

    getNotes();
  }, []);

  let getNotes = async () => {
    if (user){
      let {response, data} = await customFetch("/api/note/", {method: 'GET'});
      if(response.status === 200){
        setNotes(data);
      }else if(response.statusText === 'Unauthorized'){
        logoutUser()
      }
    }
    
    
    // console.log('manager')
  };

  return (
    <>
      <div className="main">
        <div className="sidebar">
          <NotesListPage notes={notes} />
        </div>
        <div className="workspace">
        <PrivateRoute path="/" />
          <Routes>
          <Route
              path="/login" exact
              element=<MainCard/> getNotes={getNotes}
            />
            <Route
              path="/note/:noteid"
              element=<NotePage getNotes={getNotes} />
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Manager;
