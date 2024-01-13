import React,{ useState,useContext } from 'react'
import notescontext from '../context/notes/notescontext';

function Addnote(props) {
    const context = useContext(notescontext);
    const { addnote } = context;
    const [note,setnote] = useState({title:"",description:"",tag:""})
    const handleclick = (e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setnote({title:"",description:"",tag:""});
        props.showalert("Successfully Added","success");
    }
    const onchange = (e)=>{
        setnote({...note,[e.target.name] : e.target.value})
    }
  return (
    <div>
      <div className='container my-3'>
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" id="description" name="description" className="form-control" value={note.description} onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" id="tag" name="tag" className="form-control" value={note.tag} onChange={onchange}/>
          </div>
          <button disabled={note.title.legth<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default Addnote
