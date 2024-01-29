"use client";
import React from "react";

const HeaderContext = React.createContext({
  isLaptop: false,
  isSearchPage: false,
  onHeaderSet: ({ isLaptop }: any) => {},
});

export default HeaderContext;
