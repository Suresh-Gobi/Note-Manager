const User = require("../models/user");
const bcrypt = require("bcrypt"); //import bcrypt lib for hasing
const jwt = require("jsonwebtoken"); //import jwt lib for create tokens

// Funtion for create user accounts with username, email and password
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hashing password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function for login with email and password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // checks password is matching
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    //create token with jwt lib with the details of username, email
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function for add new note for authenticated users
exports.addNote = async (req, res) => {
  try {
    const { noteTitle, noteSubject, note } = req.body;
    const userId = req.user.userId;

    // Find the user by userId
    const user = await User.findById(userId);

    // if user if not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new note to the user's notes array
    user.notes.push({ noteTitle, noteSubject, note });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//function for get all the notes from database for authenticated users
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.userId;

    // check if user with userId
    const user = await User.findById(userId);

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if found return the user's notes
    res.status(200).json({ notes: user.notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function for delete note
exports.deleteNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.noteId;

    // check user by userId
    const user = await User.findById(userId);

    // if user found
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    // Find the index of the note in the user's notes array
    const noteIndex = user.notes.findIndex(
      (note) => note._id.toString() === noteId
    );

    // if note not found
    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Remove the note from the user's notes array
    user.notes.splice(noteIndex, 1);

    // Save the updated user document
    await user.save();

    // sucess message
    res.status(200).json({ message: "Note Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function for update user's note
exports.updateNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.noteId;
    const { noteTitle, noteSubject, note } = req.body;

    // Find user by userId
    const user = await User.findById(userId);

    // If user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find note by noteId
    const noteToUpdate = user.notes.find((n) => n._id.toString() === noteId);

    // if note not updates
    if (!noteToUpdate) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Update the note details
    noteToUpdate.noteTitle = noteTitle;
    noteToUpdate.noteSubject = noteSubject;
    noteToUpdate.note = note;

    // Send a response indicating success
    res.status(200).json({ message: "Note updated successfully" });

    // Save the updated user document
    await user.save();
  } catch (error) {
    // Handle errors and send an appropriate error response
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
