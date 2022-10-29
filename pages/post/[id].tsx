import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts } from "../../lib/posts/getAllPosts";
import { getPostById } from "../../lib/posts/getPostById";
import { Post } from "../../interface/post";
import Layout from "../../components/Layout";

export default function PostDetailsPage({ post }: { post: Post }) {
  const { title, completed, userId, id, body } = post;

  return (
    <Layout>
      <div>
        <h1>Post Details</h1>
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