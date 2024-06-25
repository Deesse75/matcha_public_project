import Joi from "joi";

export const firstnameValidation = {
  firstname: Joi.string()
    .min(2)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']*$"))
    .required()
    .messages({
      'string.pattern.base':
        "Le prénom doit commencer par une lettre et ne contenir que des lettres, des espaces, des - et des '.",
      'any.required': 'Le prénom est requis.',
    }),
};

export const lastnameValidation = {
  lastname: Joi.string()
    .min(2)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']*$"))
    .required()
    .messages({
      'string.pattern.base':
        "Le nom doit commencer par une lettre et ne contenir que des lettres, des espaces, des - et des '.",
      'any.required': 'Le nom est requis.',
    }),
};

export const usernameValidation = {
  username: Joi.string()
    .min(4)
    .max(20)
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]*$'))
    .required()
    .messages({
      'string.pattern.base':
        'Le pseudo doit commencer par une lettre et ne contenir que des lettres, des chiffres, des _ et des @.',
      'any.required': 'Le pseudo est requis.',
    }),
};

export const emailValidation = {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'fr'] },
    })
    .required()
    .messages({
      'string.email': "L'adresse email est invalide.",
      'any.required': "L'adresse email est requise.",
    }),
};

export const passwordValidation = {
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,}$',
      ),
    )
    .required()
    .messages({
      'string.pattern.base':
        'Le mot de passe doit comporter au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial (!, ?, @) et au moins 8 caractères.',
      'any.required': 'Le mot de passe est requis.',
    }),
};

export const urlValidation = {
  url: Joi.string().uri().required().messages({
    'string.uri': "L'url est invalide.",
    'any.required': "L'url est requise.",
  }),
};

export const passCodeValidation = {
  passcode: Joi.string().min(6).max(6).required().messages({
    'string.length': 'Le code doit comporter 6 chiffres.',
    'any.required': 'Le code est requis.',
  }),
};

const idSchema = { id: Joi.number().integer().positive().required() };
