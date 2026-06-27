
const Note = require("../models/note");

async function handleCreateNote(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        const { title, content } = req.body;
        await Note.create({ title, content, user: req.user._id });
        return res.redirect("/notes");
    } catch (error) {
        return next(error);
    }
}

async function handleGetAllNotes(req, res, next) {
    try {
        const notes = await Note.find({}).populate("user").sort({ createdAt: -1 });
        return res.status(200).json({ notes });
    } catch (error) {
        return next(error);
    }
}

async function handleGetNoteById(req, res, next) {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId).populate("user");
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (req.accepts("html")) {
            return res.render("note", { note });
        }
        return res.status(200).json({ note });
    } catch (error) {
        return next(error);
    }
}

async function handleUpdateNote(req, res, next) {
    try {
        const { noteId } = req.params;
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            { returnDocument: true, runValidators: true }
        );
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (req.accepts("html")) {
            return res.redirect("/notes");
        }
        return res.status(200).json({ note });
    } catch (error) {
        return next(error);
    }
}

async function handleDeleteNote(req, res, next) {
    try {
        const { noteId } = req.params;
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    handleCreateNote,
    handleGetAllNotes,
    handleGetNoteById,
    handleUpdateNote,
    handleDeleteNote
};
