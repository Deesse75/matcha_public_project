import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../app/matcha_error.js';
import { userGetMe, userSignout } from './user.services.js';

export const getMe = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userGetMe(req.body.userId);
    return res
      .status(200)
      .json({ user: user });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  try {
    await userSignout(req.body.userId, req.body.lastConnection);
  } catch (error) {
    console.error("Error signout: ", error);
  }
};



