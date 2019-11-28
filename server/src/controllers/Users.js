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
      return res.status(422).send({ error: req.fileValidationError });
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
  getAll(req, res) {
    const users = userModel.findAll();
    const myusers = [];
    users.forEach((user) => {
      const aUser = user;
      delete aUser.password;
      myusers.push(aUser);
    });
    return res.status(200).send({ data: myusers });
  },
  /* @param {object} req
    @param {object} res
    @returns {object} user object
   */
  getOne(req, res) {
    const user = userModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    return res.status(200).send(user);
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated user
   */
  update(req, res) {
    if (req.fileValidationError) {
      return res.status(409).send({ error: req.fileValidationError });
    }
    const user = userModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    if (user.id !== req.user.id) {
      return res.status(401).send({ error: 'this acount is not yours' });
    }
    const newData = {
      firstname: req.body.firstname || user.firstname,
      lastname: req.body.lastname || user.lastname,
      email: req.body.email || user.email,
      phoneNumber: req.body.phoneNumber || user.phoneNumber,
      username: req.body.username || user.username,
      password: req.body.password || user.password,
    };
    if (req.file) {
      newData.avatar = `/public/avatar/${req.file.filename}`;
    } else {
      newData.avatar = user.avatar;
    }
    const updateduser = userModel.update(req.params.id, newData);
    return res.status(200).send({ data: updateduser });
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated user
   */
  updateUserType(req, res) {
    if (req.fileValidationError) {
      return res.status(409).send({ error: req.fileValidationError });
    }
    const user = userModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    if (req.user.id !== 'admin') {
      return res.status(403).send({ error: 'you are not an admin' });
    }
    const updateduser = userModel.update(req.params.id, { type: req.body.type });
    return res.status(200).send(updateduser);
  },
  /* @param {object} req
    @param {object} res
    @returns {void} return statuc code 204
   */
  delete(req, res) {
    const user = userModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    const ref = userModel.delete(req.params.id);
    return res.status(204).send(ref);
  },
};

export default User;
