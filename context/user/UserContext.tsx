import { User } from "../../interface/user";
import { createContext } from "react";
interface UserContextProps {
  user: User | null;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);
