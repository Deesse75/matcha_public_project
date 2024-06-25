import { Router } from "express";
import { validateAuthBody } from "../middleware/auth.body.validation.js";

export const authRouter = Router();

authRouter.post('/signin', validateAuthBody, signin);
authRouter.post('/signup', validateAuthBody, signup);
authRouter.post('/validate_passcode', validateAuthBody, signup);
authRouter.post(
  '/validate_email',
  validateAuthBody,
  tokenBodyValidation,
  validateEmail,
);
authRouter.post('/resend_email', validateAuthBody, resendEmail);
authRouter.post('/forgot_password', validateAuthBody, forgot);
authRouter.post(
  '/reinit_password',
  validateAuthBody,
  tokenBodyValidation,
  reset,
);
authRouter.post('/newpass', validateAuthBody, newpass);
