import { createContext } from "react";
import { useContext, useReducer } from "react";
import { User } from "../../interface/user";
import { UserReducer } from "./userReducer";

interface UserContextProps {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: (user: User) => Promise<void>;
}

export const UserContext = createContext({} as UserContextProps);

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: { user } });
  };

  const logout = async (user: User) => {
    const newUserStatus = { ...user, auth: false };
    localStorage.setItem("user", JSON.stringify(newUserStatus));
    dispatch({ type: "LOGOUT", payload: { user: newUserStatus } });
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout }}>
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
