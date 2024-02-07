import { Metadata } from "next";
import { Contact } from "@pages";

export async function generateMetadata(params: any): Promise<Metadata> {
  return {
    title: "Secure online credit shopping at Evetech",
    description:
      "Learn about Evetech's robust credit card security measures. Read our guidelines to ensure a safe and secure online shopping experience.",
    keywords:
      "credit card security, online payment safety, secure transactions, Evetech payment security",
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title: "Secure online credit shopping at Evetech",
      description:
        "Discover Evetech's commitment to ensuring the security of your credit card information. Follow our guidelines for safe and secure online transactions.",
      url: "https://www.evetech.co.za/Credit-Card-Security.aspx",
      images: [
        {
          url: "https://www.evetech.co.za/repository/ProductImages/Visa-service_desc_img_head.jpg",
          width: 1200,
          height: 630,
          alt: "Secure online credit shopping at Evetech",
        },
      ],
    },
  };
}

const CreditCardSecurityInfo = () => {
  return <Contact />;
};

export default CreditCardSecurityInfo;
