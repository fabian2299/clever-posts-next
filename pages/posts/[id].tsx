import useClient from "@/hooks/useClient";
import usePostsContext from "@/hooks/usePostsContext";
import { Post } from "@/interface/post";
import { getAllPosts } from "@/lib/posts/getAllPosts";
import { getPostById } from "@/lib/posts/getPostById";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// components
import { Breadcrumb } from "@/components/common";
import { Layout } from "@/components/layouts";

export default function PostDetailsPage() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { isClient } = useClient();
  const { posts } = usePostsContext();

  const [post, setPost] = useState({
    id: 0,
    title: "",
    body: "",
    userId: 0,
  } as Post);

  const id = router.query.id ?? 0;

  useEffect(() => {
    if (isClient) {
      const post = posts.find((post) => post.id === +id) ?? ({} as Post);
      setPost(post);
    }
  }, [isClient, posts, id, router]);

  const { title, body, userName } = post;

  return (
    !!isClient && (
      <Layout title={`Post Details ${post.id ?? ""}`}>
        {post.title ? (
          <>
            <Breadcrumb />

            <section className="details">
              <h1 className="details__heading">{t("post.heading")}</h1>
              <div className="details__group">
                <h2 className="details__title">{title}</h2>
                <p className="details__user">{userName}</p>
                <p className="details__body">{body}</p>
              </div>
            </section>
          </>
        ) : (
          <section className="details">
            <h1 className="details__heading">{t("post.not-found")}</h1>
          </section>
        )}
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
  try {
    const data = await getPostById(id);

    if (!data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale!, ["common"])),
        post: data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
