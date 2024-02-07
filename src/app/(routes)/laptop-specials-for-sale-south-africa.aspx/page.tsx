import { Metadata } from "next";
import { GamingLaptops, Jobs, LaptopSpecials } from "@pages";

export async function generateMetadata(params: any): Promise<Metadata> {
  return {
    title:
      "Laptop Specials & Laptop Deals - Laptops for sale at discounted price",
    description:
      "Explore exclusive laptop specials and incredible deals at Evetech. Upgrade your tech with limited-time offers on high-performance laptops. Don't miss out on savings and cutting-edge technology!",
    keywords:
      "laptop specials, exclusive deals, discounted laptops, tech savings, Evetech promotions",
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title:
        "Laptop Specials & Laptop Deals - Laptops for sale at discounted price",
      description:
        "Discover unbeatable laptop specials and exclusive deals at Evetech. Upgrade your technology with limited-time offers on high-performance laptops. Don't miss out on savings and cutting-edge technology!",
      url: "https://www.evetech.co.za/laptop-specials-for-sale-south-africa.aspx",
      images: [
        {
          url: "https://www.evetech.co.za/images/laptop-specials-banner.jpg",
          width: 1200,
          height: 630,
          alt: "Laptop Specials & Laptop Deals - Laptops for sale at discounted price",
        },
      ],
    },
  };
}

const SpecialsPage = () => {
  return <LaptopSpecials />;
};

export default SpecialsPage;
