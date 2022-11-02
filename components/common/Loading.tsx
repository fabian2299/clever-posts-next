import { useTranslation } from "next-i18next";
export default function Loading() {
  const { t } = useTranslation("common");

  return (
    <div className="loading">
      <svg
        className="loading__svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="loading__circle"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="loading__path"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>

      <p>{t("posts.loading")}</p>
    </div>
  );
}
