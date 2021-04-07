const joi = require("joi");
const registerValidations = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    // password: joi.string().min(6).max(30).required(),
    password: joi
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .label("password")
    .messages({
      "string.min": "Must have at least 8 characters",
      "object.regex": "Must have at least 8 characters",
      "string.pattern.base": "Minimum eight characters, at least one letter, one number and one special character",
    }),
    // role: joi.string(),
  });
  return schema.validate(data);
};
const loginValidations = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};
const changePasswordValidation = (data) => {
  const schema = joi.object({
    newPassword: joi
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .label("newPassword")
    .messages({
      "string.min": "Must have at least 8 characters",
      "object.regex": "Must have at least 8 characters",
      "string.pattern.base": "Minimum eight characters, at least one letter, one number and one special character",
    }),
    currentPassword: joi
    .string().required()
    // role: joi.string(),
  });
  return schema.validate(data);
};

module.exports = { registerValidations, loginValidations, changePasswordValidation };
