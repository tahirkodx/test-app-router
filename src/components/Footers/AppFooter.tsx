import styles from "@/styles/AppFooter.module.scss";

import {
  EmailSignUp,
  FooterTerms,
  FooterLinks,
  GoogleMaps,
  ContactDetails,
  SocialLinks,
} from "@/components/Footers";

import React from "react";
import { Button, Col, Container, Image, Row, Stack } from "react-bootstrap";
import Heading from "../Heading";
import Text from "../Text";
import {
  FaCcMastercard,
  FaCcVisa,
  FaCheckDouble,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { FaShield } from "react-icons/fa6";
import { BiSolidCheckShield } from "react-icons/bi";
import Brands from "./Brands";
import SecurePayment from "./SecurePayment";
import { FiMapPin } from "react-icons/fi";

function AppFooter() {
  return (
    <footer className={`${styles.Main} py-5`}>
      <Container fluid>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Row>
              <Col md={6} lg={3}>
                <SectionHeading>Opening Times</SectionHeading>
                <Container
                  fluid
                  className="p-0 m-0"
                  style={{ maxWidth: "250px" }}
                >
                  <Row className={`fsz-1 p-0 mb-1`}>
                    <Col>Monday-Friday</Col>
                    <Col>8 am–5 pm</Col>
                  </Row>
                  <Row className={`fsz-1 p-0 mb-1`}>
                    <Col>Saturday</Col>
                    <Col>9 am–12 pm</Col>
                  </Row>
                  <Row className={`fsz-1 p-0`}>
                    <Col>Sunday</Col>
                    <Col>Closed</Col>
                  </Row>
                </Container>
              </Col>
              <Col md={6} lg={3}>
                <SectionHeading>Join Our Community</SectionHeading>
                <div className="d-flex flex-wrap gap-2">
                  <SocialLinks />
                </div>
              </Col>
              <Col md={6} lg={3}>
                <SectionHeading>Stay up to date</SectionHeading>
                <EmailSignUp />
              </Col>
              <Col md={6} lg={3}>
                <SectionHeading>Contact us</SectionHeading>
                <ContactDetails />
                {/* <Link href="/contact-us" title="Contact Evetech">
                  <Button className="rounded-pill">
                    <FaEnvelope /> Contact Us
                  </Button>
                </Link> */}
              </Col>
            </Row>
            <hr className={`bg-light`}></hr>
            <Row>
              <Col md={6}>
                <FooterLinks />
              </Col>
              <Col md={6}>
                <Row className={`mb-2`}>
                  <div
                    className={`${styles.GoogleMaps} mb-2 rounded overflow-hidden`}
                  >
                    <GoogleMaps />
                  </div>
                  <Row>
                    <Col xs={2} sm={1}>
                      <FiMapPin />
                    </Col>
                    <Col xs={10} sm={11}>
                      <p className="m-0 fsz-1">
                        Limeroc Business Park, Holland Road (R114),
                        Knoppieslaagte, Centurion 0157, Gauteng, South Africa
                      </p>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <SecurePayment />
                </Row>

                <SectionHeading>Proud suppliers of</SectionHeading>
                <Brands />

                <FooterTerms />
                <div id={`${styles.Copyright}`} className="mt-3 fsz-1">
                  Copyright © 2007 - {new Date().getFullYear()} - All rights
                  reserved by EVETECH (Pty) Ltd
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* <Container className="pb-5">
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
      <FooterLinks />
      <Container className="py-5">
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
      </Container> */}
    </footer>
  );
}

export default AppFooter;
