import { Router } from 'express';
import { validateAuthBody } from '../middleware/auth.body.validation.js';
import {
  forgotPassword,
  reactivate,
  reinitPassword,
  resendEmail,
  signin,
  signup,
  validateEmail,
  validatePassCode,
} from './auth.controller.js';
import { tokenBodyValidation } from '../middleware/token.validation.js';

const authRouter = Router();

authRouter.post('/signup', validateAuthBody, signup);
authRouter.post('/signin', validateAuthBody, signin);
authRouter.post(
  '/validate_email',
  validateAuthBody,
  tokenBodyValidation,
  validateEmail,
);
authRouter.post('/resend_email', validateAuthBody, resendEmail);
authRouter.post('/forgot_password', validateAuthBody, forgotPassword);
authRouter.post('/validate_passcode', validateAuthBody, validatePassCode);
authRouter.post(
  '/reinit_password',
  validateAuthBody,
  tokenBodyValidation,
  reinitPassword,
);
authRouter.post('/reactivate', validateAuthBody, reactivate);

export default authRouter;
