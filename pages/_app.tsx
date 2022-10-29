import "../styles/globals.css";
import type { AppInitialProps, AppProps } from "next/app";
import PostsProvider from "../context/posts/PostsContext";
import { Toaster } from "react-hot-toast";
import UserProvider from "../context/user/UserContext";
import type { NextComponentType } from "next/types";
import { Router } from "next/router";
import Auth from "../components/Auth";

type ComponentWithAuth = NextComponentType & { auth: boolean };
interface AppPropsWithAuth extends AppInitialProps {
  Component: ComponentWithAuth;
  router: Router;
}

export default function App({ Component, pageProps }: AppPropsWithAuth) {
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
