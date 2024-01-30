import React from "react";
import Head from "next/head";
import { Metadata } from "next";
import { Home } from "@pages";

// export async function generateMetadata( {params}: {params: {id: string}}): Promise<Metadata> {
//   return {
//     title: "Evetech Custom Computer Systems, Gaming Computers, Desktops Gaming PCs",
//     description: "Gaming Pc's, Custom Built Cheap Gaming Computer Systems, The lastest Gaming PC Systems, Intel i7 PC Gaming Desktops. Configure your own Gaming Pc Here!",
//     keywords: "gaming pc,gaming computers,cheap gaming pc,intel core i7,custom gaming computers,custom gaming pc",
//     alternates: {
//       canonical: "https://www.evetech.co.za/"
//     }
//   }
// }

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
      <Home />
    </>
  );
};

export default HomePage;
