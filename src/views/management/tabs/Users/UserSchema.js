import Joi from "@hapi/joi";

export const RegisterSchema = {
  id: Joi.string().allow(null).optional(),
  first_name: Joi.string().required().label("Name").messages({
    "string.base": " Name Is Required",
    "any.required": "Name Is Required",
    "string.empty": "Name Is Required",
  }),
  last_name: Joi.string().required().messages({
    "string.base": "Role Name Is Required",
    "any.required": "Role Name Is Required",
    "string.empty": "Role Name Is Required",
  }),
  email: Joi.string()
    .label("Email")
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid Email address.",
      "any.required": "Email is a required",
      "string.empty": "Email is a required",
    }),
  profession: Joi.string().required().messages({
    "string.base": "Profession Is Required",
    "any.required": "Profession Is Required",
    "string.empty": "Profession Is Required",
  }),

  phone_number: Joi.string().required().messages({
    "string.base": "Phone Number Is Required",
    "any.required": "Phone Number Is Required",
    "string.empty": "Phone Number Is Required",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address Is Required",
    "any.required": "Address Is Required",
    "string.empty": "Address Is Required",
  }),
  password: Joi.string()
    .required()
    .label("password")
    .pattern(
      new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=\-!*()@%&]).{8,}$/)
    )
    .messages({
      "string.pattern.base": "Password doesn't meet the minimum requirements",
      "any.required": "Password is required",
      "string.empty": "Password is required",
      "any.ref": "Passwords must match",
    }),
  password_confirmation: Joi.optional()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords must match" }),
  role: Joi.string().optional().label("role").messages({
    "string.base": "Role is required",
    "any.required": "Role is required",
    "string.empty": "Role is required",
  }),
  ProfilePicture: Joi.any()
    .meta({ swaggerType: "file" })
    .optional()
    .description("image file"),
};

export const EditUserSchema = {
  id: Joi.string().allow(null).optional(),
  first_name: Joi.string().required().label("Name").messages({
    "string.base": " Name Is Required",
    "any.required": "Name Is Required",
    "string.empty": "Name Is Required",
  }),
  last_name: Joi.string().required().messages({
    "string.base": "Role Name Is Required",
    "any.required": "Role Name Is Required",
    "string.empty": "Role Name Is Required",
  }),
  email: Joi.string()
    .label("Email")
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid Email address.",
      "any.required": "Email is a required",
      "string.empty": "Email is a required",
    }),
  profession: Joi.string().required().messages({
    "string.base": "Profession Is Required",
    "any.required": "Profession Is Required",
    "string.empty": "Profession Is Required",
  }),

  phone_number: Joi.string().required().messages({
    "string.base": "Phone Number Is Required",
    "any.required": "Phone Number Is Required",
    "string.empty": "Phone Number Is Required",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address Is Required",
    "any.required": "Address Is Required",
    "string.empty": "Address Is Required",
  }),
  role: Joi.string().optional().label("role").messages({
    "string.base": "Role is required",
    "any.required": "Role is required",
    "string.empty": "Role is required",
  }),
  ProfilePicture: Joi.any()
    .meta({ swaggerType: "file" })
    .optional()
    .description("image file"),
};
