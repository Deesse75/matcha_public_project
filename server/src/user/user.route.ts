//signout; maj lastconnection

import { Router } from 'express';
import { validateUserBody } from '../middleware/user.body.validation.js';
import { tokenHeaderValidation } from '../middleware/token.validation.js';
import { getMe, signout } from './user.controller.js';

//delete:emailCertified a false emailcode a 0

const userRouter = Router();

userRouter.get('/get_me', validateUserBody, tokenHeaderValidation, getMe);
userRouter.patch('/signout',signout);
// userRouter.patch('/signout', validateUserBody, tokenHeaderValidation, signout);
// userRouter.patch('/delete', validateUserBody, tokenHeaderValidation, delete_account);
// userRouter.patch('/update_firstname', validateUserBody, tokenHeaderValidation, firstnameUp);
// userRouter.patch('/update_lastname', validateUserBody, tokenHeaderValidation, lastnameUp);
// userRouter.patch('/update_username', validateUserBody, tokenHeaderValidation, usernameUp);
// userRouter.patch('/update_email', validateUserBody, tokenHeaderValidation, emailUp);
// userRouter.patch('/update_validate_email', validateUserBody, tokenHeaderValidation, validate_emailUp);
// userRouter.patch('/update_password', validateUserBody, tokenHeaderValidation, passwordUp);
// userRouter.patch('/update_profile', validateUserBody, tokenHeaderValidation, profileUp);//faire validateuserbody pour profile

export default userRouter;
