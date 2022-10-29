import { UserState, initialState } from "./UserContext";
import { User } from "../../interface/user";

type UserActionTypes = { type: "LOGIN"; payload: { user: User } };

export const UserReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          ...action.payload.user,
          auth: true,
        },
      };
    default:
      return state;
  }
};
