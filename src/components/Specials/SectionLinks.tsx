import { nanoid } from "nanoid";
import React from "react";

import useMediaQuery from "@/custom/hooks/useMediaQuery";
import Link from "next/link";
import { Col } from "react-bootstrap";
import LargeLinks from "./SectionLinks/LargeLinks";
import SmallLinks from "./SectionLinks/SmallLinks";
import { useTheme } from "@/store/ThemeContext";

const SectionLinks = ({ SpecialsDeals, styles }: any) => {
  const isSM = useMediaQuery("(min-width: 576px)");
  const isLG = useMediaQuery("(min-width: 992px)");
  const isHD = useMediaQuery("(min-width: 1921px)");
  // const isXXL = useMediaQuery("(min-width: 1400px)");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const placeholderImg =
    "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

  return (
    <section className={`my-3 my-lg-4 px-3 px-lg-0`}>
      <div
        className={`
    
              ${styles.SectionLinks}
              ${
                isLG
                  ? `${darkMode ? `bg-dark` : `bg-light`} rounded-0`
                  : `rounded`
              }
            `}
      >
        <section className="p-3 py-xxl-5">
          <Col md={{ span: 10, offset: 1 }}>
            <div
              className={`${styles.Components} d-grid cols-3 cols-sm-4 cols-xxl-5 gap-3 gap-xxl-5`}
            >
              {SpecialsDeals.map((Component: any) => {
                return (
                  <Link
                    href={Component.link.replace(
                      "https://www.evetech.co.za",
                      ""
                    )}
                    key={nanoid(4)}
                    title={Component.description}
                    className={`
                          ${styles.HoverGrow} 
                          ${isLG ? `` : `text-center d-grid gap-2`} 
                          text-decoration-none user-select-none cursor-pointer
                        `}
                    style={{ gridAutoRows: isLG ? `auto` : `min-content` }}
                  >
                    {isLG ? (
                      <LargeLinks
                        Component={Component}
                        styles={styles}
                        placeholderImg={placeholderImg}
                        isLG={isLG}
                      />
                    ) : (
                      <SmallLinks
                        Component={Component}
                        styles={styles}
                        placeholderImg={placeholderImg}
                        isLG={isLG}
                        isHD={isHD}
                        isSM={isSM}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </Col>
        </section>
      </div>
    </section>
  );
};

export default SectionLinks;
