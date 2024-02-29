const redisClient = require('../config/redisConfig'); // Substitua pelo caminho correto
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET; // Substitua pela sua chave secreta real

const adminPermision = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  
  try {
    const decodedToken = await jwt.verify(token, secretKey); // Substitua pela sua chave secreta real
    const userInRedis = `user:${decodedToken.id}`
    const userSession = await  redisClient.client.get(userInRedis);
    const user = JSON.parse(userSession)
    if(userSession && user.type !== 3){
      return res.status(403).json({ message: 'Você não tem permissões para acessar essa rota' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminPermision;
