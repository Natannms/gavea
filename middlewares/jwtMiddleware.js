const jwt = require('jsonwebtoken');
require('dotenv').config();
function jwtMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); // Substitua 'your-secret-key' pela chave secreta do seu JWT
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = jwtMiddleware;
