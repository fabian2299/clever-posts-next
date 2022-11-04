import { Layout } from "@/components/layouts";
import useUserContext from "@/hooks/useUserContext";
import treeImg from "@/public/assets/tree.jpg";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { isValidEmail } from "../../utils/index";

export default function Login() {
  const { t } = useTranslation("common");

  const router = useRouter();
  const { users, register } = useUserContext();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userExists = users.find((u) => u.email === user.email);

    if (userExists) {
      toast.error(t("register.exists-error"));
      return;
    }

    if (user.name === "") {
      toast.error(t("register.name-error"));
      return;
    }

    if (!isValidEmail(user.email)) {
      toast.error(t("register.email-error"));
      return;
    }

    if (user.password.length < 6) {
      toast.error(t("register.password-error"));
      return;
    }

    register({
      id: new Date().getTime(),
      email: user.email,
      name: user.name,
      password: user.password,
    });

    router.reload();
  };

  return (
    <Layout title="Register">
      <div className="login">
        <h1 className="login__heading">{t("register.heading")}</h1>

        <div className="login__group">
          <Image
            src={treeImg}
            placeholder="blur"
            className="login__img"
            alt="login image"
          />

          <form onSubmit={handleSubmit} className="form">
            <div className="form__group">
              <label htmlFor="name" className="form__label">
                {t("register.name-label")}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name.trim()}
                onChange={handleChange}
                className="form__input"
                placeholder={t("register.name-placeholder")}
              />
            </div>

            <div className="form__group">
              <label htmlFor="email" className="form__label">
                {t("register.email-label")}
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className="form__input"
                placeholder={t("register.email-placeholder")}
              />
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="password">
                {t("register.password-label")}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                className="form__input"
                placeholder="********"
              />
            </div>

            <button type="submit" className="form__button">
              {t("register.button")}
            </button>

            <Link href={"/auth/login"} className="form__link">
              {t("register.register-link")}
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
