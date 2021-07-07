import Joi from "@hapi/joi";

export default {
  id: Joi.string().optional().allow(null),
  featured_image: Joi.string().optional().allow(null),
  route_name: Joi.string().required().label("First name").messages({
    "string.base": "First name is required",
    "any.required": "First name is required",
    "string.empty": "First name is required",
  }),

  description: Joi.string().optional().allow(null).messages({
    "string.empty": "description is Required",
    "any.required": "description is Required",
    "array.empty": "description is Required",
  }),
  clinic: Joi.string().required().messages({
    "string.empty": "clinic is Required",
    "any.required": "clinic is Required",
  }),

  employees: Joi.array().required().messages({
    "any.required": "employees is required",
    "string.empty": "employees is required",
  }),
  patients: Joi.array().required().messages({
    "any.required": "patients Is Required",
    "string.empty": "patients Is Required",
  }),
  // destinations: Joi.string().required().messages({
  //   "string.base": "destinations Is Required",
  //   "any.required": "destinations Is Required",
  //   "string.empty": "destinations Is Required",
  // }),
};
