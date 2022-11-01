import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useEffect, useReducer } from "react";
import { User } from "../../interface/user";
import { UserContext } from "./UserContext";
import { userReducer } from "./userReducer";

export interface UserState {
  user: User | null;
  users: User[];
  isAuth: string;
}

export const initialState: UserState = {
  users:
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("users") ?? "[]"),
  user:
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user") ?? "null"),
  isAuth: getCookie("auth")?.toString() ?? "",
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = (user: User) => {
    setCookie("auth", "true");
    dispatch({ type: "LOGIN", payload: { user } });
  };

  const register = (user: User) => {
    setCookie("auth", "true");
    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    deleteCookie("auth");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(state.users));
  }, [state.users]);

  return (
    <UserContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}
