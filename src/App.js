import React, { useState } from 'react';
import './App.css';
import Note from './Components/Note';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if(newNote !== ''){
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  }

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  }

  const clearNotes = () => {
    setNotes([]);
  }

  return (
    <div>
      <h1>Notter.io</h1>
      <div>
        <input type="text" placeholder="Enter a new note..." value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
        <button onClick={addNote}>Add Note</button>
        <button onClick={clearNotes}>Clear Notes</button>
      </div>
      <ul>
        {notes.map((noteText, index) => (
          <li key={index}>
            <Note key={index} text={noteText} onDelete={() => deleteNote(index)}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
