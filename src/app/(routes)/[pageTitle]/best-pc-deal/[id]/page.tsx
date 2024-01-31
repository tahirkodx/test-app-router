import React from "react";
import { Metadata } from "next";
import { BestPcDeal } from "@pages";
import { ProductAPI } from "@actions";
import * as _  from "lodash";
// import Head from "next/head";

export async function generateMetadata( {params}: {params: {id: string}}): Promise<Metadata> {
  
  let ProdId: any = params?.id;
  console.log(params)
    if (ProdId !== undefined && ProdId.trim().length > 0) {
      if (isNaN(ProdId)) {
        try {
          ProdId = parseInt(ProdId.replace(".", "").replace("aspx", "").trim());
        } catch (e) {
          /* router.replace("/"); */
          console.log(e);
        }
      } else {
        ProdId = parseInt(ProdId.replace(".", "").replace("aspx", "").trim());
      }
    }
    
    const prods = await ProductAPI.getPCById({ ProductId: ProdId });
    if (
      prods !== undefined &&
      prods !== null &&
      prods.result !== undefined &&
      prods.result !== null &&
      prods.result.length > 0
    ) {
      const product = prods.result[0];

      return {
        title: product.Title,
        description: product.ProductMetaDescription,
        keywords: "gaming pc,gaming computers,cheap gaming pc,intel core i7,custom gaming computers,custom gaming pc",
        openGraph: {
          locale: "en_US",
          type: "article",
          siteName: "Evetech",
          title: product.Title,
          description: product.ProductMetaDescription,
          url: `https://www.evetech.co.za/${_.replace(
            _.toLower(product.Title),
            new RegExp(" ", "g"),
            "-"
          ).trim()}/best-pc-deal/${product.ProductID}.aspx`,
          images: [
            {
              url: product.ProductImage,
              secureUrl: product.ProductImage,
              alt: product.Title,
              type: "image/jpeg",
              width: "600",
              height: "400",
            }
          ]
        },
        twitter: {
          title: product.Title,

        },
        alternates: {
          canonical: "https://www.evetech.co.za/"
        }
      }
    } else {
      return {}
    }
}

const PC = () => {


  return (
    <>
      <BestPcDeal />
    </>
  );
};

export default PC;
