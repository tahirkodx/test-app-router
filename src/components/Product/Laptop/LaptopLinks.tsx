import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { customAlphabet } from "nanoid";
import styles from "@/styles/LaptopDetail.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/store/ThemeContext";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const LaptopLinks = (props: any) => {
  const [links, setLinks] = useState(props.links);
  // const brand = props.brand;
  const actProductId = props.ProductId;
  const urlTitle = props.UrlTitle;
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const btnLinkClick = (pid: any) => {
    router.push(
      `/${_.replace(
        _.toLower(urlTitle),
        new RegExp(" ", "g"),
        "-"
      ).trim()}/laptops-for-sale/${pid}.aspx`
    );
  };

  useEffect(() => {}, [props.links]);

  return (
    links.length > 0 && (
      <Card
        className={`
          mt-2 p-0
          ${darkMode ? `bg-black text-light` : ``}
        `}
      >
        <Card.Header
          className={`${styles.UpgradeCard} fw-3 d-flex justify-content-between p-2 gap-2 pb-0 border-0`}
        >
          <div className={`${styles.UpgradeHeading}`}>
            <div>Upgrade Laptop:</div>
          </div>
        </Card.Header>
        <Card.Body className={`${styles.UpgradeOptions} p-2`}>
          <span className={`d-flex gap-2 flex-wrap justify-content-center`}>
            {links.map((link: any, ind: any) => {
              return (
                <span
                  key={nanoid(4)}
                  className={`p-0 text-center ${styles.UpgradeLinkWrapper}`}
                >
                  <Button
                    title={link.title}
                    onClick={() => btnLinkClick(link.pid)}
                    className={`${styles.UpgradeLink} ${
                      parseInt(link.pid) === parseInt(actProductId)
                        ? ` btn-danger`
                        : ` ${
                            darkMode
                              ? `btn-dark text-light border-secondary border-oppacity-10`
                              : `btn-light border-danger`
                          }`
                    } p-1 p-md-2 px-2`}
                  >
                    {link.title}
                  </Button>
                </span>
              );
            })}
          </span>
        </Card.Body>
      </Card>
    )
  );
};

export default LaptopLinks;
