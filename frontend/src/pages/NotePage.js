import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function NotePage({ getNotes }) {
  const [note, SetNote] = useState([]);
  const { noteid } = useParams();
  useEffect(() => {
    getNote();
  }, [noteid]);

  const [flag, BlankValue] = useState(false);

  const navigate = useNavigate();

  let getNote = async () => {
    if (noteid === "new") {
      let response = { content: "" };
      SetNote(response);
    } else {
      let response = await fetch(`/api/note/${noteid}/`);
      let data = await response.json();
      SetNote(data);
    }
  };

  let createNote = async () => {
    fetch(`/api/note/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Created");
      });
    navigate("/");
    getNotes();
  };

  let updateNote = async () => {
    fetch(`/api/note/${noteid}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Updated");
      });
  };

  let deleteNote = async () => {
    fetch(`/api/note/${noteid}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    navigate("/");
    getNotes();
    console.log("Deleted");
  };

  let handleSubmit = () => {
    if (noteid !== "new" && !note.content) {
      deleteNote();
    } else if (noteid !== "new") {
      updateNote();
    } else if (noteid === "new" && !note.content) {
    }

    navigate("/");
    getNotes();
  };

  let handleChange = (value) => {
    if (noteid === "new" && !value) {
      BlankValue(false);
    } else {
      BlankValue(true);
    }
    SetNote((note) => ({ ...note, content: value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        {noteid !== "new" ? (
          <button onClick={handleSubmit}>Save</button>
        ) : (
          <button onClick={createNote} disabled={!flag}>
            Create
          </button>
        )}

        {noteid !== "new" ? <button onClick={deleteNote}>Delete</button> : ""}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.content}
      ></textarea>
    </div>
  );
}

export default NotePage;
