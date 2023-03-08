import React from "react";

function Editor({ notes, setNotes }) {
  const selectedNote = notes[0];

  function handleTitleChange(event) {
    const newNotes = [...notes];
    const index = notes.indexOf(selectedNote);
    newNotes[index] = { ...selectedNote, title: event.target.value };
    setNotes(newNotes);
  }

  function handleContentChange(event) {
    const newNotes = [...notes];
    const index = notes.indexOf(selectedNote);
    newNotes[index] = { ...selectedNote, content: event.target.value };
    setNotes(newNotes);
  }

  return (
    <div className="editor-container">
      <div className="editor-title">
        <input
          type="text"
          value={selectedNote.title}
          onChange={handleTitleChange}
          placeholder="Enter note title..."
        />
      </div>
      <div className="editor-content">
        <textarea
          value={selectedNote.content}
          onChange={handleContentChange}
          placeholder="Enter note content..."
        ></textarea>
      </div>
    </div>
  );
}

export default Editor;
