import React, { useContext } from 'react'
import notescontext from '../context/notes/notescontext';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function Noteitem(props) {
    const context = useContext(notescontext);
    const { deletenote } = context;
    const { note, update } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mx-2 overflow-hidden">{note.title}</h5>
                        <Tooltip title="Delete" >
                            <IconButton onClick={() => { deletenote(note._id); props.showalert("Successfully Deleted", "success"); }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Update" >
                            <IconButton onClick={() => update(note)}>
                                <DriveFileRenameOutlineIcon  />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
