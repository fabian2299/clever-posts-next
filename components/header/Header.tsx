import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useUserContext } from "../../context/user/UserProvider";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { logout, isAuth, user } = useUserContext();

  const [openSideMenu, setOpenSideMenu] = useState(false);

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

  const handleLogout = () => {
    logout();
    router.reload();
  };

  return (
    <header className="p-6 border-b-2 shadow-md">
      <div className="hidden md:block container mx-auto">
        <section className="flex items-center">
          <div className="">
            <h2>LOGO</h2>
          </div>

          <nav className=" flex gap-5 items-center flex-1 justify-center">
            <Link href="/" className=" text-2xl uppercase">
              {t("home")}
            </Link>

            <Link href="/posts" className=" text-2xl uppercase">
              Posts
            </Link>
          </nav>

          <div className="flex gap-5">
            {!isAuth && (
              <Link href="/auth/login" className=" text-2xl">
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

      <section className="block md:hidden">
        <div className=" flex items-center">
          <button
            className="border-2 "
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            open
          </button>

          <div className="flex-1 text-center" />

          <div className="flex items-center gap-2">
            {isAuth && <p>{user?.name}</p>}

            <select
              name="lang"
              id="lang"
              value={router.locale}
              onChange={changeLang}
              className=" "
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>

          {openSideMenu && <AsideMenu setOpenSideMenu={setOpenSideMenu} />}
        </div>
      </section>
    </header>
  );
}

const AsideMenu = ({ setOpenSideMenu }: { setOpenSideMenu: any }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { logout, isAuth } = useUserContext();

  return (
    <aside className="fixed md:hidden top-0 bg-white z-10 border-2 min-h-full left-0 w-1/2 p-5">
      <div className="flex flex-col gap-5 items-center">
        <button
          className=" self-end border-2"
          onClick={() => setOpenSideMenu(false)}
        >
          Close
        </button>

        <nav className="flex flex-col gap-5">
          <Link href="/">{t("home")}</Link>
          <Link href="/posts">Posts</Link>

          {!isAuth && (
            <Link href="/auth/login" className="text-xl">
              {t("login")}
            </Link>
          )}

          {isAuth && (
            <button
              onClick={() => {
                logout();
                router.reload();
              }}
              className="text-xl"
            >
              Log out
            </button>
          )}
        </nav>
      </div>
    </aside>
  );
};
