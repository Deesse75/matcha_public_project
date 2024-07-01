import { Response, Request, NextFunction } from "express";
import url from "url";
import jwt from "jsonwebtoken";

export const tokenBodyValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let payload: { id: number; emailCode: number; email: string } = {
    id: 0,
    emailCode: 0,
    email: '',
  };
  //parse url to extract token
  const parseUrl = url.parse(req.body.url, true).query;
  if (parseUrl.error) {
    return res.status(500).json({
      message: parseUrl.error,
    });
  }
  if (!parseUrl.token) {
    return res.status(403).json({
      message: 'Le lien est invalide',
    });
  }

  //control token validity
  try {
    payload = jwt.verify(
      parseUrl.token as string,
      process.env.JWT_SECRET_MAIL as string,
    ) as {
      id: number;
      emailCode: number;
      email: string;
    };
    if (!payload || !payload.id || !payload.email || !payload.emailCode) {
      return res.status(403).json({
        message: 'Le lien est invalide',
      });
    }
  } catch (error) {
    return res.status(403).json({ message: 'Le lien est expiré' });
  }

  //insert payload in body
  req.body.payload = payload;
  next();
};

export const tokenHeaderValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //control token validity
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const payload = jwt.verify(
      token as string,
      process.env.JWT_SECRET_TOKEN as string,
    ) as {
      id: number;
      email: string;
    };
    if (!payload || !payload.id || !payload.email) {
      return res.status(401).json({
        message: 'Le token est invalide, vous allez être déconnecté',
        'redir': '/signout',
      });
    }
    //insert payload in body
    req.body.userId = payload.id;
    next();
  } catch (error) {
    console.log("token: ", error);
    return res.status(401).json({ message: 'Token' });
  }
};

