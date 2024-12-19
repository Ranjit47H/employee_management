const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user payload to request object
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error('JWT verification error:', err.message); // Log error for debugging
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
