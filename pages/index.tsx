import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/layouts/Layout";
import useClient from "../hooks/useClient";
import useUserContext from "../hooks/useUserContext";

export default function Home(): any {
  const { isClient } = useClient();
  const { user } = useUserContext();

  return (
    !!isClient && (
      <Layout>
        <div>
          <h1>Welcome {user?.name}</h1>
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
