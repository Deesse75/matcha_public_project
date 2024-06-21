import { createContext, useReducer } from "react";
import { UserActionType, UserReducer, UserType, userInitial } from "../reducer/user.reducer";

export const AppContext = createContext<{
  user:  UserType
  userDispatch: React.Dispatch<UserActionType>;
}>({
  user: userInitial,
  userDispatch: () => undefined,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userDispatch] = useReducer(UserReducer, userInitial);
  return (
    <AppContext.Provider
      value={{
        user,
        userDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
