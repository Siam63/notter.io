import React, { useState } from 'react';
// import { initializeApp } from 'firebase/app';
import './App.css';
import Note from './Components/Note';
import { firestore } from './firebase';
import {addDoc, collection, deleteDoc, doc, getDocs} from '@firebase/firestore';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const ref = collection(firestore, "notes");

  const handleSubmit = async (e) => {
    let data = {
      message: newNote,
    };

    try{
      addDoc(ref, data);
    }catch (error){
      console.log('Error adding note to firebase: ', error);
    }
  };

  const addNote = () => {
    if(newNote !== ''){
      setNotes([...notes, newNote]);
      setNewNote('');
    }

    handleSubmit();
  }

  const deleteNote = async (index) => {
    const noteToDelete = notes[index];
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    try{
      const snapshot = await getDocs(collection(firestore, 'notes'));
      const notesRef = snapshot.docs.find(doc => doc.data().message === noteToDelete);

      if(notesRef){
        await deleteDoc(doc(ref, notesRef.id));
        console.log('Note deleted from firebase');
      }else{
        console.log('Note not found in the firebase database.');
      }
    }catch (error){
      console.log('Error deleting note from firebase: ', error);
    }
  }

  const clearNotes = () => {
    setNotes([]);
  }

  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="my-5 text-2xl">Notter.io</h1>
      <div>
        <input className="pl-1 py-2" type="text" placeholder="Enter a new note..." value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
        <button className="bg-slate-300 hover:bg-slate-400 transition-all hover:scale-110 p-2 m-2 rounded-md" onClick={addNote}>Add Note</button>
        <button className="bg-slate-300 hover:bg-slate-400 transition-all hover:scale-110 p-2 m-2 rounded-md" onClick={clearNotes}>Clear Notes</button>
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
