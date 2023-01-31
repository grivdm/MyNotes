import React from "react";
import ListItem from "./ListItem";



const NotesList = ({ notes }) => {
  

  return (
    <div className="notes-list">
      {notes
        ? notes.map((note, index) => (
            <ListItem key={index} note={note} />
          ))
        : null}
    </div>
  );
};

export default NotesList;
