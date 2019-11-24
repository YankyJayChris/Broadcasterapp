import jwt from 'jsonwebtoken';

const jwtToken = {

  createToken: (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return `Bearer ${token}`;
  },
};

export default jwtToken;
