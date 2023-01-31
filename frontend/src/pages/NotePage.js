import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useFetch from "../utils/useFetch";

function NotePage({ getNotes }) {
  let customFetch = useFetch();
  let { user, authToken } = useContext(AuthContext);
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

  let createNote = async () => {
    await customFetch(`/api/note/`, {
      method: "POST",
      body: JSON.stringify(note),
    });
    navigate("/");
    getNotes();
  };

  let updateNote = async () => {
    await customFetch(`/api/note/${noteid}/`, {
      method: "PUT",
      body: JSON.stringify(note),
    });
    getNotes();
  };

  let deleteNote = async () => {
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
