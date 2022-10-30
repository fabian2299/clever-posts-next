import axios from "axios";
import { Post } from "../../interface/post";

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // delay response 2 second
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(" Error fetching posts: " + error.response?.data);
    }
    return [];
  }
};
