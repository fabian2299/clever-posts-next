import Breadcrumb from "@/components/common/Breadcrumb";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/layouts/Layout";
import useClient from "../../hooks/useClient";
import { Post } from "../../interface/post";
import { getAllPosts } from "../../lib/posts/getAllPosts";
import { getPostById } from "../../lib/posts/getPostById";

export default function PostDetailsPage({ post }: { post: Post }) {
  const { t } = useTranslation("common");
  const { title, userId, body } = post;
  const { isClient } = useClient();

  return (
    !!isClient && (
      <Layout title={`Post Details ${post.id}`}>
        <Breadcrumb />

        <section className="details">
          <h1 className="details__heading">{t("post.heading")}</h1>
          <div className="details__group">
            <h2 className="details__title">{title}</h2>
            <p className="details__user">User: {userId}</p>
            <p className="details__body">{body}</p>
          </div>
        </section>
      </Layout>
    )
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getAllPosts();

  const pathsLocale1 = data.map((post) => ({
    params: { id: post.id.toString() },
    locale: locales![0],
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
  };
};
