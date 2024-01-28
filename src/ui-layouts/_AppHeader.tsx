"use client";
import React, { useContext, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import styles from "@/styles/Header.module.scss";
import HeaderContext from "@/store/header-context";
import { FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import HeaderElements from "@/ui-layouts/_HeaderElement";
import { useTheme } from "@/store/ThemeContext";

// const HeaderElements = React.lazy(() => import("./HeaderElements"));
const FindLaptop = React.lazy(() => import("@/ui-layouts/_FindLaptop"));

const AppHeader = (props: any) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const headerCtx = useContext(HeaderContext);

  const [isInitHeaderFetched, setIsInitHeaderFetched] = useState(false);

  useEffect(() => {
    const storedHeader: any = localStorage.getItem("header_ctx");
    const header = storedHeader !== null ? JSON.parse(storedHeader) : null;
    if (header) {
      headerCtx.onHeaderSet(header);
    }
    setIsInitHeaderFetched(true);
  }, []);

  useEffect(() => {
    if (isInitHeaderFetched) {
      localStorage.setItem("header_ctx", JSON.stringify(headerCtx));
    }
  }, [headerCtx.isLaptop]);

  return (
    <div
      className={`
        ${styles.Header} 
        ${
          headerCtx && headerCtx.isLaptop
            ? styles.LaptopHeader
            : styles.ComponentHeader
        } 
        position-relative
      `}
    >
      <div
        className={`${styles.Background} ${darkMode ? styles.darkMode : ``}`}
      ></div>
      <div
        className={`${styles.TopBar} ${
          headerCtx && headerCtx.isLaptop
            ? styles.LaptopTopBar
            : styles.ComponentTopBar
        } p-2 px-3`}
      >
        <Stack
          direction="horizontal"
          gap={3}
          style={{ width: "100%" }}
          className=""
        >
          <HeaderElements />
          {headerCtx.isLaptop ? <FindLaptop /> : null}
          {!headerCtx.isLaptop ? (
            <div
              className={`
                ${styles.FindLaptopButton} 
                ${darkMode ? styles.darkMode : ``} 
                px-3 rounded-pill d-flex pe-auto
              `}
            >
              <Stack
                direction="horizontal"
                gap={2}
                className={`${styles.FindLaptopButton__Content}`}
                onClick={() => {
                  router.push("/specials.aspx");
                }}
              >
                <FaStar className="d-none d-sm-block" />
                SPECIALS
              </Stack>
            </div>
          ) : null}
        </Stack>
      </div>
    </div>
  );
};

export default AppHeader;
