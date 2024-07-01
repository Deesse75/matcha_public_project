import { matchaError } from '../app/matcha_error.js';
import {
  sendEmail,
  sendPasswordCode,
  validateEmailText,
} from '../mailer/mailer.service.js';
import { MysqlUserType } from '../mysql/mysql.interfaces.js';
import * as mysql from '../mysql/mysql.services.js';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export const authSignup = async (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
): Promise<void> => {
  let user: MysqlUserType | null = null;
  //Verify if user already exists
  try {
    user = await mysql.findUser('email', email);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (user && !user.emailCertified) {
    throw new matchaError(
      401,
      'Veuillez certifier votre adresse email en cliquant sur le lien qui vous a été envoyé par email',
      '/renvoyer_lien_validation_email',
    );
  }
  if (user && user.emailCertified) {
    if (user.deletedAt) {
      throw new matchaError(
        401,
        'Vous avez demandé la suppression de votre compte. Vous pouvez le réactiver en remplissant le formulaire',
        '/reactivation',
      );
    } else
      throw new matchaError(
        409,
        'Cette adresse email est déjà utilisée. Vous pouvez vous connecter avec votre mot de passe',
      );
  }

  //if user does not exist hashed password
  const hashed = await argon2.hash(password);
  if (!hashed) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue, merci de réessayer',
      '/erreur_interne',
    );
  }

  //create a random number
  const num = Math.floor(Math.random() * 900000) + 100000;

  //create new user
  try {
    await mysql.createNewUser({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      emailCode: num,
      hashedPassword: hashed,
    });
  } catch (error) {
    if ((error as Error).message.split(' ')[0] === 'Duplicate')
      throw new matchaError(409, 'Ce pseudo est déjà utilisé');
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }

  //find user by email to get id
  try {
    user = await mysql.findUser('email', email);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (!user) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue',
      '/erreur_interne',
    );
  }

  //create new token
  const payload = {
    id: user.id,
    emailCode: user.emailCode,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_MAIL as string, {
    expiresIn: '15m',
  });
  if (!token) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue, merci de réessayer',
      '/erreur_interne',
    );
  }

  //Send email to validate email address
  sendEmail(
    email,
    'Validation de votre adresse email',
    validateEmailText(token),
  );
};

export const authSignin = async (
  username: string,
  password: string,
): Promise<string> => {
  let existingUser: MysqlUserType | null = null;
  //Find user by username
  try {
    existingUser = await mysql.findUser('username', username);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (!existingUser) {
    throw new matchaError(404, 'Pseudo inconnu');
  }
  if (existingUser.deletedAt) {
    throw new matchaError(
      401,
      'Vous avez demandé la suppression de votre compte. Vous pouvez le réactiver en remplissant le formulaire',
      '/reactivation',
    );
  } else if (!existingUser.emailCertified) {
    throw new matchaError(
      403,
      'Veuillez certifier votre adresse email en cliquant sur le lien qui vous a été envoyé par email',
      '/renvoyer_lien_validation_email',
    );
  }

  //Compare password
  const matchPassword = await argon2.verify(
    existingUser.hashedPassword,
    password,
  );
  if (!matchPassword) {
    throw new matchaError(403, 'Mot de passe incorrect');
  }

  //Create token
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN as string, {
    expiresIn: '1d',
  });
  if (!token) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue, merci de réessayer',
      '/erreur_interne',
    );
  }
  return token;
};

