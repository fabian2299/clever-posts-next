interface Props {
  searchTerm: string;
  handleChange: any;
}

export default function SearchPosts({ searchTerm, handleChange }: Props) {
  return (
    <div>
      <input
        type="text"
        className="border-2 border-gray-600 rounded-md outline-none py-2 px-4"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search posts by title"
      />
    </div>
  );
}