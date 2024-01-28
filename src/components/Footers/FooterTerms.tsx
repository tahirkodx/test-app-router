"use client";
import styles from "@/styles/AppFooter.module.scss";
import { Image } from "react-bootstrap";

import React from "react";
import Stack from "react-bootstrap/Stack";
import SectionHeading from "./SectionHeading";

function FooterTerms() {
  return (
    <>
      {/* <Stack gap={2} className={`${styles.FooterTerms} mt-3`}>
        <Image
        src="https://www.evetech.co.za/repository/productImages/logo.png"
        alt="Evetech Logo"
        height="40"
        width="162" />
        <p>
          All images appearing on this website are copyright Evetech.co.za. Any
          unauthorized use of its logos and other graphics is forbidden. Prices
          and specifications are subject to change without notice. EVETECH IS
          NOT RESPONSIBLE FOR ANY TYPO, PHOTOGRAPH, OR PROGRAM ERRORS, AND
          RESERVES THE RIGHT TO CANCEL ANY INCORRECT ORDERS. Please Note:
          Product images are for illustrative purposes only and may differ from
          the actual product.
        </p>
      </Stack> */}
      <SectionHeading>Terms & Conditions</SectionHeading>
      <p className={`fsz-0`}>
        All images appearing on this website are copyright Evetech.co.za. Any
        unauthorized use of its logos and other graphics is forbidden. Prices
        and specifications are subject to change without notice. EVETECH IS NOT
        RESPONSIBLE FOR ANY TYPO, PHOTOGRAPH, OR PROGRAM ERRORS, AND RESERVES
        THE RIGHT TO CANCEL ANY INCORRECT ORDERS. Please Note: Product images
        are for illustrative purposes only and may differ from the actual
        product.
      </p>
    </>
  );
}

export default FooterTerms;
