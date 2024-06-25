import { Request, Response } from 'express';
import isConnectDb from '../middleware/mysql.validation.js';
import { matchaError } from './matcha_error.js';

export async function firstRequest(
  req: Request,
  res: Response,
): Promise<void> {
  if (!(await isConnectDb())) {
    throw new matchaError(
      500,
      'Le server est temporairememnt indisponible',
      '/erreur_server',
    );
  }
      const ip = req.ip?.split(':')[3];

}
