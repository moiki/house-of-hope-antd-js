import Joi from "@hapi/joi";

export const clinicSchema = {
  id: Joi.string().allow(null).optional(),
  name: Joi.string().required().messages({
    "string.base": "Name Of Clinic Is Required",
    "any.required": "Name Of Clinic Is Required",
    "string.empty": "Name Of Clinic Is Required",
  }),
  // description: Joi.string().optional().messages({
  //   "string.base": "Description Is Required",
  //   "any.required": "Description Is Required",
  //   "string.empty": "Description Is Required",
  // }),
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
};
