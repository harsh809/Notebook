import React,{ useContext } from 'react'
import notescontext from '../context/notes/notescontext';

function Noteitem(props) {
    const context = useContext(notescontext);
    const { deletenote } = context;
    const { note,update } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mx-2">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(note._id); props.showalert("Successfully Deleted","success");}}></i>
                        <i className="fa-solid fa-file-pen mx-2" onClick={()=>update(note)}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
