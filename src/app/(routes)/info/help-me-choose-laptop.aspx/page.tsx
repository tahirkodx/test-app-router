import { Metadata } from "next";
import { HelpMeChooseLaptop } from "@pages";

export async function generateMetadata(params: any): Promise<Metadata> {
  return {
    title: "Help Me Choose a Laptop - Evetech",
    description:
      "Explore Evetech's guide to choosing the perfect laptop. Find helpful tips, comparisons, and recommendations to make an informed decision on your next laptop purchase.",
    keywords:
      "help me choose a laptop, laptop buying guide, Evetech laptop recommendations, laptop comparison",
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title: "Help Me Choose a Laptop - Evetech",
      description:
        "Navigate through Evetech's comprehensive guide to choosing the right laptop for your needs. Get valuable tips, product comparisons, and personalized recommendations to make an informed laptop purchase.",
      url: "https://www.evetech.co.za/info/help-me-choose-laptop.aspx",
      images: [
        {
          url: "https://www.evetech.co.za/repository/ProductImages/everyday-laptops.png",
          width: 200,
          height: 200,
          alt: "everyday laptops",
        },
        {
          url: "https://www.evetech.co.za/repository/ProductImages/entertainment-laptops.png",
          width: 200,
          height: 200,
          alt: "entertainment laptops",
        },
        {
          url: "https://www.evetech.co.za/repository/ProductImages/proffesional-laptops.png",
          width: 200,
          height: 200,
          alt: "professional laptops",
        },
        {
          url: "https://www.evetech.co.za/repository/ProductImages/gaming-laptops.png",
          width: 200,
          height: 200,
          alt: "gaming laptops",
        },
        {
          url: "https://www.evetech.co.za/repository/ProductImages/on-the-go-laptops.png",
          width: 200,
          height: 200,
          alt: "On the Go laptops",
        },
      ],
    },
  };
}

const HelpMeChooseLaptopPage = () => {
  return <HelpMeChooseLaptop />;
};

export default HelpMeChooseLaptopPage;
