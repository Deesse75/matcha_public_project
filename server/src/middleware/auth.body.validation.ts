import Joi from 'joi';
import {
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  passCodeValidation,
  passwordValidation,
  urlValidation,
  usernameValidation,
} from './joiObject.schema.js';
import { NextFunction, Request, Response } from 'express';

const signinSchema = Joi.object({
  usernameValidation,
  passwordValidation,
});

const signupSchema = Joi.object({
  firstnameValidation,
  lastnameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
});

const validateEmailSchema = Joi.object({
  urlValidation,
});

const validatePassCodeSchema = Joi.object({
  passCodeValidation,
});

const resendEmailSchema = Joi.object({
  emailValidation,
});

const forgotPasswordSchema = Joi.object({
  emailValidation,
});

const reinitPasswordSchema = Joi.object({
  emailValidation,
  passwordValidation,
});

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/signin': signinSchema,
  '/signup': signupSchema,
  '/forgot_password': forgotPasswordSchema,
  '/validate_email': validateEmailSchema,
  '/reinit_password': reinitPasswordSchema,
  '/validate_passcode': validatePassCodeSchema,
  '/resend_email': resendEmailSchema,
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
