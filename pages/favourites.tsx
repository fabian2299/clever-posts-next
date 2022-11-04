import useClient from "@/hooks/useClient";
import usePostsContext from "@/hooks/usePostsContext";
import { Post } from "@/interface/post";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
// components
import { Breadcrumb, Loading } from "@/components/common";
import { Layout } from "@/components/layouts";
import { PostList } from "@/components/posts";

const NotFound = () => {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2 className="heading">{t("favourites.not-found")}</h2>
    </div>
  );
};

export default function Favourites() {
  const { t } = useTranslation("common");
  const { favourites } = usePostsContext();
  const { isClient } = useClient();
  const [fakeLoading, setFakeLoading] = useState(true);
  const [favouriteList, setFavouriteList] = useState<Post[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    setFavouriteList(favourites);
    return () => clearTimeout(timer);
  }, [favourites]);

  const renderPosts = () => {
    if (fakeLoading) return <Loading text={t("favourites.loading")} />;

    if (favouriteList.length === 0) return <NotFound />;

    return <PostList posts={favouriteList} />;
  };

  return (
    !!isClient && (
      <Layout title="Favourites">
        <>
          <Breadcrumb />
          <section className="favourite">
            <h1 className="favourite__heading">{t("favourites.heading")}</h1>

            {renderPosts()}
          </section>
        </>
      </Layout>
    )
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
