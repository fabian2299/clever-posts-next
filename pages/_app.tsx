import "../styles/app.scss";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import PostsProvider from "../context/posts/PostsContext";
import UserProvider from "../context/user/UserProvider";

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
