import usePostsContext from "../../hooks/usePostsContext";

interface Props {
  sortVal: string;
  setSortVal: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectUser({ sortVal, setSortVal }: Props) {
  const { posts } = usePostsContext();

  // array of user ids to filter by withouth duplicates
  const userIds = [...new Set(posts?.map((post) => post.userId))];

  return (
    <select
      name="user"
      id="userID"
      className="border-2 rounded-md p-2 search__select"
      value={sortVal}
      onChange={(e) => setSortVal(e.target.value)}
    >
      <option value="">Select User</option>
      {userIds?.map((user, i) => {
        return (
          <option key={i} value={user}>
            {user}
          </option>
        );
      })}
    </select>
  );
}
