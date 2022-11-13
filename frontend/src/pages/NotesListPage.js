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
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
    </>
  );
};

export default NotesListPage;
