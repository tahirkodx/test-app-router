import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import styles from "@/styles/BreadCrumbs.module.scss";
import Text from "../Text";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";

var _ = require("lodash");

const BreadCrumbs = (props: any) => {
  const [pageCrumbs, setPageCrumbs] = useState(props.PageCrumbs);
  const [isHideMobile, setIsHideMobile] = useState(
    props.hideMobile !== undefined ? props.hideMobile : false
  );

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {}, [props.PageCrumbs]);
  return (
    <div
      className={`
        ${isHideMobile ? "d-none d-sm-block" : ""}
        ${props.className}
      `}
    >
      {pageCrumbs !== undefined &&
        _.map(pageCrumbs, (pcrumb) => {
          return (
            <Text key={nanoid(6)} className={`px-2 px-sm-3 pt-3 m-0`}>
              <span
                className={`${styles.TextBreadCrumbs} d-flex flex-row-reverse justify-content-end flex-wrap gap-1`}
              >
                {pcrumb.crumbs.map((Bread) => {
                  return (
                    <div
                      className={`${styles.Crumb} d-flex gap-1`}
                      key={nanoid(3)}
                    >
                      <Link
                        href={Bread.link}
                        className={`${styles.Link} f-12 ${
                          darkMode ? `text-light` : `text-dark`
                        } d-flex`}
                      >
                        <div>{Bread.title}</div>
                      </Link>
                      <span className={`${styles.Arrow}`}>{">"}</span>
                    </div>
                  );
                })}
              </span>
            </Text>
          );
        })}
    </div>
  );
};

export default BreadCrumbs;
