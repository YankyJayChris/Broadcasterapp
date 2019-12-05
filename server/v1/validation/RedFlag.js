import Joi from '@hapi/joi';

const schemas = {
  redFlagPost: Joi.object().keys({
    title: Joi.string().min(5).required(),
    comment: Joi.string().min(5).required(),
    type: Joi.string().valid('red-flag', ' ​intervention').required(),
    location: Joi.string().pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/).required(),
    status: Joi.string().valid('draft', 'under investigation', 'resolved', 'rejected'),
  }),
  redFlagID: Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
  redFlagUpdate: Joi.object().keys({
    title: Joi.string(),
    comment: Joi.string(),
    type: Joi.string(),
    location: Joi.string().pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/),
    status: Joi.string().valid('draft', 'under investigation', 'resolved', 'rejected'),
  }),
};

const redFlagValidator = (schema, property) => {
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
      console.log('error', message);
      res.status(422).json({ error: message });
    }
  };
};

export default redFlagValidator;
