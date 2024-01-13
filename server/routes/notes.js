const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');


//Route : 1 Fetch all notes using GET : "/api/notes/fetchallnotes" ,login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//Route : 2 Add new notes using POST : "/api/notes/addnote" ,login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Enter a password atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors , return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ Error: errors.array() });
        }

        const notes = new Note({
            title,description,tag,user : req.user.id
        })
        const savednotes = await notes.save();
        res.json(savednotes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//Route : 3 Updating an existing notes using PUT : "/api/notes/updatenote/:id" ,login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        const newnote = {};
        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//Route : 4 Deleting an existing notes using DELETE : "/api/notes/deletenote/:id" ,login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note deleted" ,note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
module.exports = router