import { setCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsTreeFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import useUserContext from "../../hooks/useUserContext";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { logout, isAuth, user } = useUserContext();

  const [openSideMenu, setOpenSideMenu] = useState(false);

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    setCookie("NEXT_LOCALE", locale);

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
    router.push("/");
  };

  return (
    <header className="header">
      <div className="container">
        <section className="nav">
          <Link href="/">
            <div className="nav__logo-group">
              <BsTreeFill className="nav__logo" />
              <p>TreePost</p>
            </div>
          </Link>

          <nav className="nav__links">
            <Link href="/" className="nav__link">
              {t("header.home")}
            </Link>

            <Link href="/posts" className="nav__link">
              Posts
            </Link>
          </nav>

          <div className="nav__user">
            {!isAuth && (
              <Link href="/auth/login" className="nav__login">
                {t("header.login")}
              </Link>
            )}

            {isAuth && (
              <>
                <p className="nav__username">{user?.name}</p>
                <button className="nav__logout" onClick={handleLogout}>
                  {t("header.logout")}
                </button>
              </>
            )}

            <select
              name="lang"
              id="lang"
              value={router.locale}
              onChange={changeLang}
              className="nav__lang"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </section>
      </div>

      {/* Nav Mobile */}
      <section className="section">
        <div className="nav">
          <button
            className="nav__menu "
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            <GiHamburgerMenu className="nav__menu-icon" />
          </button>

          <div />

          <div className="nav__group">
            {isAuth && <p>{user?.name}</p>}

            <select
              name="lang"
              id="lang"
              value={router.locale}
              onChange={changeLang}
              className="nav__lang"
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
    <aside className="mobile">
      <div className="mobile__nav">
        <button
          className="mobile__close"
          onClick={() => setOpenSideMenu(false)}
        >
          X
        </button>

        <nav className="mobile__links">
          <Link href="/">{t("header.home")}</Link>
          <Link href="/posts">Posts</Link>

          {!isAuth && <Link href="/auth/login">{t("header.login")}</Link>}

          {isAuth && (
            <button
              onClick={() => {
                logout();
                router.reload();
              }}
            >
              {t("header.logout")}
            </button>
          )}
        </nav>
      </div>
    </aside>
  );
};
