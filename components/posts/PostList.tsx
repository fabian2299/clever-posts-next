import { Post } from "../../interface/post";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <section className="posts">
      <div className="posts__grid">
        {posts?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
}
