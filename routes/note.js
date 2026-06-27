const express = require("express");
const { handleCreateNote, 
    handleGetAllNotes, handleGetNoteById, handleUpdateNote, handleDeleteNote 

} = require("../controllers/note");

const router = express.Router();
router.post("/", handleCreateNote);
router.get("/", handleGetAllNotes);
router.get("/:noteId", handleGetNoteById);
router.post("/:noteId", handleUpdateNote);
router.patch("/:noteId", handleUpdateNote);
router.delete("/:noteId", handleDeleteNote);

module.exports = router;
