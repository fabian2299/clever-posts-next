import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts } from "../../lib/posts/getAllPosts";
import { getPostById } from "../../lib/posts/getPostById";
import { Post } from "../../interface/post";
import Layout from "../../components/layouts/Layout";
import { useUserContext } from "../../context/user/UserProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PostDetailsPage({ post }: { post: Post }) {
  const router = useRouter();
  const { user } = useUserContext();
  const { title, userId, body } = post;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <Layout>
      <div>
        <h1>Post Details</h1>
        <p>User:{userId}</p>
        <p>{title}</p>
        <p>{body}</p>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data = await getAllPosts();
  const paths = data.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const data = await getPostById(id);

  return {
    props: {
      post: data,
    },
    revalidate: 60,
  };
};
