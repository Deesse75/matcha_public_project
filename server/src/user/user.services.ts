import { matchaError } from '../app/matcha_error.js';
import { MysqlUserType } from '../mysql/mysql.interfaces.js';
import * as mysql from '../mysql/mysql.services.js';
import { UserType } from './user.interface.js';
import { userCleanInfo } from './user.utils.js';

export const userGetMe = async (id: number): Promise<UserType> => {
  let existingUser: MysqlUserType | null = null;
  //find existingUser
  try {
    existingUser = await mysql.findUser('id', id);
  } catch (error) {
    throw new matchaError(
      404,
      'Une erreur est survenue lors du chargement de vos données',
      '/signout',
    );
  }
  if (!existingUser || !existingUser.emailCertified) {
    throw new matchaError(
      404,
      'Une erreur est survenue lors du chargement de vos données',
      '/signout',
    );
  }
  return userCleanInfo(existingUser);
};

export const userSignout = async (id: number, lastConnection: string) => {
  console.log("last: ", lastConnection);
};
