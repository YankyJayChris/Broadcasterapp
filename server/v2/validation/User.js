import Joi from '@hapi/joi';

const schemas = {
  signup: Joi.object().keys({
    firstname: Joi.string().max(30).alphanum().required(),
    lastname: Joi.string().max(30).alphanum().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    re_password: Joi.ref('password'),
    role: Joi.string().valid('user', 'admin'),
  }),
  userUpdate: Joi.object().keys({
    firstname: Joi.string().alphanum(),
    lastname: Joi.string().alphanum(),
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    phoneNumber: Joi.string().trim().regex(/^[0-9]{7,10}$/),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/),
    role: Joi.string().valid('user', 'admin'),
  }),
  usersignin: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  }),
  userID: Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const userValidator = (schema, property) => {
  const prop = property;
  const useSchema = schema;
  return (req, res, next) => {
    const { error } = schemas[useSchema].validate(req[prop], schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({ error: message });
    }
  };
};

export default userValidator;
