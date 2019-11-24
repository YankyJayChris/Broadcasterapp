// user model
import userModel from '../models/User';

// helper
import bcrypthash from '../helpers/hash';
import jwtToken from '../helpers/jwtToken';


const User = {
  /* @param {object} req
    @param {object} res
    @returns {object} user object
   */
  register(req, res) {
    if (req.fileValidationError) {
      return res.status(409).send({ error: req.fileValidationError });
    }
    const { body } = req;
    const exist = userModel.findOneByEmail(body.email);
    if (exist) {
      return res.status(409).send({ error: 'Email already exist' });
    }
    const newUser = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      phoneNumber: body.phoneNumber,
      username: body.username,
      password: body.password,
    };
    newUser.password = bcrypthash.hashpassword(body.password);
    if (req.file) {
      newUser.avatar = `/public/avatar/${req.file.filename}`;
    } else {
      newUser.avatar = '/public/avatar/noprofile.png';
    }
    const savedUser = userModel.create(newUser);
    const payloaad = {
      id: savedUser.id,
      email: savedUser.email,
      type: savedUser.type,
    };
    const token = jwtToken.createToken(payloaad);

    return res.status(201).send({
      message: 'User created successfully',
      data: {
        token,
        User: {
          firstname: savedUser.firstname,
          lastname: savedUser.lastname,
          email: savedUser.email,
          username: savedUser.username,
          id: savedUser.id,
          phoneNumber: savedUser.phoneNumber,
          avatar: savedUser.avatar,
          type: savedUser.type,
        },
      },
    });
  },
  /* @param {object} req
    @param {object} res
    @returns {object} users array
   */
  signin(req, res) {
    const user = userModel.findOneByEmail(req.body.email);
    if (!user) {
      return res.status(409).send({ error: 'Email or Password are incorrect' });
    }
    const ispassword = bcrypthash.comparepassword(req.body.password, user.password);
    if (!ispassword) {
      return res.status(409).send({ error: 'Email or Password are incorrect' });
    }
    const payloaad = {
      id: user.id,
      email: user.email,
      type: user.type,
    };
    const token = jwtToken.createToken(payloaad);

    return res.status(201).send({
      message: 'User is successfully logged in',
      data: {
        token,
        User: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          phoneNumber: user.phoneNumber,
          avatar: user.avatar,
          type: user.type,
        },
      },
    });
  },
  getAll() {
    // TO DO
  },
  /* @param {object} req
    @param {object} res
    @returns {object} user object
   */
  getOne() {
    // TO DO
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated user
   */
  update() {
    // TO DO
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated user
   */
  updateUserType() {
    // TO DO
  },
  /* @param {object} req
    @param {object} res
    @returns {void} return statuc code 204
   */
  delete() {
    // TO DO
  },
};

export default User;
