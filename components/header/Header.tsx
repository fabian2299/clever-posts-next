import { setCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import useUserContext from "../../hooks/useUserContext";
import LogoImg from "../../public/assets/logo.png";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link
      href={href}
      className="nav__link"
      style={{
        color: isActive ? "var(--yellow)" : "var(--white)",
      }}
    >
      {children}
    </Link>
  );
};

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
    router.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <section className="nav">
          <Link href="/">
            <div className="nav__logo-group">
              <Image
                width={60}
                height={60}
                src={LogoImg}
                alt="logo tree"
                className="nav__logo"
                placeholder="blur"
              />
              <p>TREEPOST</p>
            </div>
          </Link>

          <nav className="nav__links">
            <NavLink href="/">{t("header.home")}</NavLink>

            <NavLink href="/posts">Posts</NavLink>

            <NavLink href="/favourites">{t("favourites.heading")}</NavLink>
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
          <GiHamburgerMenu
            className="nav__menu"
            onClick={() => setOpenSideMenu(!openSideMenu)}
            role="menu"
          />

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
    <aside className="mobile open">
      <div className="mobile__nav">
        <button
          className="mobile__close"
          onClick={() => setOpenSideMenu(false)}
        >
          X
        </button>

        <Link href="/">
          <div className="mobile__logo">
            <Image
              width={60}
              height={60}
              src={LogoImg}
              alt="logo tree"
              className="nav__logo"
              placeholder="blur"
            />
          </div>
        </Link>

        <nav className="mobile__links">
          <NavLink href="/">{t("header.home")}</NavLink>
          <NavLink href="/posts">Posts</NavLink>
          <NavLink href="/favourites">{t("favourites.heading")}</NavLink>

          {!isAuth && (
            <Link href="/auth/login" className="mobile__login">
              {t("header.login")}
            </Link>
          )}

          {isAuth && (
            <button
              onClick={() => {
                logout();
                router.reload();
              }}
              className="mobile__logout"
            >
              {t("header.logout")}
            </button>
          )}
        </nav>
      </div>
    </aside>
  );
};
