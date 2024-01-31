import React, { useState } from "react";
import { ComponentsHeader } from "@/components/Home";
import { Card, Col } from "react-bootstrap";
import { useEffect } from "react";
import parse from "html-react-parser";
import styles from "@/styles/TermsAndConditions.module.scss";
import { CmsAPI } from "@/custom/utils/actions";
import Head from "next/head";
import { useTheme } from "@/store/ThemeContext";

const Home = () => {
  const [TermsConditions, setTermsConditions] = useState("");
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const getTermsConditions = async () => {
    const newData = await CmsAPI.getTermsConditions();
    if (newData) {
      setTermsConditions(newData.result);
    }
  };

  useEffect(() => {
    getTermsConditions();
  }, [TermsConditions]);

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Terms & Conditions Custom built Computers - Buy cheap computers &
          discount gaming PCs
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/Company/Terms-and-Conditions.aspx"
        />
        {/* <meta name="description" content={category.MetaDescription} />
        <meta name="keywords" content={category.keyword} /> */}
      </Head>

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <div
        className={`
          position-relative z-index-1
          ${darkMode ? `evetechDark bg-black text-light` : ``}
        `}
      >
        <main
          className={`
            pt-3 px-3 pt-lg-5 pb-5 bg-opacity-25 bg-gradient bg-secondary
          `}
        >
          <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
            <Card
              className={`
                ${darkMode ? `bg-black text-light` : ``}
                shadow p-3 p-lg-5
              `}
            >
              <div className={`${styles.TermsAndConditions}`}>
                {TermsConditions ? parse(TermsConditions) : null}
              </div>
            </Card>
          </Col>
        </main>
      </div>
    </>
  );
};

export default Home;
