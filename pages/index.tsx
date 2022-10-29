import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import NotFound from "../components/NotFound";
import SearchPosts from "../components/SearchPosts";
import { Post } from "../interface/post";
import { usePostsContext } from "../context/posts/PostsContext";
import SelectUser from "../components/SelectUser";
import { useUserContext } from "../context/user/UserContext";

export default function Home() {
  const { loading, error, posts } = usePostsContext();
  const { user } = useUserContext();
  console.log(user);

  const [client, setClient] = useState(false);

  const [sortVal, setSortVal] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[] | []>(posts);

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

      filterByUserId.length > 0
        ? setFilteredPosts(filterByUserId)
        : setFilteredPosts([]);
    }
  }, [searchTerm, sortVal, posts]);

  // This is a hack to make sure that the client is mounted before rendering
  useEffect(() => {
    setClient(true);
  }, []);

  if (!user?.auth) return null;

  return (
    !!client && (
      <Layout>
        <div className="">
          <h1 className="text-center font-bold text-2xl text-green-600">
            Posts
          </h1>

          <div className="flex justify-center mt-10 gap-10">
            <SearchPosts searchTerm={searchTerm} handleChange={handleChange} />
            <SelectUser sortVal={sortVal} setSortVal={setSortVal} />
          </div>

          {error && !loading && <Error error={error} />}

          {loading ? <Loading /> : <PostList posts={filteredPosts} />}

          {filteredPosts?.length === 0 && <NotFound />}
        </div>
      </Layout>
    )
  );
}

Home.auth = true;
