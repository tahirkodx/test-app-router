"use client";
import React, { useContext, useEffect, useState } from "react";
import HeaderContext from "@/store/header-context";
import LaptopGoogleServices from "@/components/Laptop/Controls/LaptopGoogleServices";
import MainGoogleServices from "@/components/Main/Controls/MainGoogleServices";

const GoogleServices = () => {
  const headerCtx = useContext(HeaderContext);

  const [isInitHeaderFetched, setIsInitHeaderFetched] = useState(false);

  useEffect(() => {
    const storedHeader: any = localStorage.getItem("header_ctx");
    const header = storedHeader !== null ? JSON.parse(storedHeader) : null;
    if (header) {
      headerCtx.onHeaderSet(header);
    }
    setIsInitHeaderFetched(true);
  }, []);

  useEffect(() => {
    if (isInitHeaderFetched) {
      localStorage.setItem("header_ctx", JSON.stringify(headerCtx));
    }
  }, [headerCtx.isLaptop]);

  return (
    <>
      {headerCtx.isLaptop ? <LaptopGoogleServices /> : <MainGoogleServices />}
    </>
  );
};

export default GoogleServices;
