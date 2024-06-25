export type MiniProfile = {
  id: number;
  username: string;
  birthdate: string;
  region: string;
  gender: string;
  orientation: string;
  title: string;
  popularity: number;
  photo1: string;
  lastConnection: string;
};

export type FullProfile = {
    id: number;
    username: string;
    birthdate: string;
    region: string;
    gender: string;
    orientation: string;
    tall: number;
    physique: string;
    diet: string;
    popularity: number;
    title: string;
    bio: string;
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
    photo5: string;
    pourcentFill: number;
    lastConnection: string;
};

export const miniProfileInitial = {
  id: 0,
  username: '',
  birthdate: '',
  region: '',
  gender: '',
  orientation: '',
  title: '',
  popularity: 0,
  photo1: '',
  lastConnection: '',
};


export const fullProfileInitial = {
  id: 0,
  username: '',
  birthdate: '',
  region: '',
  gender: '',
  orientation: '',
  tall: 0,
  physique: '',
  diet: '',
  popularity: 0,
  photo1: '',
  photo2: '',
  photo3: '',
  photo4: '',
  photo5: '',
  title: '',
  bio: '',
  pourcentFill: 0,
  lastConnection: '',
};
