import Joi from "@hapi/joi";

export const positionSchema = {
  name: Joi.string().required().label("Position Name").messages({
    "string.base": "Position name is required",
    "any.required": "Position name is required",
    "string.empty": "Position name is required",
  }),
  description: Joi.string().required().label("Description").messages({
    "string.base": "Description is required",
    "any.required": "Description is required",
    "string.empty": "Description is required",
  }),
};

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
  positions: Joi.array().required().messages({
    "string.empty": "Positions element is Required",
    "any.required": "Positions element is Required",
    "array.empty": "Positions element is Required",
  }),
  phone_number: Joi.string().required().messages({
    "string.base": "Phone Number is Required",
    "any.required": "Phone Number is Required",
    "string.empty": "Phone Number is Required",
  }),
  address: Joi.string().required().messages({
    "any.required": "Address is required",
    "string.empty": "Address is required",
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
    "string.base": "Clinic Is Required",
    "any.required": "Clinic Is Required",
    "string.empty": "Clinic Is Required",
  }),
};
