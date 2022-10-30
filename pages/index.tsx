import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Layout from "../components/layouts/Layout";
import useClient from "../hooks/useClient";

export default function Home() {
  const { isClient } = useClient();

  return (
    !!isClient && (
      <Layout>
        <div>
          <h1>Home</h1>
          <Link href={"/posts"}>Posts</Link>
        </div>
      </Layout>
    )
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
