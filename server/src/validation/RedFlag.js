import Joi from '@hapi/joi';

const schemas = {
  redFlagPost: Joi.object().keys({
    title: Joi.string().required(),
    comment: Joi.string().required(),
    type: Joi.string().required(),
    location: Joi.string().pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/).required(),
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
