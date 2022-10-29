import { initialState, PostsState } from "./PostsContext";
import { Post } from "../../interface/post";

type PostsActionTypes =
  | { type: "DELETE_POST"; payload: { id: number } }
  | { type: "GET_POSTS"; payload: { posts: Post[] } }
  | { type: "UPDATE_POST"; payload: { id: number; body: string } };

export const postsReducer = (
  state = initialState,
  action: PostsActionTypes
): PostsState => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
      };

    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, body: action.payload.body }
            : post
        ),
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload.id),
      };
    default:
      return state;
  }
};