export const authValidate = async ({
  id,
  emailCode,
  email,
}: {
  id: number;
  emailCode: number;
  email: string;
}): Promise<void> => {
  let existingUser: MysqlUserType | null = null;
  //verify num and email
  try {
    existingUser = await mysql.findUser('id', id);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
  if (!existingUser) {
    throw new matchaError(
      404,
      "Erreur lors de l'identification de l'utilisateur",
      '/renvoyer_email_validation',
    );
  }
  if (emailCode !== existingUser.emailCode || email !== existingUser.email) {
    throw new matchaError(
      401,
      'Le lien est invalide ou expiré',
      '/renvoyer_email_validation',
    );
  }

  //update user
  try {
    await mysql.updateUser('emailCertified', true, id);
    await mysql.updateUser('emailCode', 0, id);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
};

export const authResendEmail = async (email: string): Promise<void> => {
  let existingUser: MysqlUserType | null = null;
  //find user by email
  try {
    existingUser = await mysql.findUser('email', email);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (!existingUser) {
    throw new matchaError(404, 'Adresse email inconnue');
  }
  if (existingUser.emailCertified) {
    throw new matchaError(409, 'Adresse email déjà confirmée', '/signin');
  }

  //create a random number
  const num = Math.floor(Math.random() * 900000) + 100000;

  //update user emailVerified
  try {
    await mysql.updateUser('emailCode', num, existingUser.id);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }

  //create token
  const payload = {
    id: existingUser.id,
    emailCode: num,
    email: existingUser.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_MAIL as string, {
    expiresIn: '15m',
  });
  if (!token) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue, merci de réessayer',
      '/erreur_interne',
    );
  }

  //Send email to validate email address
  sendEmail(
    email,
    'Validation de votre adresse email',
    validateEmailText(token),
  );
};

export const authForgotPassword = async (email: string): Promise<void> => {
  let existingUser: MysqlUserType | null = null;
  //find user by email
  try {
    existingUser = await mysql.findUser('email', email);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (!existingUser) {
    throw new matchaError(404, 'Adresse email inconnue');
  }

  //create random number
  const num = Math.floor(Math.random() * 900000) + 100000;

  //update passwordCode
  try {
    await mysql.updateUser('passwordCode', num.toString(), existingUser.id);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }

  //send email to reset password
  sendEmail(
    email,
    'Réinitialisation de votre mot de passe',
    sendPasswordCode(num),
  );
};

export const authValidatePassCode = async (
  newCode: string,
  email: string,
): Promise<void> => {
  let existingUser: MysqlUserType | null = null;
  //Find user by email
  try {
    existingUser = await mysql.findUser('email', email);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (!existingUser) {
    throw new matchaError(
      404,
      "Erreur lors de l'identification de l'utilisateur",
      '/mot_de_passe_oublie',
    );
  }
  if (newCode !== existingUser.passwordCode || email !== existingUser.email) {
    throw new matchaError(
      401,
      'Le lien est invalide ou expiré',
      '/mot_de_passe_oublie',
    );
  }

  //if email is not verified
  if (!existingUser.emailCertified) {
    throw new matchaError(
      403,
      'Veuillez valider votre adresse email pour continuer',
      '/renvoyer_lien_validation_email',
    );
  }
};

export const authReinitPassword = async (
  newPassword: string,
  email: string,
): Promise<void> => {
  let existingUser: MysqlUserType | null = null;
  //find user by id
  try {
    existingUser = await mysql.findUser('email', email);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (!existingUser) {
    throw new matchaError(
      404,
      "Erreur lors de l'identification de l'utilisateur",
    );
  }

  //hash new password
  const hashed = await argon2.hash(newPassword);
  if (!hashed) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue, merci de réessayer',
    );
  }

  //update password
  try {
    await mysql.updateUser('hashedPassword', hashed, existingUser.id);
    await mysql.updateUser('passwordCode', '', existingUser.id);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
};

export const authReactivate = async (email: string) => {
  let existingUser: MysqlUserType | null = null;
  //find user by id
  try {
    existingUser = await mysql.findUser('email', email);
  } catch (error) {
    throw new matchaError(500, (error as Error).message, '/erreur_interne');
  }
  if (!existingUser) {
    throw new matchaError(
      404,
      "Cette adresse n'est rattachée à aucun compte désactivé",
    );
  }
  if (!existingUser.deletedAt) {
    throw new matchaError(409, 'Ce compte est déjà actif', '/signin');
  }

  //update user
  try {
    await mysql.updateUser('deleteAt', null, existingUser.id);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }

  //create new token
  const payload = {
    id: existingUser.id,
    emailCode: existingUser.emailCode,
    email: existingUser.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_MAIL as string, {
    expiresIn: '15m',
  });
  if (!token) {
    throw new matchaError(
      500,
      'Une erreur interne est survenue, merci de réessayer',
      '/erreur_interne',
    );
  }

  //Send email to validate email address
  sendEmail(
    email,
    'Validation de votre adresse email',
    validateEmailText(token),
  );
};
