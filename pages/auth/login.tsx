import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import treeImg from "../../public/assets/tree.jpg";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Login() {
  const router = useRouter();
  const { login, users } = useUserContext();

  const [user, setUser] = useState({
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
    if (!userExists) return alert("User not found");

    login({
      ...userExists,
    });

    router.reload();
  };

  return (
    <Layout>
      <div className="login">
        <h1 className="login__heading">
          Welcome to <span>TreePost</span>
        </h1>

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
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className="form__input"
              />
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                className="form__input"
              />
            </div>

            <button type="submit" className="form__button">
              Login
            </button>

            <Link href={"/auth/register"} className="form__link">
              Not a member? Register
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
