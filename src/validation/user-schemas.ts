import * as Joi from 'joi';

export const userIdParamSchema = Joi.object({
  id: Joi.string().guid().required()
});

export const userBodyUpdateSchema = Joi.object({
  login: Joi.string().regex(/^[a-zA-Z0-9 ]+$/),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/),
  age: Joi.number().integer().min(4).max(130)
});

export const userBodySchema = Joi.object({
  login: Joi.string().regex(/^[a-zA-Z0-9 ]+$/).required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/).required(),
  age: Joi.number().integer().min(4).max(130).required()
});

export const userQuerySchema = Joi.object({
  subStr: Joi.string().regex(/^[a-zA-Z0-9 ]+$/),
  limit: Joi.number().integer()
})
