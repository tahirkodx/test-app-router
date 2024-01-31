import React from "react";
import { Metadata } from "next";
import { MainHome } from "@pages";

export const metadata: Metadata = {
  title: "Evetech Custom Computer Systems, Gaming Computers, Desktops Gaming PCs",
  description: "Gaming Pc's, Custom Built Cheap Gaming Computer Systems, The lastest Gaming PC Systems, Intel i7 PC Gaming Desktops. Configure your own Gaming Pc Here!",
  keywords: "gaming pc,gaming computers,cheap gaming pc,intel core i7,custom gaming computers,custom gaming pc",
  alternates: {
    canonical: "https://www.evetech.co.za/"
  }
};

const HomePage = (props: any) => {


  return (
    <>
      <MainHome />
    </>
  );
};

export default HomePage;
