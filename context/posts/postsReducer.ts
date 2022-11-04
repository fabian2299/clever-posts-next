import { Post } from "../../interface/post";
import { initialState, PostsState } from "./PostsContext";

type PostsActionTypes =
  | { type: "DELETE_POST"; payload: { posts: Post[] } }
  | { type: "GET_POSTS"; payload: { posts: Post[] } }
  | { type: "UPDATE_POST"; payload: { posts: Post[] } }
  | { type: "ADD_TO_FAVOURITES"; payload: { favourites: Post[] } };

export const postsReducer = (
  state = initialState,
  action: PostsActionTypes
): PostsState => {
  switch (action.type) {
    case "GET_POSTS":
    case "DELETE_POST":
    case "UPDATE_POST":
      return {
        ...state,
        posts: [...action.payload.posts],
      };

    case "ADD_TO_FAVOURITES":
      return {
        ...state,
        favourites: [...action.payload.favourites],
      };
    default:
      return state;
  }
};
