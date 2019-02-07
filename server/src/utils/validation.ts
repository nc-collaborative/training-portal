import Joi from 'joi';

const string = Joi.string()
  .trim()
  .empty('')
  .default(null);

export const varchar = string.max(255);

export const text = string.max(65535);
