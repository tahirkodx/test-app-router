import { Metadata } from "next";
import { GamingLaptops } from "@pages";

export async function generateMetadata(params: any): Promise<Metadata> {
  return {
    title: "Gaming Laptops - Evetech",
    description:
      "Discover the ultimate gaming experience with Evetech's collection of high-performance gaming laptops. Explore powerful processors, cutting-edge graphics, and immersive features for your gaming adventures.",
    keywords:
      "gaming laptops, gaming notebooks, high-performance gaming, Evetech gaming devices",
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title: "Gaming Laptops - Evetech",
      description:
        "Level up your gaming experience with Evetech's range of gaming laptops. Explore top-notch processors, advanced graphics, and immersive features designed for gaming enthusiasts.",
      url: "https://www.evetech.co.za/gaming-laptops.aspx",
      images: [
        {
          url: "https://www.evetech.co.za/repository/ProductImages/Gaming-Laptop-Page-Header-980px-v2.jpg",
          width: 1200,
          height: 630,
          alt: "Gaming Laptops - Evetech",
        },
      ],
    },
  };
}

const GamingLaptopsPage = () => {
  return <GamingLaptops />;
};

export default GamingLaptopsPage;
