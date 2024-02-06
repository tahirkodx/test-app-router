import { Metadata } from "next";
import { GamingLaptops, Jobs } from "@pages";

export async function generateMetadata(params: any): Promise<Metadata> {
  return {
    title: "Careers - Join the Evetech Team",
    description:
      "Explore exciting career opportunities at Evetech. Join a dynamic team passionate about technology and innovation. Check our current job openings and start your journey with us.",
    keywords:
      "careers, job opportunities, employment, join Evetech, technology jobs",
    openGraph: {
      locale: "en_ZA",
      type: "article",
      siteName: "Evetech",
      title: "Careers - Join the Evetech Team",
      description:
        "Discover rewarding career opportunities at Evetech. We're looking for talented individuals to join our dynamic team. Explore our current job openings and start your journey with us.",
      url: "https://www.evetech.co.za/jobs.aspx",
      images: [
        {
          url: "https://www.evetech.co.za/repository/ProductImages/Evetech-is-hiring-pc.jpg",
          width: 1200,
          height: 630,
          alt: "Careers - Join the Evetech Team",
        },
      ],
    },
  };
}

const JobsPage = () => {
  return <Jobs />;
};

export default JobsPage;
