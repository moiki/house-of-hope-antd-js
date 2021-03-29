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

  birth_date: Joi.string().optional().allow(null).messages({
    "string.empty": "Birthday is Required",
    "any.required": "Birthday is Required",
    "array.empty": "Birthday is Required",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "Gender is Required",
    "any.required": "Gender is Required",
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
