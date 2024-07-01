import { MysqlUserType } from '../mysql/mysql.interfaces.js';
import { UserType } from './user.interface.js';

export const convertTimestampToString = (timestampNumber: Date): string => {
  const dd =
    timestampNumber.getDate() < 10
      ? `0${timestampNumber.getDate()}`
      : timestampNumber.getDate();
  const mm =
    timestampNumber.getMonth() + 1 < 10
      ? `0${timestampNumber.getMonth() + 1}`
      : timestampNumber.getMonth() + 1;
  const yyyy = timestampNumber.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const userCleanInfo = (user: MysqlUserType): UserType => {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    birthdate: convertTimestampToString(user.birthdate),
    gender: user.gender,
    orientation: user.orientation,
    region: user.region,
    tall: user.tall,
    physique: user.physique,
    diet: user.diet,
    popularity: user.popularity,
    photo1: user.photo1,
    photo2: user.photo2,
    photo3: user.photo3,
    photo4: user.photo4,
    photo5: user.photo5,
    title: user.title,
    biography: user.bio,
    pourcentFilled: user.pourcentFilled,
    lastConnection: convertTimestampToString(user.lastConnection),
    createdAt: convertTimestampToString(user.createdAt),
    updatedAt: convertTimestampToString(user.updatedAt),
  };
};
