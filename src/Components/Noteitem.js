import React, { useContext, useRef, useState } from 'react';
import notescontext from '../context/notes/notescontext';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import './CSS/Noteitem.css';

function Noteitem(props) {
    const context = useContext(notescontext);
    const { deletenote } = context;
    const { note, update } = props;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const refOpenModal = useRef(null);
    const refCloseModal = useRef(null);

    const handleOpenUpdateModal = () => {
        refOpenModal.current.click();
    };

    const handleViewDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className='col-md-3'>
            <div className="note-card my-3">
                <div className="card-body">
                    <h5 className="card-title mx-2 overflow-hidden">{note.title}</h5>
                    <p className="card-text">
                        {showFullDescription ? note.description : `${note.description.split(' ').slice(0, 3).join(' ')}...`}
                        <span className="view-more" onClick={handleViewDescription}>
                            {showFullDescription ? 'Less' : 'View'}
                        </span>
                    </p>
                    <div className="card-actions">
                        <Tooltip title="View">
                            <IconButton onClick={handleOpenUpdateModal}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => { deletenote(note._id); props.showalert("Successfully Deleted", "success"); }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Update">
                            <IconButton onClick={() => update(note)}>
                                <DriveFileRenameOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <button type="button" ref={refOpenModal} className="btn-update d-none" data-bs-toggle="modal" data-bs-target="#updateModal">
                Open Update Modal
            </button>
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5" id="updateModalLabel">Note</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea id="description" name="description" className="form-control" value={note.description} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" id="tag" name="tag" className="form-control" value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Noteitem;
