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
  async register(req, res) {
    if (req.fileValidationError) {
      return res.status(422).send({ error: req.fileValidationError });
    }
    const { body } = req;
    const exist = await userModel.findOneByEmail(body.email);
    const existUsername = await userModel.findOneByUsername(body.username);
    const existPhone = await userModel.findOneByUsername(body.phoneNumber);
    if (exist) {
      return res.status(409).send({ error: 'Email already exist' });
    }
    if (existUsername) {
      return res.status(409).send({ error: 'Username already exist' });
    }
    if (existPhone) {
      return res.status(409).send({ error: 'Phone number already exist' });
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
    const savedUser = await userModel.create(newUser);
    if (!savedUser.id || savedUser.id === undefined) {
      return res.status(500).send({ error: savedUser });
    }
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
        user: {
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
  async signin(req, res) {
    const user = await userModel.findOneByEmail(req.body.email);
    if (!user) {
      return res.status(422).send({ error: 'Email or Password are incorrect' });
    }
    const ispassword = bcrypthash.comparepassword(req.body.password, user.password);
    if (!ispassword) {
      return res.status(422).send({ error: 'Email or Password are incorrect' });
    }
    const payloaad = {
      id: user.id,
      email: user.email,
      type: user.type,
    };
    const token = jwtToken.createToken(payloaad);

    return res.status(200).send({
      message: 'User is successfully logged in',
      data: {
        token,
        user: {
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
};

export default User;
