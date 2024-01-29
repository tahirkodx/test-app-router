"use client";
import { AppProps } from "next/app";
import styles from "@/styles/fonts/Fredoka.module.scss";
import { Spinner, MenuHeader, GoogleServices } from "@components";
import { AppHeader, MainFooter } from "@ui-layouts";
import { Suspense, useContext, useEffect, useState } from "react";
import AuthContext from "@/store/auth-context";
import NCartContext from "@/store/ncart-context";
import UserAPI from "@/custom/utils/actions/user";
import { AuthAPI, CartAPI } from "@/custom/utils/actions";
import Script from "next/script";
import { useTheme } from "@/store/ThemeContext";

const Structure = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(NCartContext);
  const [isInitAuthFetched, setIsInitAuthFetched] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [exp, setExp] = useState(0);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const logoutHandler = async () => {
    const loggedOut = await AuthAPI.logout();
    let result = loggedOut.msg;
    const fetchSession = await CartAPI.getClientSessionId();
    authCtx.onLogout(fetchSession.result);
    return loggedOut;
  };

  const validToken = async () => {
    let status = 0;
    const validityData = await UserAPI.getValidate();
    console.log("validity data", validityData);
    if (
      validityData !== undefined &&
      validityData !== null &&
      validityData.result !== undefined &&
      validityData.result !== null
    ) {
      let validity = validityData.result;
      if (
        validity.message !== undefined &&
        validity.message === "Not authenticated."
      ) {
        localStorage.removeItem("user_auth");
        if (authCtx.isLoggedIn) {
          logoutHandler();
        }
        setExp(0);
        return false;
      } else {
        // ask user to extend session
        if (validity?.sessActive) {
          let init = validity.iat;
          let expiry = validity.exp;
          authCtx.iat = init;
          authCtx.exp = expiry;
          localStorage.setItem("user_auth", JSON.stringify(authCtx));
          return true;
        } else {
          logoutHandler();
          /*   window.location.href="/logout"; */
          return false;
        }
      }
    } else {
      if (authCtx.isLoggedIn) {
        logoutHandler();
      }
    }
  };

  useEffect(() => {
    /* getSessionID(); */
    let auth: any =
      JSON.parse(localStorage.getItem("user_auth") as string) || null;
    console.log("Page is rerender", auth);
    if (auth) {
      console.log("authCtx set before", authCtx);
      authCtx.onAuthSet(auth);
    } else {
      setExp(0);
    }
    setIsInitAuthFetched(true);
  }, []);

  useEffect(() => {
    if (isInitAuthFetched) {
      console.log("authCtx set aftre", authCtx);
      let auth: any =
        JSON.parse(localStorage.getItem("user_auth") as string) || null;
      console.log("auth Data in condition", auth);
      if (auth !== null && auth.token !== null && auth.token !== undefined) {
        if (!validToken()) {
          authCtx.onShowLogin(false);
          window.location.reload();
        }
      }
      cartCtx.fetchCart();

      localStorage.setItem("user_auth", JSON.stringify(authCtx));
      if (Number(authCtx.exp) > 0) {
        setExp(Number(authCtx.exp));
      } else {
        setExp(0);
      }

      setAuthChecked(true);
    }
  }, [isInitAuthFetched]);

  return (
    <Suspense
      fallback={
        <div className="position-fixed start-0 top-0 w-100 h-100 bg-white d-flex justify-content-center align-items-center z-index-9">
          <Spinner />
        </div>
      }
    >
      {/* {<Script async src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>} */}
      <div className={`${styles.Main}`}>
        <GoogleServices />
        {authChecked && (
          <>
            <AppHeader />
            <MenuHeader />

            {children}

            <MainFooter />
          </>
        )}
      </div>
    </Suspense>
  );
}

export default Structure;