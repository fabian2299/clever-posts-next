import Link from "next/link";
import React from "react";
import PostCard from "./PostCard";
import { Post } from "../interface/post";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-3 gap-10 items-center mt-10">
      {posts?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
