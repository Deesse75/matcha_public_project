export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  gender: string;
  orientation: string;
  region: string;
  physique: string;
  diet: string;
  popularity: number;
  biography: string;
  pourcentFilled: number;
  lastConnection: string;
  createdAt: string;
  updatedAt: string;
};

export const userInitial: UserType = {
  id: 0,
  firstname: 'sandra',
  lastname: 'dodo',
  username: 'deesse',
  email: 'dsfsdf@dsgs.fr',
  birthdate: '25/08/1975',
  gender: 'Femme',
  orientation: 'Hétérosexuel(le)',
  region: 'Ile-de-France',
  physique: 'Mince',
  diet: 'végan',
  popularity: 50,
  biography: "lfkjkfd s'lkdfds;kj fglsk ;dlfghdas fgdhpoi dfa badfpiobnd fhadfghj[oiadnfgh ad;fgojhndf;onbfa fgohad f;gokhn;dflkgnh;ldfkgjhadspijngb;lksmfg as;kjngh;kjdfgn hs;kjng;k scvb;osjkhgf;hesfkgjnh",
  pourcentFilled: 20,
  lastConnection: '20/06/2024',
  createdAt: '01/02/2008',
  updatedAt: '25/03/2020',
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
