import React, { useState, useEffect } from "react";
import NotesListPage from "./NotesListPage";
import NotePage from "./NotePage";
import { Routes, Route } from "react-router-dom";
import MainCard from "./Initial card";

const Manager = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/note/");
    let data = await response.json();
    setNotes(data);
    // console.log('manager')
  };

  return (
    <>
      <div className="main">
        <div className="sidebar">
          <NotesListPage notes={notes} />
        </div>
        <div className="workspace">
          <Routes>
            <Route path="/" exact element=<MainCard /> />
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
