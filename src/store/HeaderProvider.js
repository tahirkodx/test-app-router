"use client";
import React, { useReducer } from "react";
import HeaderContext from "@/store/header-context";

const defaultHeaderState = {
  isLaptop: false,
  isSearchPage: false,
};

const headerReducer = (state, action) => {
  if (action.type === "SETLAPTOP") {
    return {
      isLaptop: action.header.isLaptop,
    };
  }

  if (action.type === "SETSEARCHPAGE") {
    return {
      isSearchPage: action.header.isSearchPage,
    };
  }

  return defaultHeaderState;
};

const HeaderProvider = (props) => {
  const [headerState, dispatchHeaderAction] = useReducer(
    headerReducer,
    defaultHeaderState
  );

  const setHeaderHandler = (header) => {
    dispatchHeaderAction({ type: "SETLAPTOP", header: header });
  };

  const setSearchPageHandler = (header) => {
    dispatchHeaderAction({ type: "SETSEARCHPAGE", header: header });
  };

  const headerContext = {
    isLaptop: headerState.isLaptop,
    isSearchPage: headerState.isSearchPage,
    onHeaderSet: setHeaderHandler,
    onSearchPageSet: setSearchPageHandler,
  };

  return (
    <HeaderContext.Provider value={headerContext}>
      {props.children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
