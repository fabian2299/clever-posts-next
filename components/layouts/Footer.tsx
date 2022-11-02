import { useTranslation } from "next-i18next";
export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <div className="footer">
      <p className="footer__heading">{t("footer")}</p>
    </div>
  );
}
