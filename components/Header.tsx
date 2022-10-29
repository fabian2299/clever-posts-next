import React from "react";
import Link from "next/link";
import { useUserContext } from "../context/user/UserContext";

export default function Header() {
  const { user } = useUserContext();
  return (
    <header className="p-6 border-b-2 shadow-md">
      <section className="flex justify-center gap-5 items-center">
        <nav className=" flex justify-center gap-5">
          <Link href="/" className=" font-bold text-2xl">
            Home
          </Link>

          {!user?.auth && (
            <Link href="/login" className=" font-bold text-2xl">
              Login
            </Link>
          )}
        </nav>
      </section>
    </header>
  );
}
