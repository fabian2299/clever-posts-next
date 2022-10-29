import { createContext, useState, useEffect } from "react";
import { useContext, useReducer } from "react";
import { Post } from "../../interface/post";
import { postsReducer } from "./postsReducer";
import { getAllPosts } from "../../lib/posts/getAllPosts";

interface PostsContextProps {
  posts: Post[];
  loading: boolean;
  error: string;
  deletePost: (id: number) => void;
  updatePost: ({ id, body }: { id: number; body: string }) => void;
}

export const PostsContext = createContext({} as PostsContextProps);

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("posts")!)
      : [],
};

export default function PostsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deletePost = (id: number) => {
    dispatch({
      type: "DELETE_POST",
      payload: { id },
    });
  };

  const updatePost = ({ id, body }: { id: number; body: string }) => {
    dispatch({
      type: "UPDATE_POST",
      payload: { id, body },
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await getAllPosts();
        localStorage.setItem("posts", JSON.stringify(data));
        console.log("fetched posts");
        dispatch({
          type: "GET_POSTS",
          payload: { posts: data },
        });

        return;
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        ...state,
        loading,
        error,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }
  return context;
};
