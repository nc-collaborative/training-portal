import Joi from 'joi';

const string = Joi.string()
  .trim()
  .empty('')
  .default(null);

export const varchar = string.max(255);

export const text = string.max(65535);

export const password = Joi.object().keys({
  password: string
    .min(8)
    .required()
    .error(() => 'password must be at least 8 characters long'),
  password2: Joi.equal(Joi.ref('password')).error(
    () => 'passwords do not match',
  ),
});

export const checkbox = Joi.boolean()
  .truthy('')
  .default(false);
