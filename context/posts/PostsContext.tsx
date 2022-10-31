import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Post } from "../../interface/post";
import { getAllPosts } from "../../lib/posts/getAllPosts";
import { postsReducer } from "./postsReducer";

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
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("posts") ?? "[]"),
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
    const newPosts = state.posts.filter((post) => post.id !== id);
    dispatch({
      type: "DELETE_POST",
      payload: { posts: newPosts },
    });
  };

  const updatePost = ({ id, body }: { id: number; body: string }) => {
    const updatedPosts = state.posts.map((post) => {
      if (post.id === id) {
        return { ...post, body };
      }
      return post;
    });

    dispatch({
      type: "UPDATE_POST",
      payload: { posts: updatedPosts },
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
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(state.posts));
  }, [state.posts]);

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
