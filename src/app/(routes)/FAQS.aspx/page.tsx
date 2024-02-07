import { Metadata } from "next";
import { FAQS } from "@pages";

export async function generateMetadata(params: any): Promise<Metadata> {
  return {
    title:
      "FAQ Custom built Computers - Buy cheap computers & discount gaming PCs",
    description:
      "Find answers to commonly asked questions about Evetech's products, services, and policies. Browse through our FAQ section for helpful information.",
    keywords: "frequently asked questions, FAQ, Evetech help, customer support",
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title:
        "FAQ Custom built Computers - Buy cheap computers & discount gaming PCs",
      description:
        "Explore our FAQ section to get answers to commonly asked questions about Evetech's products, services, and policies. Our comprehensive guide provides helpful information for a better understanding.",
      url: "https://www.evetech.co.za/FAQS.aspx",
      images: [
        {
          url: "https://www.evetech.co.za/images/faq-banner.jpg",
          width: 1200,
          height: 630,
          alt: "FAQ Custom built Computers - Buy cheap computers & discount gaming PCs",
        },
      ],
    },
  };
}

const FrequentlyAskedQuestions = () => {
  return <FAQS />;
};

export default FrequentlyAskedQuestions;
