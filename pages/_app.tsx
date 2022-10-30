import "../styles/globals.css";
import type { AppProps } from "next/app";
import PostsProvider from "../context/posts/PostsContext";
import { Toaster } from "react-hot-toast";
import UserProvider from "../context/user/UserProvider";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <PostsProvider>
        <Toaster />
        <Component {...pageProps} />
      </PostsProvider>
    </UserProvider>
  );
}

export default appWithTranslation(App);
