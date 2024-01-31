import React from "react";
import { Metadata } from "next";
import { IHome } from "@pages";
import { ProductAPI } from "@actions";
import * as _  from "lodash";

export async function generateMetadata( {params}: {params: {id: string}}): Promise<Metadata> {
  
  let ProdId: any = params?.id;
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
    
    const prods = await ProductAPI.getComponentById({ ProductId: ProdId });
    if (
      prods !== undefined &&
      prods !== null &&
      prods.result !== undefined &&
      prods.result !== null &&
      prods.result.length > 0
    ) {
      const product = prods.result[0];
      let gallery: any = {
        ImageGallery: product.ImageGallery,
        ImageGalleryThumb: product.ImageGalleryThumb,
      };
      let ogImage = "";
      let image: any = _.first(gallery.ImageGalleryThumb.split("|"));
        ogImage = `https://www.evetech.co.za/${
              image !== undefined && image.trim().length > 0
                ? image
                : product.ImageGalleryThumb
            }`;
      return {
        title: product.Title,
        description: product.ProductMetaDescription,
        keywords: "gaming pc,gaming computers,cheap gaming pc,intel core i7,custom gaming computers,custom gaming pc",
        openGraph: {
          locale: "en_ZA",
          type: "article",
          siteName: "Evetech",
          title: product.Title,
          description: product.ProductMetaDescription,
          url: `https://www.evetech.co.za/${_.replace(
            _.toLower(product.Title),
            new RegExp(" ", "g"),
            "-"
          ).trim()}/best-deal/${product.ProductID}.aspx`,
          images: [
            {
              url: ogImage,
              secureUrl: ogImage,
              alt: product.Title,
              type: "image/jpeg",
              width: "600",
              height: "400",
            },
            {
              url: product.MainImage ? product.MainImage : product.ProductImage,
              secureUrl: product.MainImage ? product.MainImage : product.ProductImage,
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
const Home = () => {

  return (
    <>
      <IHome />
    </>
  );
};

export default Home;
