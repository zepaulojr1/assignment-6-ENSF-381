import React from "react";
import Note from "./Note";

function NoteList({ notes, onDeleteNote }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note key={note.id} id={note.id} title={note.title} content={note.content} onDelete={onDeleteNote} />
      ))}
    </div>
  );
}

export default NoteList;
