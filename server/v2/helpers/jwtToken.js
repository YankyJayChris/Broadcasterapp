import jwt from 'jsonwebtoken';

// user model
import userModel from '../models/User';

const jwtToken = {

  createToken: (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return `Bearer ${token}`;
  },
  // eslint-disable-next-line consistent-return
  verifyToken: (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(403).send({ error: 'No token provided.' });
    }
    if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    } else {
      return res.status(403).send({ error: 'token is not valid.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(500).send({ error: 'Failed to authenticate token.' });
    }
    const user = userModel.findOne(decoded.id);
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    // if everything good, save user id,type,email to request for use in other routes
    req.user = { id: decoded.id, type: decoded.type, email: decoded.email };
    next();
  },
};

export default jwtToken;
