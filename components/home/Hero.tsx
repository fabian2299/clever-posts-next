import useUserContext from "@/hooks/useUserContext";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function Hero() {
  const { user } = useUserContext();
  const { t } = useTranslation("common");

  return (
    <section className="hero">
      <h1 className="hero__heading">
        {t("home.welcome")} {user?.name}
      </h1>
      <div className="hero__bg">
        <div className="hero__content">
          <h2 className="hero__text">TreePost</h2>
          <p>{t("home.hero-text")}</p>

          <Link className="hero__link" href={"/posts"}>
            {t("home.hero-button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
