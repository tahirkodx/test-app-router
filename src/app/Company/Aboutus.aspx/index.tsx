import { ComponentsHeader } from "@/components/Home";
import { CmsAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import HTMLReactParser from "html-react-parser";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [aboutHtml, setAboutHtml] = useState("");
  const [loader, setLoader] = useState(true);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();

  const getAboutHtml = async () => {
    try {
      const data = await CmsAPI.getReactInfo({ id: 23 });

      if (data.result !== undefined) {
        setAboutHtml(data.result.aboutus);
        setLoader(false);
      }
    } catch (error: any) {
      console.error("Failed to fetch React Info [About Us]:", error.message);
    }
  };

  useEffect(() => {
    getAboutHtml();
  }, []);
  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          About Us Custom built Computers - Buy cheap computers & discount
          gaming PCs
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/Company/Aboutus.aspx"
        />
      </Head>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      {aboutHtml ? (
        <main
          className={`${
            isDarkMode ? `evetechDark bg-dark text-light` : ``
          } pt-3 px-3 pt-lg-5 pb-5`}
        >
          {HTMLReactParser(aboutHtml)}
        </main>
      ) : null}
    </>
  );
};

export default Home;
