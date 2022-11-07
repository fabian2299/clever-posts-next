import { faker } from "@faker-js/faker";
import { useTranslation } from "next-i18next";
import { createContext, useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import useUserContext from "../../hooks/useUserContext";
import { Post } from "../../interface/post";
import { getAllPosts } from "../../lib/posts/getAllPosts";
import { postsReducer } from "./postsReducer";

interface PostsContextProps {
  posts: Post[];
  favourites: Post[];
  loading: boolean;
  error: string;
  deletePost: (id: number) => void;
  updatePost: ({ id, body }: { id: number; body: string }) => void;
  addToFavourites: (id: number) => void;
}

export const PostsContext = createContext({} as PostsContextProps);

export interface PostsState {
  posts: Post[];
  favourites: Post[];
}

export const initialState: PostsState = {
  posts:
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("posts") ?? "[]"),
  favourites:
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("favourites") ?? "[]"),
};

export default function PostsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useUserContext();
  const { t } = useTranslation("common");
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deletePost = (id: number) => {
    const newPosts = state.posts.filter((post) => post.id !== id);
    const isInFavorites = state.favourites.find((post) => post.id === id);

    if (isInFavorites) {
      const newFavoritesPosts = state.favourites.filter(
        (post) => post.id !== id
      );

      dispatch({
        type: "UPDATE_POST",
        payload: { posts: newPosts, favourites: newFavoritesPosts },
      });
      return;
    }

    dispatch({
      type: "DELETE_POST",
      payload: { posts: newPosts },
    });
  };

  const updatePost = ({ id, body }: { id: number; body: string }) => {
    const updatedPosts = state.posts.map((post) =>
      post.id === id ? { ...post, body } : post
    );

    const isInFavorites = state.favourites.find((post) => post.id === id);

    if (isInFavorites) {
      const updatedFavourites = state.favourites.map((post) =>
        post.id === id ? { ...post, body } : post
      );
      dispatch({
        type: "UPDATE_POST",
        payload: { posts: updatedPosts, favourites: updatedFavourites },
      });
      return;
    }

    dispatch({
      type: "UPDATE_POST",
      payload: { posts: updatedPosts },
    });
  };

  const addToFavourites = (id: number) => {
    const isInFavourites = state.favourites.find((post) => post.id === id);

    if (isInFavourites) {
      const newFavourites = state.favourites.filter((post) => post.id !== id);
      toast.success(t("favourites.remove"));

      dispatch({
        type: "ADD_TO_FAVOURITES",
        payload: { favourites: newFavourites },
      });
      return;
    }

    const newFavourites = state.favourites.concat(
      state.posts.filter((post) => post.id === id)
    );

    toast.success(t("favourites.add"));

    dispatch({
      type: "ADD_TO_FAVOURITES",
      payload: { favourites: newFavourites },
    });
  };

  useEffect(() => {
    if (!isAuth) return;
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await getAllPosts();
        // array of unique ids
        const users = [...new Set(data.map((post) => post.userId))];
        // array of unique names
        const usersWithNames = users.map((user) => ({
          id: user,
          name: faker.name.fullName(),
        }));
        // add name to each post
        const posts = data.map((post) => {
          let userName = "";
          usersWithNames.forEach((user) => {
            if (post.userId === user.id) {
              userName = user.name;
            }
          });
          return { ...post, userName };
        });

        localStorage.setItem("posts", JSON.stringify(posts));
        dispatch({
          type: "GET_POSTS",
          payload: { posts },
        });

        return;
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [isAuth]);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(state.posts));
  }, [state.posts]);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state.favourites));
  }, [state.favourites]);

  return (
    <PostsContext.Provider
      value={{
        ...state,
        loading,
        error,
        deletePost,
        updatePost,
        addToFavourites,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
