import { useContext, useReducer, useEffect } from "react";
import { User } from "../../interface/user";
import { UserReducer } from "./userReducer";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { UserContext } from "./UserContext";

export interface UserState {
  user: User | null;
  isAuth: boolean;
}

export const initialState: UserState = {
  user: JSON.parse(getCookie("user")?.toString() ?? "null"),
  isAuth: Boolean(getCookie("auth")),
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = (user: User) => {
    setCookie("auth", true);
    setCookie("user", JSON.stringify(user));
  };

  const logout = () => {
    deleteCookie("auth");
    deleteCookie("user");
  };

  // Get user and auth status from cookies
  useEffect(() => {
    const user: User = JSON.parse(getCookie("user")?.toString() ?? "null");
    const isAuth = Boolean(getCookie("auth") ?? false);

    dispatch({
      type: "GET_USER",
      payload: { user, isAuth },
    });
  }, []);

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
