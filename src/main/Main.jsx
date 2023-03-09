import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const [isBold] = useState(false);
  const [isItalic] = useState(false);
  const [isUnderline] = useState(false);
  const [isBullet, setIsBullet] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const onBoldClick = () => {
    const newBody = `**${activeNote.body}**`;
    onEditField("body", newBody);
  };

  const onItalicClick = () => {
    const newBody = `_${activeNote.body}_`;
    onEditField("body", newBody);
  };

  const onUnderlineClick = () => {
    const newBody = `<Text style={styles.underline}>${activeNote.body}</Text>`;
    onEditField("body", newBody);
  };

  const toggleBullet = () => {
    setIsBullet(!isBullet);
  };

  const handleBulletList = (event) => {
    event.preventDefault();
    const textArea = event.target;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = activeNote.body.substring(start, end);
    const textBefore = activeNote.body.substring(0, start);
    const textAfter = activeNote.body.substring(end);
    const bulletText = `- ${selectedText}`;
    const updatedText = `${textBefore}${bulletText}${textAfter}`;
    onEditField("body", updatedText);
  };

  const handleEditNote = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDeleteNote(id);
    }
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const boldMark = isBold ? "**" : "";
  const italicMark = isItalic ? "*" : "";
  const underlineMark = isUnderline ? "__" : "";
  const bulletMark = isBullet ? "- " : "";

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {!isEditing && (
          <button className="edit-note" onClick={handleEditNote}>
            Edit
          </button>
        )}
        {isEditing && (
          <button className="cancel-edit" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
        <div className="note-editor-buttons">
          <button className="Bold" onClick={onBoldClick}>
            B
          </button>
          <button className="Italic" onClick={onItalicClick}>
            I
          </button>
          <button className="Underline" onClick={onUnderlineClick}>
            U
          </button>
          <button
            className="Bullet"
            onClick={toggleBullet}
            style={{ fontWeight: isBullet ? "bold" : "normal" }}
          >
            &#8226;
          </button>
        </div>
        
       

        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
          disabled={!isEditing}
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Press Tab") {
              e.preventDefault();
              handleBulletList(e);
            }
          }}
          disabled={!isEditing}
        />

      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {`${boldMark}${italicMark}${underlineMark}${bulletMark}${activeNote.body}`}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
