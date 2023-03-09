import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

const Main = ({ activeNote, onUpdateNote }) => {
  const editorRef = useRef(null);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const onBoldClick = () => {
    const newBody = `**${activeNote.body}**`;
    onEditField("body", newBody);
  };

  const onItalicClick = () => {
    const newBody = `_${activeNote.body}_`;
    onEditField("body", newBody);
  };

  const onUnderlineClick = () => {
    const newBody = `<u>${activeNote.body}</u>`;
    onEditField("body", newBody);
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <div className="editor-buttons">
          <button className="editor-button" onClick={onBoldClick}>
            <b>B</b>
          </button>
          <button className="editor-button" onClick={onItalicClick}>
            <i>I</i>
          </button>
          <button className="editor-button" onClick={onUnderlineClick}>
            <u>U</u>
          </button>
        </div>
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
          ref={editorRef}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
