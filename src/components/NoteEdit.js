import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function NoteEdit({ id, notes, setNotes }) {
  const history = useHistory();
  const [note, setNote] = useState({ id: "", title: "", content: "" });

  useEffect(() => {
    const selectedNote = notes.find((note) => note.id === id);
    setNote(selectedNote);
  }, [notes, id]);

  function handleTitleChange(event) {
    setNote({ ...note, title: event.target.value });
  }

  function handleContentChange(event) {
    setNote({ ...note, content: event.target.value });
  }

  function handleSaveNote() {
    const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    history.push("/");
  }

  function handleDeleteNote() {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    history.push("/");
  }

  return (
    <div className="note-edit-container">
      <div className="note-edit-title">
        <input type="text" value={note.title} onChange={handleTitleChange} placeholder="Enter note title..." />
      </div>
      <div className="note-edit-content">
        <textarea value={note.content} onChange={handleContentChange} placeholder="Enter note content..."></textarea>
      </div>
      <div className="note-edit-buttons">
        <button className="button button-save" onClick={handleSaveNote}>
          Save
        </button>
        <button className="button button-delete" onClick={handleDeleteNote}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteEdit;
