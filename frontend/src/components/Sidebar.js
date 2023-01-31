import React, {useState} from "react";
import ListItem from "./ListItem";
import AddButton from "./AddButton";
import Search from "./Search";
import NotesList from "./NotesList";

const filterNotes = (notes, query) => {
  if (!query) {
    return notes;
  } else {
    return notes.filter((note) => {
      const noteContent = note.content.toLowerCase();
      return noteContent.includes(query.toLowerCase());
    });
  }
};

const Sidebar = ({ notes }) => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredNotes = filterNotes(notes, searchQuery);


  return (
    <>
      <div className="sidebar-header">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddButton />
      </div>
      <NotesList notes={filteredNotes} />
    </>
  );
};

export default Sidebar;
