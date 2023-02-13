import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import useFetch from "../utils/useFetch";

function NotePage({ getNotes }) {
  const customFetch = useFetch();
  const { user, authToken } = useContext(AuthContext);
  const [note, SetNote] = useState([]);
  const { noteid } = useParams();
  useEffect(() => {
    getNote();
  }, [noteid]);

  const [flag, BlankValue] = useState(false);

  const navigate = useNavigate();

  const getNote = async () => {
    if (noteid === "new") {
      SetNote({ content: "" });
    } else {
      let { response, data } = await customFetch(`/api/note/${noteid}/`, {
        method: "GET",
      });
      if (response.status === 200) {
        SetNote(data);
      } else {
        navigate("/");
      }
    }
  };

  const updateNote = async () => {
    await customFetch(`/api/note/${noteid}/`, {
      method: "PUT",
      body: JSON.stringify(note),
    });
    getNotes();
  };
  
  const createNote = async () => {
    await customFetch(`/api/note/`, {
      method: "POST",
      body: JSON.stringify(note),
    });
    navigate("/");
    getNotes();
  };

  const deleteNote = async () => {
    await fetch(`/api/note/${noteid}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken?.access),
      },
    });
    getNotes();
    navigate("/");
  };

  const handleSubmit = () => {
    if (noteid !== "new" && !note.content) {
      deleteNote();
    } else if (noteid !== "new") {
      updateNote();
    } else if (noteid === "new" && !note.content) {
    }

    navigate("/");
    getNotes();
  };

  const handleChange = (value) => {
    if (noteid === "new" && !value) {
      BlankValue(false);
    } else {
      BlankValue(true);
    }
    SetNote((note) => ({ ...note, content: value, user: user.user_id }));
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
