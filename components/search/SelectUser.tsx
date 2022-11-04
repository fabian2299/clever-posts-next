import { useTranslation } from "next-i18next";
import usePostsContext from "../../hooks/usePostsContext";

interface Props {
  sortVal: string;
  setSortVal: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectUser({ sortVal, setSortVal }: Props) {
  const { t } = useTranslation("common");
  const { posts } = usePostsContext();

  // array of user to filter by withouth duplicates
  const users = [...new Set(posts?.map((post) => post.userName))];

  return (
    <select
      name="user"
      id="userID"
      className="search__select"
      value={sortVal}
      onChange={(e) => setSortVal(e.target.value)}
    >
      <option value="">{t("posts.select")}</option>
      {users?.map((user, i) => {
        return (
          <option key={i} value={user}>
            {user}
          </option>
        );
      })}
    </select>
  );
}
