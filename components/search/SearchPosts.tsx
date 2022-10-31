interface Props {
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchPosts({ searchTerm, handleChange }: Props) {
  return (
    <input
      type="text"
      className="search__input"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search posts by title"
    />
  );
}
