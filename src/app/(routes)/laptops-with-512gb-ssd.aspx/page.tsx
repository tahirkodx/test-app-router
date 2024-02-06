import ByAtt from "@/components/ByAtt";
import { ProductAPI } from "@/custom/utils/actions";
import { Metadata } from "next";
import { MetaDefault } from "@/custom/utils/Helper";

const defaultMeta = MetaDefault();
export async function generateMetadata(params: any): Promise<Metadata> {
  let attid = 22;
  const attData = await ProductAPI.getAttributeDetailsByID({ attid });
  let attDetail = null;
  if (
    attData !== null &&
    attData !== undefined &&
    attData.result !== null &&
    attData.result !== undefined
  ) {
    let pages = attData.result;

    if (pages !== undefined && pages.length > 0) {
      attDetail = pages[0];
    }
  }

  return {
    title: attDetail.pagetitle || defaultMeta.title,
    description: attDetail.metades || defaultMeta.description,
    keywords: attDetail.metakey || defaultMeta.keywords,
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title: attDetail.pagetitle || defaultMeta.title,
      description: attDetail.metades || defaultMeta.description,
      url: "https://www.evetech.co.za/pc-by-attribute",
      images: [
        {
          url: attDetail.bannerurl || defaultMeta.image,
          width: 1200,
          height: 630,
          alt: attDetail.pagetitle || defaultMeta.title,
        },
      ],
    },
  };
}

const PCByAttHome = () => {
  return <ByAtt attid={22}></ByAtt>;
};

export default PCByAttHome;
