import React from "react";
import { Link } from "react-router-dom";

function Note({ id, title, content, onDelete }) {
  return (
    <div className="note">
      <Link to={`/notes/${id}/edit`} className="note-title">
        {title || "Untitled"}
      </Link>
      <p className="note-content">{content}</p>
      <button className="button button-delete" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
