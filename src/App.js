import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import Editor from "./components/Editor";
import NoteList from "./components/NoteList";
import Layout from "./components/Layout";
import Header from "./components/Header";

function getNotesFromLocalStorage() {
  const notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(notes);
  } else {
    return [];
  }
}

function App() {
  const [notes, setNotes] = useState(getNotesFromLocalStorage());

  function addNote() {
    const newNote = { id: uuidv4(), title: "", content: "", timestamp: new Date().toISOString() };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }
  
  function deleteNote(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Header onAddNote={addNote} />
      <Layout>
        <Router>

          <Routes>
            <Route path="/" element={<NoteList notes={notes} onDeleteNote={deleteNote} />} />
            <Route path="/notes/:id/edit" element={<Editor notes={notes} setNotes={setNotes} />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
