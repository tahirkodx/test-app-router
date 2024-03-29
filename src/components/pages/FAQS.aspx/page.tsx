"use client";
import { ComponentsHeader } from "@/components/Home";
import Head from "next/head";
import React, { useState } from "react";
import { useEffect } from "react";
import parse from "html-react-parser";
import { CmsAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import styles from "@/styles/OrderingInfo.module.scss";

const FAQs = () => {
  const [FaqsHtml, setFaqsHtml] = useState("");
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const getFaqsHtml = async () => {
    const newData = await CmsAPI.getFaqs();
    if (newData) {
      setFaqsHtml(newData.result);
    }
  };

  useEffect(() => {
    getFaqsHtml();
  }, [FaqsHtml]);

  return (
    <>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      {/* {FaqsHtml ? (
        <main
          className={`
            pt-3 px-3 pt-lg-5 pb-5
          `}
        >
          {parse(FaqsHtml)}
        </main>
      ) : null} */}
      {FaqsHtml ? (
        <main
          className={`
            pt-3 px-3 pt-lg-5 pb-5
            ${darkMode ? `evetechDark ${styles.MainDark}` : ``}
            ${darkMode ? `bg-black text-light` : ``}
          `}
        >
          {parse(FaqsHtml)}
        </main>
      ) : null}
    </>
  );
};

export default FAQs;
