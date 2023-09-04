const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/login", userController.login);
router.post('/addNote', auth.verifyToken, userController.addNote);
router.get('/getAllNote', auth.verifyToken, userController.getAllNotes);
router.delete('/deleteNote/:noteId', auth.verifyToken, userController.deleteNote);
router.put('/updateNote/:noteId', auth.verifyToken, userController.updateNote);

module.exports = router;