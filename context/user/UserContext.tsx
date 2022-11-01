import { User } from "../../interface/user";
import { createContext } from "react";
interface UserContextProps {
  user: User | null;
  isAuth: string;
  users: User[];
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);
