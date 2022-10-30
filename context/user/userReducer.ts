import { UserState, initialState } from "./UserProvider";
import { User } from "../../interface/user";
import { setCookie } from "cookies-next";

type UserActionTypes =
  | { type: "GET_USER"; payload: { user: User; isAuth: boolean } }
  | { type: "LOGOUT" }
  | { type: "LOGIN"; payload: { user: User } };

export const UserReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
      };
    default:
      return state;
  }
};
