import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const signinSchema = Joi.object({
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
});

const signupSchema = Joi.object({
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
});

const validateEmailSchema = Joi.object({
    url: Joi.string().uri().required().messages({
    'string.uri': "L'url est invalide.",
    'any.required': "L'url est requise.",
  }),
});

const validatePassCodeSchema = Joi.object({
    passcode: Joi.string().min(6).max(6).required().messages({
    'string.length': 'Le code doit comporter 6 chiffres.',
    'any.required': 'Le code est requis.',
  }),
});

const resendEmailSchema = Joi.object({
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

const forgotPasswordSchema = Joi.object({
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

const reinitPasswordSchema = Joi.object({
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

const reactivateSchema = Joi.object({
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

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/signin': signinSchema,
  '/signup': signupSchema,
  '/forgot_password': forgotPasswordSchema,
  '/validate_email': validateEmailSchema,
  '/reinit_password': reinitPasswordSchema,
  '/validate_passcode': validatePassCodeSchema,
  '/resend_email': resendEmailSchema,
  '/reactivate': reactivateSchema,
};

export const validateAuthBody = async (
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
