import React from "react";

function Header({ onAddNote }) {
  return (
    <header className="header">
      <h1>React Notes</h1>
      <button className="button button-new" onClick={onAddNote}>
        New Note
      </button>
    </header>
  );
}

export default Header;
