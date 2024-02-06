import { Metadata } from "next";
import { Contact } from "@pages";

export async function generateMetadata(params: any): Promise<Metadata> {
  return {
    title: "Contact Us - Evetech",
    description:
      "Get in touch with Evetech's support team. Contact us for inquiries, assistance, or any other questions.",
    keywords: "contact us, Evetech support, customer service, inquiries",
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title:
        "Contact Evetech Custom built Computers - Buy cheap computers & discount gaming PCs",
      description:
        "Connect with Evetech's support team for any inquiries or assistance. We are here to help.",
      url: "https://www.evetech.co.za/contact.aspx",
      images: [
        {
          url: "https://www.evetech.co.za/repository/ProductImages/contact-evetech-helpdesk-880px.png",
          width: 1200,
          height: 630,
          alt: "Contact Evetech Custom built Computers - Buy cheap computers & discount gaming PCs",
        },
      ],
    },
  };
}

const ContactUS = () => {
  return <Contact />;
};

export default ContactUS;
