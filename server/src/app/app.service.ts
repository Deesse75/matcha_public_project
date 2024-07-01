import isConnectDb from '../middleware/mysql.validation.js';
import { initializeDatabase } from '../mysql/mysql.config.js';
import { Response, Request } from 'express';
import { matchaError } from './matcha_error.js';

const initializeMatcha = async (req: Request, res: Response): Promise<void> => {
  if (!(await isConnectDb())) await initializeDatabase();
  if (!(await isConnectDb())) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue',
      '/erreur_interne',
    );
  }
};

export default initializeMatcha;
