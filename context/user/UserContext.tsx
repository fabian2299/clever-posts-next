import { createContext } from "react";
import { useContext, useReducer } from "react";
import { User } from "../../interface/user";
import { UserReducer } from "./userReducer";

interface UserContextProps {
  user: User | null;
  login: (user: User) => void;
}

export const UserContext = createContext({} as UserContextProps);

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = (user: User) => {
    dispatch({ type: "LOGIN", payload: { user } });
  };

  return (
    <UserContext.Provider value={{ ...state, login }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
