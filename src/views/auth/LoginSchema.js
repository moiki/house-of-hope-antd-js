import Joi from '@hapi/joi'

export default {
    email: Joi
        .string().allow('', null)
        .email({ minDomainSegments: 2, tlds: { allow: ['net', 'com'] } })
        .label('Email')
        .messages({
            'string.email': 'Please enter a valid Email address.',
            'any.required': 'Email is a required',
            'string.empty': 'Email is a required'
        }),
    password: Joi
        .string()
        .required()
        .label('Password')
        .messages({
            'any.required': 'Password is a required',
            'string.empty': 'Password is a required'
        })
}