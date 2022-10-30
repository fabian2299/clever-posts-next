import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/layouts/Layout";
import { Post } from "../../interface/post";
import { getAllPosts } from "../../lib/posts/getAllPosts";
import { getPostById } from "../../lib/posts/getPostById";

export default function PostDetailsPage({ post }: { post: Post }) {
  const { title, userId, body } = post;

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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id } = params as { id: string };
  const data = await getPostById(id);

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      post: data,
    },
    revalidate: 60,
  };
};
