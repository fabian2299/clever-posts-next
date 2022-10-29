import axios from "axios";
import { Post } from "../../interface/post";

export const getPostById = async (id: string) => {
  try {
    const { data } = await axios.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching post: ${error}`);
  }
};
