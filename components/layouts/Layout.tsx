import Head from "next/head";
import React from "react";
import Header from "../header/Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: Props) {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="main">{children}</main>

      <Footer />
    </div>
  );
}
