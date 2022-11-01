import { User } from "@/interface/user";
import { initialState, UserState } from "./UserProvider";

type UserActionTypes =
  | { type: "LOGIN"; payload: { user: User } }
  | { type: "REGISTER"; payload: { user: User } }
  | { type: "LOGOUT" };

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        user: { ...action.payload.user },
        isAuth: "true",
        users: state.users.find(
          (user) => user.email === action.payload.user.email
        )
          ? state.users
          : [...state.users, action.payload.user],
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuth: "",
      };
  }
};
