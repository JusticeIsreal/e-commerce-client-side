import Head from "next/head";
import "../styles/HomePage/Style.css";
import "../styles/ProductPage/style.css";
import "../styles/AdminPage/App.css";
import "../styles/DynamicPage/clientSingleproduct/style.css";
import "../styles/DynamicPage/adminSingleproduct/style.css";
import "../styles/DynamicPage/transactionreceipt/style.css";
import "../styles/CartPage/style.css";
import "../styles/LoginReg/LoginStyle.css";
import "../styles/OrderPage/style.css";
import "../styles/Paginate/pagenate.css";
import { AppProps } from "next/app";
import { AuthGuard } from "./api/auth/AuthGuard.";
import { createContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { getSessionUser } from "../Services/functions";
import { useRouter } from "next/router";

// mantine
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
export const CartQuantityContext = createContext();
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [preRender, setPreRender] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(false);
  useEffect(() => {
    setPreRender(true);

    async function fetchSessionUser() {
      const userData = await getSessionUser();
      if (userData && userData?.user) {
        setCartQty(userData?.user.cart.length);
      }
      if (userData?.user?.block === true) {
        router.push("/Login");
      }
    }
    fetchSessionUser();
  }, [router]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>E-commerce</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <Notifications position="top-right" zIndex={2077} />
        <CartQuantityContext.Provider value={{ cartQty, setCartQty }}>
          {preRender ? (
            <>
              {Component.requireAuth ? (
                <AuthGuard>
                  <Component {...pageProps} />{" "}
                </AuthGuard>
              ) : (
                <>
                  <Component {...pageProps} />
                </>
              )}
            </>
          ) : (
            <div style={{ marginTop: "200px" }}>
              <Loader />
            </div>
          )}
        </CartQuantityContext.Provider>
      </MantineProvider>
    </>
  );
}
