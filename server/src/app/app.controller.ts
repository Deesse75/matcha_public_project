import { Request, Response } from 'express';
import initializeMatcha from './app.service.js';

export const initializeApp = async (req: Request, res: Response) => {
  try {
    await initializeMatcha(req, res);
    return res.status(200).json({
      message: 'ok',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
