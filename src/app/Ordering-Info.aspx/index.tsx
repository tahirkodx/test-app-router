import { ComponentsHeader } from "@/components/Home";
import { CmsAPI } from "@/custom/utils/actions";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import parse from "html-react-parser";
import { useTheme } from "@/store/ThemeContext";
import styles from "@/styles/OrderingInfo.module.scss";

const Home = () => {
  const [OrderInfo, setOrderInfo] = useState("");
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const getOrderInfo = async () => {
    const newData = await CmsAPI.getOrderInfo();
    if (newData) {
      setOrderInfo(newData.result);
    }
  };

  useEffect(() => {
    getOrderInfo();
  }, [OrderInfo]);

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Ordering Information on Evetech.co.za - Cheapest Home and Offices,
          Gaming PCs in South Africa
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/Ordering-Info.aspx"
        />
        {/* <meta
            name="description"
            content="Buy cheap computers & discount gaming PCs in South Africa"
            /> */}
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Head>

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <div
        className={`
          ${darkMode ? `evetechDark bg-black text-white` : ``}
          position-relative
        `}
      >
        {" "}
        <main className="pt-3 px-3 pt-lg-5 pb-5 bg-opacity-25 bg-secondary">
          <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
            <Card
              className={`
                shadow p-3 p-lg-5
                ${darkMode ? styles.MainDark : ``}
                ${darkMode ? `bg-black text-light` : ``}
              `}
            >
              {OrderInfo ? parse(OrderInfo) : null}
            </Card>
          </Col>
        </main>
      </div>
    </>
  );
};

export default Home;
