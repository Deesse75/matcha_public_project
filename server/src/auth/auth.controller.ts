import { matchaError } from '../app/matcha_error.js';
import { Response, Request } from 'express';
import {
  authForgotPassword,
  authReactivate,
  authReinitPassword,
  authResendEmail,
  authSignin,
  authSignup,
  authValidate,
  authValidatePassCode,
} from './auth.services.js';

export const signup = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await authSignup(
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.email,
      req.body.password,
    );
    return res.status(201).json({
      message:
        'Pour finaliser votre inscription, veuillez valider votre adresse email, en cliquant sur le lien qui vous à été envoyé',
    });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const signin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const token = await authSignin(req.body.username, req.body.password);
    return res.status(200).json({
      token: token,
    });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const validateEmail = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await authValidate(req.body.payload);
    return res.status(200).json({
      message: 'Votre adresse email a été validée, vous pouvez vous connecter',
    });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const resendEmail = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await authResendEmail(req.body.email);
    return res.status(200).json({
      message:
        'Pour finaliser votre inscription, veuillez valider votre adresse email, en cliquant sur le lien qui vous à été envoyé',
    });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await authForgotPassword(req.body.email);
    return res.status(200).send();
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const validatePassCode = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = await authValidatePassCode(req.body.newCode, req.body.email);
    return res.status(200).send();
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const reinitPassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await authReinitPassword(req.body.newPassword, req.body.email);
    return res.status(200).json({
      message: 'Vous pouvez vous connecter avec votre nouveau mot de passe',
    });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const reactivate = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await authReactivate(req.body.email);
    return res.status(200).json({
      message:
        'Pour réactiver votre compte, veuillez valider votre adresse email, en cliquant sur le lien qui vous à été envoyé',
    });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};
