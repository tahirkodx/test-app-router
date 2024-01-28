"use client";
import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import styles from "@/styles/AppFooter.module.scss";

import {
  EmailSignUp,
  FooterTerms,
  GoogleMaps,
  ContactDetails,
  SocialLinks,
  LaptopFooterLinks,
} from "@/components/Footers/";
import { useTheme } from "@/store/ThemeContext";

function LaptopFooter() {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <footer
      className={`
        ${styles.LaptopFooter} 
        ${styles.Main} 
        ${darkMode ? styles.darkMode : ``} 
        py-5
      `}
    >
      <Container className="pb-5">
        <Row>
          <Col md={6}>
            <EmailSignUp />
            <FooterTerms />
          </Col>
          <Col md={6}>
            <div className={`${styles.GoogleMaps}`}>
              <GoogleMaps />
            </div>
            <Stack gap={2} className={`mt-2`}>
              <h2 className={`${styles.Heading}`}>Contact Us</h2>
              <div id={`${styles.ContactDetails}`}>
                <ContactDetails />
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
      <LaptopFooterLinks />
      <Container className="pt-5">
        <Stack id={`${styles.SocialLinks}`} className={`mt-2`}>
          <h2 className={`${styles.Heading}`}>Social Links</h2>
          <div className="d-flex flex-wrap justify-content-sm-center gap-2">
            <SocialLinks />
          </div>
        </Stack>
        <div id={`${styles.Copyright}`} className="text-center mt-3">
          Copyright © 2007 - {new Date().getFullYear()} - All rights reserved by
          EVETECH (Pty) Ltd
        </div>
      </Container>
    </footer>
  );
}

export default LaptopFooter;
