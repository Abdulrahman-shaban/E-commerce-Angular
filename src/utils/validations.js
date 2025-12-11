// src/utils/validations.js
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string().min(7).max(15).required(),
  addresses: Joi.array().items(
    Joi.object({
      label: Joi.string().allow('', null),
      governorate: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      building: Joi.string().allow('', null),
      floor: Joi.string().allow('', null),
      apartment: Joi.string().allow('', null),
      additional: Joi.string().allow('', null),
      phone: Joi.string().allow('', null),
      isDefault: Joi.boolean()
    })
  ).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
