import React from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = ({ notes }) => {
  return (
    <>
      <div className="sidebar-header">
        <h2 className="notes-title">Notes</h2>
        <AddButton />
      </div>
      <div className="notes-list">
        {notes ? notes.map((note, index) => (
          <ListItem key={index} note={note} />
        )): null}
      </div>
    </>
  );
};

export default NotesListPage;
