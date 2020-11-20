import Joi from '@hapi/joi'

export default {
  firstName: Joi
    .string()
    .required()
    .label('First name')
    .messages({
      'string.base': 'First name is required',
      'any.required': 'First name is required',
      'string.empty': 'First name is required'
    }),
  lastName: Joi
    .string()
    .required()
    .label('Last name')
    .messages({
      'string.base': 'Last name is required',
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required'
    }),
  email: Joi
    .string()
    .required()
    .email()
    .label('email')
    .messages({
      'string.email': 'Please enter a valid Email address.',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    }),
//   role: Joi
//     .string()
//     .required()
//     .label('role')
//     .messages({
//       'string.base': 'Role is required',
//       'any.required': 'Role is required',
//       'string.empty': 'Role is required'
//     }),
//   permission: Joi
//     .array()
//     .items(Joi.string())
//     .label('permission'),
  password: Joi
    .string()
    .required()
    .label('password')
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=\-!*()@%&]).{8,}$/))
    .messages({
      'string.pattern.base': 'Password doesn\'t meet the minimum requirements',
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'any.ref': 'Passwords must match'
    }),
  repeatPassword: Joi
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'Passwords must match' })
}
