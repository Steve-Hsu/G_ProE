const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If token exist then...try
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.company = decoded.company;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
