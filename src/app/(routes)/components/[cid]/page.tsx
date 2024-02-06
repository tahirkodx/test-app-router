import { Metadata } from "next";
/* import { ComponentsByCID } from "@pages"; */
import { ProductAPI } from "@actions";
import * as _ from "lodash";
import { MetaDefault } from "@/custom/utils/Helper";
import ComponentsByCID from "@/components/ComponentByCID";

const defaultMeta = MetaDefault();
export async function generateMetadata({
  params,
}: {
  params: { cid: string };
}): Promise<Metadata> {
  let CID: any = params?.cid;
  console.log(params);
  if (CID !== undefined && CID.split("-").length > 0) {
    CID.split("-").forEach((str) => {
      try {
        CID = parseInt(str.replace(".", "").replace("aspx", "").trim());
      } catch (e) {}
    });
  } else {
    try {
      CID = parseInt(CID.replace(".", "").replace("aspx", "").trim());
    } catch (e) {
      CID = 0;
    }
  }
  const cats = await ProductAPI.getCategoryDetailsBrief({ CID });
  if (
    cats !== undefined &&
    cats !== null &&
    cats.result !== undefined &&
    cats.result !== null &&
    cats.result.length > 0
  ) {
    const category = cats.result[0];

    let ogImage = "";
    ogImage = `https://www.evetech.co.za/${
      category.imgUrl !== undefined && category.imgUrl.trim().length > 0
        ? category.imgUrl
        : defaultMeta.image
    }`;
    return {
      title: category.Heading || defaultMeta.title,
      description: category.MetaDes || defaultMeta.description,
      keywords:
        "gaming pc,gaming computers,cheap gaming pc,intel core i7,custom gaming computers,custom gaming pc",
      openGraph: {
        locale: "en_ZA",
        type: "article",
        siteName: "Evetech",
        title: category.Heading || defaultMeta.title,
        description: category.MetaDes || defaultMeta.description,
        url: `https://www.evetech.co.za/${_.replace(
          _.toLower(category.cat),
          new RegExp(" ", "g"),
          "-"
        ).trim()}${category.id}.aspx`,
        images: [
          {
            url: ogImage || defaultMeta.image,
            secureUrl: ogImage || defaultMeta.image,
            alt: category.Heading || defaultMeta.title,
            type: "image/jpeg",
            width: "600",
            height: "400",
          },
        ],
      },
      twitter: {
        title: category.Heading,
      },
      alternates: {
        canonical: "https://www.evetech.co.za/",
      },
    };
  } else {
    return {};
  }
}

const ComponentsCID = (props) => {
  let CID: any = props.params?.cid;
  console.log(props.params);
  if (CID !== undefined && CID.split("-").length > 0) {
    CID.split("-").forEach((str) => {
      try {
        CID = parseInt(str.replace(".", "").replace("aspx", "").trim());
      } catch (e) {}
    });
  } else {
    try {
      CID = parseInt(CID.replace(".", "").replace("aspx", "").trim());
    } catch (e) {
      CID = 0;
    }
  }
  console.log("CID", CID);
  /* return <ComponentsByCID />; */
  return <ComponentsByCID cid={CID} />;
};

export default ComponentsCID;
