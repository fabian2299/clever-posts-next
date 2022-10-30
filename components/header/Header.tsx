import React from "react";
import Link from "next/link";
import { useUserContext } from "../../context/user/UserProvider";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { logout, isAuth, user } = useUserContext();

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.pathname, { locale });
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
            <Link href="/" className=" font-bold text-2xl">
              {t("home")}
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
