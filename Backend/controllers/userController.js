const User = require('../models/user');
const Admin = require('../models/admin');
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

exports.createAdmin = async (req, res) => {
    try {
        const { adminname, email, password } = req.body;
    
        // Check if user with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ message: 'User with this email already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user with hashed password
        const newAdmin = await Admin.create({ adminname, email, password: hashedPassword });
    
        // Note that we're saving the hashed password, not the original password
        
        res.status(201).json(newAdmin);
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

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user with the provided email exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { adminId: admin._id, adminname: admin.adminname },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };