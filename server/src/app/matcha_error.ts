import { Response } from 'express';

export class matchaError extends Error {
  statusCode: number;
  redir: string | null = null;

  constructor(
    statusCode: number,
    message: string,
    redir: string | null = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.redir = redir;
  }

  static catched(error: Error, res: Response): Response {
    if (error instanceof matchaError) {
      return res.status(error.statusCode).json({
        message: error.message,
        redir: error.redir,
      });
    }
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
}
