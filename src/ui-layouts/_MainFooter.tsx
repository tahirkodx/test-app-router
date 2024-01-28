import React, { useContext, useEffect, useState } from "react";
import HeaderContext from "@/store/header-context";
import { AppFooter, LaptopFooter } from "@/components/Footers";

const MainFooter = () => {
  const headerCtx = useContext(HeaderContext);

  return <>{headerCtx.isLaptop ? <LaptopFooter /> : <AppFooter />}</>;
};

export default MainFooter;
