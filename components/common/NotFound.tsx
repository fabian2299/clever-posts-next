import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function NotFound({ searchTerm }: { searchTerm: string }) {
  const { t } = useTranslation("common");

  return (
    <div className="not-found  container">
      <h3>
        {t("posts.notFound-heading")} <span>{searchTerm}</span>
      </h3>

      <p>{t("posts.notFound-text")}</p>

      <Image
        width={600}
        height={300}
        src={"/assets/not-found.jpg"}
        alt="not found"
        className="not-found__img"
      />
    </div>
  );
}
