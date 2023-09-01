const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user with hashed password
        const newUser = await User.create({ username, email, password: hashedPassword });
    
        // Note that we're saving the hashed password, not the original password
        
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate JWT token with email included in the payload
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email }, // Include email in the payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addNote = async (req, res) => {
  try {
    const { noteTitle, noteSubject, note } = req.body;
    const userId = req.user.userId; // From the JWT verification middleware

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new note to the user's notes array
    user.notes.push({ noteTitle, noteSubject, note });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: 'Note added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.userId; // From the JWT verification middleware

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's notes
    res.status(200).json({ notes: user.notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};