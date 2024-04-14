import Notescontext from "./notescontext";
import {useState} from "react";

const NoteState = (props)=>{
    const host = "http://notebook-server-fawn.vercel.app"
    // const host = "http://localhost:5000"
    //Getallnotes
    const getnotes = async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setnotes(json);
    }

    //Addnote
    const addnote = async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      setnotes(notes.concat(json));
    }
    //Deletenote
    const deletenote = async (id)=>{
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const newnotes = notes.filter((note)=>{
        return note._id!==id;
      })
      setnotes(newnotes);
    }
    //editnote
    const editnote = async (id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      // eslint-disable-next-line
      const json = response.json();

      let newnotes = JSON.parse(JSON.stringify(notes));
      for(let index = 0;index<newnotes.length;index++){
        let element = newnotes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
      }
      setnotes(newnotes);
    }
    const [notes,setnotes] = useState([]);
    
    return(
        <Notescontext.Provider value={{notes,setnotes,addnote,deletenote,getnotes,editnote}}>
            {props.children}
        </Notescontext.Provider>
    )
}

export default NoteState;


