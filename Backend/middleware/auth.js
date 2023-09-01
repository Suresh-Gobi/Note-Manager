const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Split the token and exclude the "Bearer" prefix
    const tokenValue = token.split(' ')[1];
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET, { clockTimestamp: Date.now() });
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
};
