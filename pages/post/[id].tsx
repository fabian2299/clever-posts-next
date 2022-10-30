import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/layouts/Layout";
import useClient from "../../hooks/useClient";
import { Post } from "../../interface/post";
import { getAllPosts } from "../../lib/posts/getAllPosts";
import { getPostById } from "../../lib/posts/getPostById";

export default function PostDetailsPage({ post }: { post: Post }) {
  const { title, userId, body } = post;
  const { isClient } = useClient();

  return (
    !!isClient && (
      <Layout>
        <div>
          <h1>Post Details</h1>
          <p>User:{userId}</p>
          <p>{title}</p>
          <p>{body}</p>
        </div>
      </Layout>
    )
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getAllPosts();
  const pathsLocale1 = data.map((post) => ({
    params: { id: post.id.toString(), locale: locales![0] },
  }));

  const pathsLocale2 = data.map((post) => ({
    params: { id: post.id.toString() },
    locale: locales![1],
  }));

  const paths = [...pathsLocale1, ...pathsLocale2];

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
