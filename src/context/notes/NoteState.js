import Notescontext from "./notescontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://notebook-server-git-main-harsh3711750gmailcoms-projects.vercel.app"
  // const host = "http://localhost:5000"

  //Get all notes
  const getnotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setnotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  //Add note
  const addnote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      setnotes(notes.concat(json));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  //Delete note
  const deletenote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const newnotes = notes.filter((note) => {
        return note._id !== id;
      });
      setnotes(newnotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  //Edit note
  const editnote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      let newnotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newnotes.length; index++) {
        let element = newnotes[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
      }
      setnotes(newnotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  }

  const [notes, setnotes] = useState([]);

  return (
    <Notescontext.Provider value={{ notes, setnotes, addnote, deletenote, getnotes, editnote }}>
      {props.children}
    </Notescontext.Provider>
  )
}

export default NoteState;
