"use client";
import React, { useReducer } from "react";
import AuthContext from "@/store/auth-context";
import { useEffect } from "react";
import * as _ from "lodash";
import { CartAPI } from "@actions";

const defaultAuthState = {
  isLoggedIn: false,
  isAdmin: false,
  token: "",
  user: {},
  iat: "",
  exp: "",
  sessId: "",
  showLogin: false,
  showExtend: true,
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    const token = action.authDetails.token;
    localStorage.setItem("token", token);
    let updateState = {
      isLoggedIn: action.authDetails.isLoggedIn,
      isAdmin: action.authDetails.isAdmin,
      token: token,
      user: action.authDetails.user,
      iat: action.authDetails.iat,
      exp: action.authDetails.exp,
      sessId: state.sessId,
      showLogin: false,
      showExtend: true,
    };
    localStorage.setItem("user_auth", JSON.stringify(updateState));

    return updateState;
  }

  if (action.type === "SETAUTH") {
    return {
      isLoggedIn: action.authDetails.isLoggedIn,
      isAdmin: action.authDetails.isAdmin,
      token: action.authDetails.token,
      user: action.authDetails.user,
      iat: action.authDetails.iat,
      exp: action.authDetails.exp,
      sessId: state.sessId,
      showLogin: action.authDetails.showLogin,
      showExtend: action.authDetails.showExtend,
    };
  }

  if (action.type === "LOGOUT") {
    localStorage.removeItem("token");
    localStorage.removeItem("user_auth");
    return {
      isLoggedIn: false,
      isAdmin: false,
      token: "",
      user: {},
      iat: "",
      exp: "",
      sessId: action.sessId,
      showLogin: false,
      showExtend: true,
    };
  }

  if (action.type === "SHOWLOGIN") {
    return {
      isLoggedIn: state.isLoggedIn,
      isAdmin: state.isAdmin,
      token: state.token,
      user: state.user,
      iat: state.iat,
      exp: state.exp,
      sessId: state.sessId,
      showLogin: action.show,
      showExtend: true,
    };
  }

  if (action.type === "SHOWEXTEND") {
    return {
      isLoggedIn: state.isLoggedIn,
      isAdmin: state.isAdmin,
      token: state.token,
      user: state.user,
      iat: state.iat,
      exp: state.exp,
      sessId: state.sessId,
      showLogin: state.showLogin,
      showExtend: action.show,
    };
  }

  if (action.type === "SETSESS") {
    return {
      isLoggedIn: state.isLoggedIn,
      isAdmin: state.isAdmin,
      token: state.token,
      user: state.user,
      iat: state.iat,
      exp: state.exp,
      sessId: action.sessId,
      showLogin: state.showLogin,
      showExtend: true,
    };
  }

  return defaultAuthState;
};

const AuthProvider = (props) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );

  const LoginHandler = async (authDetails) => {
    dispatchAuthAction({ type: "LOGIN", authDetails: authDetails });
  };

  const AuthHandler = (authDetails) => {
    dispatchAuthAction({ type: "SETAUTH", authDetails: authDetails });
  };

  const LogoutHandler = (respSessId) => {
    /*    const logout = async () => {
      const loggedOut = await fetch(`/api/logout`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(async (res) => {
        let result = res.msg;
        const fetchSession = await fetch(`/api/cart/getClientSessionId`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }).then((res) => res.json());

        console.log(loggedOut);
        
      });
    }; */
    dispatchAuthAction({ type: "LOGOUT", sessId: respSessId });
    /* logout(); */
  };

  const ShowLoginHandler = (show) => {
    dispatchAuthAction({ type: "SHOWLOGIN", show: show });
  };

  const ShowExtendHandler = (show) => {
    dispatchAuthAction({ type: "SHOWEXTEND", show: show });
  };

  useEffect(() => {
    const getSessionID = async () => {
      const session = await CartAPI.getClientSessionId();
      // const session = await fetch(`/api/cart/getClientSessionId`, {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //   },
      // }).then((res) => res.json());
      console.log("session", session)
      dispatchAuthAction({ type: "SETSESS", sessId: session.result });
    };

    getSessionID();
  }, []);

  const cartContext = {
    isLoggedIn: authState.isLoggedIn,
    isAdmin: authState.isAdmin,
    token: authState.token,
    user: authState.user,
    iat: authState.iat,
    exp: authState.exp,
    showLogin: authState.showLogin,
    showExtend: authState.showExtend,
    sessId: authState.sessId,
    onLogout: LogoutHandler,
    onLogin: LoginHandler,
    onAuthSet: AuthHandler,
    onShowLogin: ShowLoginHandler,
    onShowExtend: ShowExtendHandler,
  };

  return (
    <AuthContext.Provider value={cartContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
