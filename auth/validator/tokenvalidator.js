const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
    const tokenHeaderKey = 'jwt-token';
    const jwtSecretKey ='gunmeet';
    const token = req.headers.authorization || req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      
      req.user = decoded;
      
  
      return res.status(200).json({ message: 'Authenticated' });
      } catch (error) {
      res.status(400).json({ error: 'Invalid token.' });
    }
  };
  module.exports= {authenticateToken};