import React from "react";
import { NavLink } from "react-router-dom";

let getTitle = (note) => {
  let title = note.content.split("\n")[0];
  if (title.length > 22) {
    title = title.slice(0, 22);
    title = title.split(" ").slice(0, -1).join(" ");
  }
  return title;
};

let getContent = (note) => {
  let title = getTitle(note);
  let cont = note.content.replaceAll("\n", "");
  cont = cont.replaceAll(title, "");
  return cont.length > 50 ? cont.slice(0, 50) + "..." : cont;
};

let getTime = (note) => {
  const createTime = new Date(note.created).toLocaleDateString();
  const updateTime = new Date(note.updated).toLocaleDateString();

  return (
    <div className="notes-list-item-info">
      <div>created : {createTime}</div>
      <div>updated : {updateTime}</div>
    </div>
  );
};

const ListItem = ({ note }) => {
  return (
    <NavLink
      to={`/note/${note.id}`}
      className={({ isActive }) => (isActive ? "active-notes-list-item" : "")}
    >
      <div className="notes-list-item">
        <h3 className="notes-list-item-title">{getTitle(note)}</h3>
        <p className="notes-list-item-content">{getContent(note)}</p>
        {getTime(note)}
      </div>
    </NavLink>
  );
};

export default ListItem;
