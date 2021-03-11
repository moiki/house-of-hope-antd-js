import Joi from "@hapi/joi";

export default {
  first_name: Joi.string().required().label("First name").messages({
    "string.base": "First name is required",
    "any.required": "First name is required",
    "string.empty": "First name is required",
  }),
  last_name: Joi.string().required().label("Last name").messages({
    "string.base": "Last name is required",
    "any.required": "Last name is required",
    "string.empty": "Last name is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: false })
    .label("email")
    .messages({
      "string.email": "Please enter a valid Email address.",
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),
  phone_number: Joi.string().required().messages({
    "string.base": "Phone Number Is Required",
    "any.required": "Phone Number Is Required",
    "string.empty": "Phone Number Is Required",
  }),
  birth_date: Joi.string().required().messages({
    "any.required": "Birthday is required",
    "string.empty": "Birthday is required",
  }),
  country: Joi.string().required().messages({
    "string.base": "Country Is Required",
    "any.required": "Country Is Required",
    "string.empty": "Country Is Required",
  }),
  state: Joi.string().required().messages({
    "string.base": "State Is Required",
    "any.required": "State Is Required",
    "string.empty": "State Is Required",
  }),
  city: Joi.string().required().messages({
    "string.base": "City Is Required",
    "any.required": "City Is Required",
    "string.empty": "City Is Required",
  }),

  clinic: Joi.string().required().messages({
    "string.base": "City Is Required",
    "any.required": "City Is Required",
    "string.empty": "City Is Required",
  }),
};
