import { createContext, useReducer, useState } from "react";
import { UserActionType, UserReducer, UserType, userInitial } from "../reducer/user.reducer";

export type StatsType = {
  popularity: number;
  viewer: number;
  liker: number;
  match: number;
  block: number;
  pourcentProfile: number;
  message: number;
};

const StatsInitial: StatsType = {
  popularity: 0,
  viewer: 0,
  liker: 0,
  match: 0,
  block: 0,
  pourcentProfile: 0,
  message: 0,
};

export const UserContext = createContext<{
  user: UserType;
  userDispatch: React.Dispatch<UserActionType>;
  stats: StatsType;
  setStats: React.Dispatch<React.SetStateAction<StatsType>>;
}>({
  user: userInitial,
  userDispatch: () => undefined,
  stats: StatsInitial,
  setStats: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userDispatch] = useReducer(UserReducer, userInitial);
  const [stats, setStats] = useState<StatsType>(StatsInitial);
  return (
    <UserContext.Provider
      value={{
        user,
        userDispatch,
        stats,
        setStats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
