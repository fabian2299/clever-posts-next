import useClient from "@/hooks/useClient";
import usePostsContext from "@/hooks/usePostsContext";
import { Post } from "@/interface/post";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
// components
import { Breadcrumb, Error, Loading, NotFound } from "@/components/common";
import { Layout } from "@/components/layouts";
import { PostList } from "@/components/posts";
import { SearchPosts, SelectUser } from "@/components/search";

export default function Posts() {
  const { t } = useTranslation("common");
  const { loading, error, posts } = usePostsContext();
  const { isClient } = useClient();

  const [sortVal, setSortVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredPosts, setFilteredPosts] = useState<Post[] | []>(
    () => posts ?? []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // filter posts by search term and filter by user name
  useEffect(() => {
    if (posts) {
      const filterByTerm = posts?.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filterByUserName = filterByTerm?.filter((post) => {
        if (sortVal === "") return post;
        return post.userName === sortVal;
      });

      setFilteredPosts(filterByUserName);
    }
  }, [searchTerm, sortVal, posts]);

  const renderPosts = () => {
    if (loading) return <Loading text={t("posts.loading")} />;

    if (error) return <Error error={error} />;

    if (filteredPosts.length === 0) return <NotFound searchTerm={searchTerm} />;

    return <PostList posts={filteredPosts} />;
  };

  return (
    !!isClient && (
      <Layout title="Posts">
        <>
          <Breadcrumb />
          <h1 className="heading">{t("posts.heading")}</h1>

          <section className="search">
            <SearchPosts searchTerm={searchTerm} handleChange={handleChange} />
            <SelectUser sortVal={sortVal} setSortVal={setSortVal} />
          </section>

          {renderPosts()}
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
