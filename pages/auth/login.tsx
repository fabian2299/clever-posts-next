import { Layout } from "@/components/layouts";
import useUserContext from "@/hooks/useUserContext";
import { User } from "@/interface/user";
import treeImg from "@/public/assets/tree.jpg";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { login, users } = useUserContext();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storeUser = users.find((u) => u.email === user.email) as User;
    if (!storeUser) {
      toast.error(t("login.user-error"));
      return;
    }

    if (storeUser.password !== user.password) {
      toast.error(t("login.password-error"));
      return;
    }

    login({
      ...storeUser,
    });

    router.reload();
  };

  return (
    <Layout title="Login">
      <div className="login">
        <h1 className="login__heading">{t("login.heading")}</h1>

        <div className="login__group">
          <Image
            src={treeImg}
            className="login__img"
            placeholder="blur"
            alt="login image"
          />

          <form onSubmit={handleSubmit} className="form">
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                {t("login.email-label")}
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={user.email.toLocaleLowerCase().trim()}
                onChange={handleChange}
                className="form__input"
                placeholder={t("login.email-placeholder")}
              />
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="password">
                {t("login.password-label")}
              </label>
              <div>
                <input
                  type={passwordType}
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={handleChange}
                  className="form__input"
                  placeholder="********"
                />
                <button
                  type="button"
                  className="form__password-btn"
                  onClick={
                    passwordType === "password"
                      ? () => setPasswordType("text")
                      : () => setPasswordType("password")
                  }
                >
                  {passwordType === "password" ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="form__button">
              {t("login.button")}
            </button>

            <Link href={"/auth/register"} className="form__link">
              {t("login.register-link")}
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
