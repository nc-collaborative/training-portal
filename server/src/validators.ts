import * as Joi from 'joi';

export const schema = Joi.object().keys({
  firstName: Joi.string().max(255),
  lastName: Joi.string().max(255),
  email: Joi.string().max(255),
  password: Joi.string().min(8),
});
