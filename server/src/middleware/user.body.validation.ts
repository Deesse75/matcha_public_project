import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const firstnameSchema = Joi.object({
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
});

const lastnameSchema = Joi.object({
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
});

const usernameSchema = Joi.object({
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
});

const emailSchema = Joi.object({
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
});

const validateEmailSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    'string.uri': "L'url est invalide.",
    'any.required': "L'url est requise.",
  }),
});

const passwordSchema = Joi.object({
  currentPassword: Joi.string()
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
  newPassword: Joi.string()
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
});

const profileSchema = Joi.object({});

const signoutSchema = Joi.object({
  lastConnection: Joi.string().isoDate().required(),
});

const deleteSchema = Joi.object({
  deleteAt: Joi.string().isoDate().required(),
});

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/update_firstname': firstnameSchema,
  '/update_lastname': lastnameSchema,
  '/update_username': usernameSchema,
  '/update_email': emailSchema,
  '/update_validate_email': validateEmailSchema,
  '/update_password': passwordSchema,
  '/update_profile': profileSchema,
  '/signout': signoutSchema,
  '/delete_account': deleteSchema,
};

export const validateUserBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = schemaMap[req.path];
  if (schema) {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: false,
      });
      next();
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  } else {
    return res.status(404).json({ message: 'Route not found' });
  }
};
