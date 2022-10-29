import React from "react";
import Header from "../header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />

      <main className=" min-h-screen overflow-x-hidden container mx-auto p-10">
        {children}
      </main>
    </div>
  );
}
