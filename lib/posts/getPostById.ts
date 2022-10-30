import axios from "axios";
import { Post } from "../../interface/post";

export const getPostById = async (id: string) => {
  try {
    const { data } = await axios.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(" Error fetching posts: " + error.response?.data);
    }
    return {};
  }
};
