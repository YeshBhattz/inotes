const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes");

//Route 1: Get all the notes using: GET"api/notes/fetchnotes". Login Required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
});

//Route 2: Add the notes using: POST: "api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please enter the title").isLength({ min: 3 }),
    body("description", "Description must be atlease of 5 characters").isLength(
      { min: 3 }
    ),
  ],
  async (req, res) => {
    try {

    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.send(`Hello, ${req.body.name}!`);
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savednote = await note.save();

    res.json(savednote);
            
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
  }
);


//Route 3: update the notes using: PUT: "api/notes/updatenote". Login Required

router.put(
  "/updatenote/:id",
  fetchuser, async (req, res) => {
    try {

      const { title, description, tag } = req.body;
      //creating new note object
      const newNote={};
      if(title){newNote.title = title}
      if(description){newNote.description = description}
      if(tag){newNote.tag = tag}
    
      // find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if(!note){
        return res.status(404).send("Not Found")
      }
      if(note.user.toString() != req.user.id){
        return res.status(401).send("Not allowed")
      }
      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
      res.json({note})

            
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
  }
);




//Route 4: delete the notes using: DELETE: "api/notes/deletenote". Login Required

router.delete(
  "/deletenote/:id",
  fetchuser, async (req, res) => {
    try {
    
      // find the note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if(!note){
        return res.status(404).send("Not Found")
      }
      if(note.user.toString() != req.user.id){
        return res.status(401).send("Not allowed")
      }
      note = await Note.findByIdAndDelete(req.params.id)
      res.json({"Success": "Your note has been deleted successfully"})

            
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
  }
);
module.exports = router;
