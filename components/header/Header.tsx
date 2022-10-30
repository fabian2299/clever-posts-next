import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useUserContext } from "../../context/user/UserProvider";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { logout, isAuth, user } = useUserContext();

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query },
      },
      router.asPath,
      { locale }
    );
  };

  const handleLogout = async () => {
    logout();
    router.reload();
  };

  return (
    <header className="p-6 border-b-2 shadow-md">
      <div className="container mx-auto">
        <section className="flex gap-5 items-center">
          <nav className=" flex justify-center gap-5 flex-1">
            <Link href="/" className=" font-bold text-2xl uppercase">
              {t("home")}
            </Link>

            <Link href="/posts" className=" font-bold text-2xl uppercase">
              Posts
            </Link>
          </nav>

          <div className="flex gap-5">
            {!isAuth && (
              <Link href="/login" className=" font-bold text-2xl">
                {t("login")}
              </Link>
            )}

            {isAuth && (
              <>
                <p>{user?.name}</p>
                <button onClick={handleLogout}>Log Out</button>
              </>
            )}

            <select
              name="lang"
              id="lang"
              value={router.locale}
              onChange={changeLang}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </section>
      </div>
    </header>
  );
}
