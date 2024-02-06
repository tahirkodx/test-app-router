import PCByCategory from "@/components/PCCategory";
import { ProductAPI } from "@/custom/utils/actions";
import { Metadata } from "next";
import { MetaDefault } from "@/custom/utils/Helper";

const defaultMeta = MetaDefault();
export async function generateMetadata(params: any): Promise<Metadata> {
  let catId = 15;
  const catData = await ProductAPI.getCategoryById({ catId });
  let catDetail = null;
  if (
    catData !== null &&
    catData !== undefined &&
    catData.result !== null &&
    catData.result !== undefined
  ) {
    let pages = catData.result;

    if (pages !== undefined && pages.length > 0) {
      catDetail = pages[0];
    }
  }

  return {
    title: catDetail.TitleText || defaultMeta.title,
    description: catDetail.MetaDescription || defaultMeta.description,
    keywords: catDetail.keyword || defaultMeta.keywords,
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title: catDetail.TitleText || defaultMeta.title,
      description: catDetail.MetaDescription || defaultMeta.description,
      url: "https://www.evetech.co.za/pc-by-attribute",
      images: [
        {
          url: catDetail.bannerurl || defaultMeta.image,
          width: 1200,
          height: 630,
          alt: catDetail.TitleText || defaultMeta.title,
        },
      ],
    },
  };
}

const PCByCategoryHome = () => {
  return <PCByCategory cid={15}></PCByCategory>;
};

export default PCByCategoryHome;
