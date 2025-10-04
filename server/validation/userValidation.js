import Joi from "joi";

const name = Joi.string()
  .min(3)
  .max(30)
  .trim()
  .lowercase()
  .required()
  .messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name cannot exceed 30 characters",
  });

const email = Joi.string()
  .email()
  .trim()
  .lowercase()
  .required()
  .messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  });

const password = Joi.string()
  .min(6)
  .max(100)
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  });

export const validateUserRegistration = (data) => {
  const schema = Joi.object({
    name,
    email,
    password,
  });
  return schema.validate(data, { abortEarly: false });
};

export const validateUserLogin = (data) => {
  const schema = Joi.object({
    email,
    password,
  });
  return schema.validate(data, { abortEarly: false });
};