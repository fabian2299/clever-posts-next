import { useTranslation } from "next-i18next";
interface Props {
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchPosts({ searchTerm, handleChange }: Props) {
  const { t } = useTranslation("common");

  return (
    <input
      type="text"
      className="search__input"
      value={searchTerm}
      onChange={handleChange}
      placeholder={t("posts.search")}
    />
  );
}
