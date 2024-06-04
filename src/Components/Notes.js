import React, { useContext, useEffect, useState, useRef } from 'react';
import Noteitem from './Noteitem';
import notescontext from '../context/notes/notescontext';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
import './CSS/Notes.css'; // Add this line to import your CSS file

function Notes(props) {
  const context = useContext(notescontext);
  const { notes, getnotes, editnote } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getnotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setnote] = useState({ id: "", title: "", description: "", tag: "" });
  //update function 
  const update = (note) => {
    ref.current.click();
    setnote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
  }
  const handleclick = (e) => {
    e.preventDefault();
    editnote(note.id, note.title, note.description, note.tag);
    refclose.current.click();
    props.showalert("Successfully Updated", "success");
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Addnote showalert={props.showalert} />
      <button type="button" ref={ref} className="btn-update d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea id="description" name="description" className="form-control" value={note.description} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" id="tag" name="tag" className="form-control" value={note.tag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn-update" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn-update" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='notes-container'>
        <h2 className='note-heading'>Notes</h2>
        <div className="no-notes-message">
          {notes.length === 0 && 'No Notes To Display'}
        </div>
        <div className="notes-grid">
          {notes.map((note) => {
            return <Noteitem key={note._id} note={note} update={update} showalert={props.showalert} />
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
