import useClient from "@/hooks/useClient";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// components
import { Hero } from "@/components/home";
import { Layout } from "@/components/layouts";

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
