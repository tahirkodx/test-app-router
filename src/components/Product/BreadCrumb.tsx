import React, { useState } from "react";
import { nanoid } from "nanoid";
import styles from "@/styles/BreadCrumbs.module.scss";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");

const BreadCrumb = (props: any) => {
  let pageCrumbs = props.PageCrumbs;
  const { isDarkMode } = useTheme();

  return (
    <div>
      <nav
        aria-label="breadcrumb"
        className={`my-2 rounded ${styles.BreadCrumbs} ${
          isDarkMode ? styles.Dark : styles.Light
        }}`}
      >
        <ol className={`breadcrumb`}>
          {_.orderBy(pageCrumbs, ["stage"], ["desc"]).map(
            (Bread: any, index: any) => {
              if (Bread?.title && Bread.title.trim().length > 0)
                return (
                  <li className={`breadcrumb-item ps-0`} key={nanoid(3)}>
                    <a href={Bread.link}>
                      <div>{Bread.title}</div>
                    </a>
                  </li>
                );
            }
          )}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
