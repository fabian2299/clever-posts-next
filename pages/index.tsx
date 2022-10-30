import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/layouts/Layout";
import { useUserContext } from "../context/user/UserProvider";
import useClient from "../hooks/useClient";

export default function Home() {
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
