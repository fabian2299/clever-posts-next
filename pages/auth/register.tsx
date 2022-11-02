import Layout from "@/components/layouts/Layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import treeImg from "../../public/assets/tree.jpg";

export default function Login() {
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
    if (userExists) return alert("User already exists");

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
        <h1 className="login__heading">
          Welcome to <span>TreePost</span>
        </h1>

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
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleChange}
                className="form__input"
              />
            </div>

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
              Sign Up
            </button>

            <Link href={"/auth/login"} className="form__link">
              Already have an account? Log in
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
