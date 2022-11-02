import Hero from "@/components/home/Hero";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/layouts/Layout";
import useClient from "../hooks/useClient";

export default function Home(): any {
  const { isClient } = useClient();

  return (
    !!isClient && (
      <Layout title="Home" description="Home page of treepost">
        <>
          <Hero />
        </>
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
