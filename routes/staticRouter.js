const express = require("express");
const Note = require("../models/note");
const { handleGetNoteById } = require("../controllers/note");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  return res.render("home");
});


router.get("/notes", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  const notes = await Note.find({}).populate("user").sort({ createdAt: -1 });
  return res.render("notes", { notes });
});

router.get("/notes/:noteId", handleGetNoteById);

router.get("/register", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }

  return res.render("register");
});

router.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }

  return res.render("login");
});

module.exports = router;
