import { mysqlDb } from './mysql.init.js';
import {
  CreateUser,
  MysqlUserType,
} from './mysql.interfaces.js';
import { updateUserQueries, updateUserType } from './mysql.utils.js';

export async function createNewUser(user: CreateUser): Promise<void> {
  const query = 'INSERT INTO User SET ?';
  const values = [user];
  await mysqlDb.query(query, values);
}

export async function findUser(
  type: string,
  value: number | string,
): Promise<MysqlUserType | null> {
  if (type !== "id" && type !== "email" && type !== "username") return null
  const query = 'SELECT * FROM User WHERE ? = ?';
  const values = [type, value];
  await mysqlDb.query(query, values);
  const [rows]: any = await mysqlDb.query(query, values);
  return rows[0];
}

export async function UpdateUser(
  type: string,
  value: string | number | boolean | Date,
  id: number,
): Promise<void> {
  updateUserType.map(async (item, index) => {
    if (item === type) {
      const query = updateUserQueries[index];
      await mysqlDb.query(query, [value, id]);
    }
  });
}

export const updateFilled = async (id: number): Promise<void> => {
  let fillNum: number = 0;
  const user = await findUser('id', id);
  if (user) {
    user.birthdate ? (fillNum += 10) : null;
    user.gender ? (fillNum += 10) : null;
    user.orientation ? (fillNum += 10) : null;
    user.region ? (fillNum += 10) : null;
    user.tall ? (fillNum += 10) : null;
    user.physique ? (fillNum += 10) : null;
    user.diet ? (fillNum += 10) : null;
    user.photo1 !== './avatar/default_avatar.jpg' ? (fillNum += 10) : null;
    user.title ? (fillNum += 10) : null;
    user.bio ? (fillNum += 10) : null;
    UpdateUser('pourcentFilled', fillNum, id);
  }
};


// export const findListOfLikers = async (id: number): Promise<> => {
//   return null;
// };

// export const findListOfLiked = async (id: number): Promise<> => {
//   return null;
// };

// export const findListOfViewers = async (id: number): Promise<> => {
//   return null;
// };

// export const findListOfViewed = async (id: number): Promise<> => {
//   return null;
// };

// export const findMatch = async (id: number): Promise<> => {
//   return null;
// };

// export const findListOfBlocked = async (id: number): Promise<> => {
//   return null;
// };

// export const findListOfChatWith = async (id: number): Promise<> => {
//   return null;
// };

// export const findListOfMessage = async (id1: number, id2: number): Promise<> => {
//   return null;
// };

// export const findSearchList = async (id: number, criterials: UserCriterials): Promise<> => {
//   return null;
// };

// //if search settings not defined
// export const findMatchaList = async (id: number): Promise<> => {
//   return null;
// };
