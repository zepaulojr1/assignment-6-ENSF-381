import Main from "../main/Main.jsx";
const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  showSidebar,
  setShowSidebar,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDeleteNote(id);
    }
  };

  return (
    <div className={`app-sidebar ${showSidebar ? "" : "hidden"}`}>
      <div className="app-sidebar-header">
        <button className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? "Hide" : "Show"}
        </button>
        <h1>Notes</h1>
        <button className="add-button" onClick={onAddNote}>+</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button className="delete-button" onClick={(e) => handleDeleteNote(id)}>Delete</button>
            </div>

            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
