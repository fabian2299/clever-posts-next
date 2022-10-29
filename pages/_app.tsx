import "../styles/globals.css";
import type { AppInitialProps } from "next/app";
import PostsProvider from "../context/posts/PostsContext";
import { Toaster } from "react-hot-toast";
import UserProvider from "../context/user/UserContext";
import type { NextComponentType } from "next/types";
import { Router } from "next/router";
import Auth from "../components/auth/Auth";
import { appWithTranslation } from "next-i18next";

type ComponentWithAuth = NextComponentType & { auth: boolean };
interface AppPropsWithAuth extends AppInitialProps {
  Component: ComponentWithAuth;
  router: Router;
}

function App({ Component, pageProps }: AppPropsWithAuth) {
  return (
    <UserProvider>
      <PostsProvider>
        <Toaster />
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </PostsProvider>
    </UserProvider>
  );
}

export default appWithTranslation(App);
