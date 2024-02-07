"use client";
import React, { useContext, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import CustomeSpinner from "@/components/CustomeSpinner";
import { AuthAPI, CartAPI } from "@/custom/utils/actions";

const Logout = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = async () => {
    const loggedOut = await AuthAPI.logout();
    localStorage.removeItem("user_auth");
    localStorage.removeItem("user:token");
    if (authCtx.isLoggedIn) {
      logoutHandler();
    }
    const fetchSession = await CartAPI.getClientSessionId();
    authCtx.onLogout(fetchSession.result);
    return loggedOut;
  };

  useEffect(() => {
    logoutHandler();
    window.location.href = "/";
  }, []);

  return <CustomeSpinner />;
};

export default Logout;
