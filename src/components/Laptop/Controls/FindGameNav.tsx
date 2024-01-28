import React from "react";
import styles from "@/styles/FindGaming.module.scss";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const FindGameNav = (props: any) => {
  const isChoose = props.isChoose;
  const { isDarkMode } = useTheme();

  return (
    <>
      <div
        className={`
          ${styles.NavBar} 
          bg-dark rounded-top mx-auto position-sticky
        `}
      >
        <div
          className={`
            ${styles.NavPill} 
            rounded-pill position-absolute d-flex justify-content-center overflow-hidden dark-text start-50 translate-middle border border-danger
          `}
        >
          <Link
            title="Find Gaming Laptops"
            href="/mobile/Find-Gaming-laptops.aspx"
            className={`${styles.PillLink} ${styles.On} order-2 position-relative text-decoration-none text-dark`}
          >
            <div
              className={`${styles.PillLink__rect} d-flex align-items-center fw-2 px-4`}
            >
              <small>
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/fps-header-logo.png"
                  alt=""
                />{" "}
                Laptops
              </small>
            </div>
          </Link>
        </div>
      </div>

      {/* <>
  <div
    className={`${styles.NavBar} bg-dark rounded-top mx-auto position-sticky`}
  >
    <div
      className={`${styles.NavPill} rounded-pill position-absolute d-flex justify-content-center overflow-hidden dark-text start-50 translate-middle`}
    >
      <div
        className={`${styles.PillLink} ${
          isChoose === "yes" ? styles.Off : styles.On
        } order-2 position-relative`}
      >
        <div
          className={`${styles.PillLink__sqr2} h-100 position-absolute start-0`}
        ></div>
        <div
          className={`${styles.PillLink__rect} d-flex align-items-center pe-nne`}
        >
          <small>PCs</small>
        </div>
        <div className={`${styles.PillLink__sqr}`}></div>
      </div>
      <div
        className={`${styles.PillLink} ${styles.On} order-1 position-relative`}
      >
        <div className={`${styles.PillLink__rect} d-flex align-items-center`}>
          <small>Games</small>
        </div>
        <span
          className={`${styles.PillLink__darkTri} position-absolute top-50 translate-middle`}
        ></span>
        <div
          className={`${styles.PillLink__tri} position-absolute top-0 end-0`}
        ></div>
      </div>
    </div>
  </div>
</>; */}
    </>
  );
};

export default FindGameNav;
