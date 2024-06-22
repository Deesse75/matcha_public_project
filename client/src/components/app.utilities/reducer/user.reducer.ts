export type UserType = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: Date;
  gender: string;
  orientation: string;
  region: string;
  physique: string;
  diet: string;
  popularity: number;
  biography: string;
  pourcentFilled: number;
  lastConnection: Date;
};

export const userInitial: UserType = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  birthdate: new Date(),
  gender: '',
  orientation: '',
  region: '',
  physique: '',
  diet: '',
  popularity: 0,
  biography: '',
  pourcentFilled: 0,
  lastConnection: new Date(),
};

export type UserActionType =
  | {
      type: 'SET_USER_ON';
      payload: UserType;
    }
  | {
      type: 'UPDATE_USER';
      payload: UserType;
    }
  | {
      type: 'SET_USER_OFF';
      payload: {};
    };

export const UserReducer = (
  user: UserType,
  action: UserActionType,
): UserType => {
  switch (action.type) {
    case 'SET_USER_ON':
      return { ...action.payload };
    case 'UPDATE_USER':
      return action.payload;
    case 'SET_USER_OFF':
      return userInitial;
    default:
      return user;
  }
};
