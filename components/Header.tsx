import React from "react";
import Link from "next/link";
import SearchPosts from "./SearchPosts";

export default function Header() {
  return (
    <header className="p-6 border-b-2 shadow-md">
      <section className="flex justify-center gap-5 items-center">
        <nav className=" flex justify-center gap-5">
          <Link href="/" className=" font-bold text-2xl">
            Home
          </Link>

          <Link href="/login" className=" font-bold text-2xl">
            Login
          </Link>
        </nav>
      </section>
    </header>
  );
}
