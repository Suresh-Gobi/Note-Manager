const express = require("express"); // import express js
const userController = require("../controllers/userController"); //import Controller
const auth = require("../middleware/auth"); // import middlewre authentication

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/login", userController.login);
router.post('/addNote', auth.verifyToken, userController.addNote);
router.get('/getAllNote', auth.verifyToken, userController.getAllNotes);
router.delete('/deleteNote/:noteId', auth.verifyToken, userController.deleteNote);
router.put('/updateNote/:noteId', auth.verifyToken, userController.updateNote);

module.exports = router;