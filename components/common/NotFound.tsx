import Image from "next/image";

export default function NotFound({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="not-found  container">
      <h3>
        No posts found for <span>{searchTerm}</span>
      </h3>

      <p>Try searching with a different term or filter by a user.</p>

      <Image
        width={500}
        height={500}
        src={"/assets/not-found.jpg"}
        alt="not found"
        className="not-found__img"
      />
    </div>
  );
}
