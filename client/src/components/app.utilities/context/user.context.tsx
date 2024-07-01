import { createContext, useState } from "react";

export type StatsType = {
  popularity: number;
  viewer: number;
  liker: number;
  match: number;
  block: number;
  pourcentProfile: number;
  message: number;
};

export const statsInitial: StatsType = {
  popularity: 0,
  viewer: 0,
  liker: 0,
  match: 0,
  block: 0,
  pourcentProfile: 0,
  message: 0,
};

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
  tall: number;
  physique: string;
  diet: string;
  popularity: number;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
  title: string;
  bio: string;
  pourcentFilled: number;
  lastConnection: string;
  createdAt: string;
  updatedAt: string;
};

export const userInitial: UserType = {
  id: 0,
  firstname: 'sandra',
  lastname: 'Dorlin',
  username: 'Dessse',
  email: 'blabal75@gmail.com',
  birthdate: '25/08/1975',
  gender: 'Femme',
  orientation: 'Heterosexuel(le)',
  region: 'Ile-de-France',
  tall: 170,
  physique: 'Obese',
  diet: '',
  popularity: 50,
  photo1: '/avatar/default_avatar.jpg',
  photo2: '',
  photo3: '',
  photo4: '',
  photo5: '',
  title: 'Qui vivra verra',
  bio: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus ',
  pourcentFilled: 90,
  lastConnection: '24/06/2024',
  createdAt: '01/01/2020',
  updatedAt: '07/02/2023',
};

// export const userInitial: UserType = {
//   id: 0,
//   firstname: '',
//   lastname: '',
//   username: '',
//   email: '',
//   birthdate: '',
//   gender: '',
//   orientation: '',
//   region: '',
//   tall: 0,
//   physique: '',
//   diet: '',
//   popularity: 0,
//   photo1: '',
//   photo2: '',
//   photo3: '',
//   photo4: '',
//   photo5: '',
//   title: '',
//   bio: '',
//   pourcentFilled: 0,
//   lastConnection: '',
//   createdAt: '',
//   updatedAt: '',
// };

export const UserContext = createContext<{
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  stats: StatsType;
  setStats: React.Dispatch<React.SetStateAction<StatsType>>;
}>({
  user: userInitial,
  setUser: () => {},
  stats: statsInitial,
  setStats: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(userInitial);
  const [stats, setStats] = useState<StatsType>(statsInitial);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        stats,
        setStats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
