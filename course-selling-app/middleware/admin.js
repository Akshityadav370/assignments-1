const jwt = require('jsonwebtoken');
const ADMIN_SECRET = process.env.ADMIN_SECRET;

const authenticateAdminJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, ADMIN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid Token' });
      }
      req.adminId = user.adminId;
      next();
    });
  } else {
    req.status(401).json({ message: 'Unauthorised: No token provided' });
  }
};

module.exports = { authenticateAdminJwt, ADMIN_SECRET };
