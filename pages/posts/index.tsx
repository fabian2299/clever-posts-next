import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Error from "../../components/common/Error";
import Loading from "../../components/common/Loading";
import NotFound from "../../components/common/NotFound";
import Layout from "../../components/layouts/Layout";
import PostList from "../../components/posts/PostList";
import SearchPosts from "../../components/search/SearchPosts";
import SelectUser from "../../components/search/SelectUser";
import { usePostsContext } from "../../context/posts/PostsContext";
import useClient from "../../hooks/useClient";
import { Post } from "../../interface/post";

export default function Posts() {
  const { t } = useTranslation("common");
  const { loading, error, posts } = usePostsContext();
  const { isClient } = useClient();

  const [sortVal, setSortVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredPosts, setFilteredPosts] = useState<Post[] | []>([...posts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // filter posts by search term and filter by user id
  useEffect(() => {
    if (posts) {
      const filterByTerm = posts?.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filterByUserId = filterByTerm?.filter((post) => {
        if (sortVal === "") return post;
        return post.userId === Number(sortVal);
      });

      setFilteredPosts(filterByUserId);
    }
  }, [searchTerm, sortVal, posts]);

  const renderPosts = () => {
    if (loading) return <Loading />;

    if (error) {
      return (
        <div className="mt-10">
          <Error error={error} />
        </div>
      );
    }

    if (filteredPosts.length === 0) return <NotFound />;

    return <PostList posts={filteredPosts} />;
  };

  return (
    !!isClient && (
      <Layout>
        <div className="">
          <h1 className="text-center font-bold text-2xl text-green-600">
            {t("posts")}
          </h1>

          <div className="flex justify-center mt-10 gap-2 md:gap-10">
            <SearchPosts searchTerm={searchTerm} handleChange={handleChange} />
            <SelectUser sortVal={sortVal} setSortVal={setSortVal} />
          </div>

          {renderPosts()}
        </div>
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
