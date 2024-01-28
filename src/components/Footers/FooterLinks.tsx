"use client";
import { useState } from "react";
import styles from "@/styles/AppFooter.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

import React from "react";

import {
  Container,
  Accordion,
  Nav,
  NavDropdown,
  Col,
  Row,
} from "react-bootstrap";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";
// import { FetchReactInfo } from "../util/Helper";
import { nanoid } from "nanoid";
import { CmsAPI } from "@actions";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const _ = require("lodash");
function FooterLinks() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [FooterMenu, setFooterMenu] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 7 });

        if (data.result !== undefined) {
          setFooterMenu(data.result);
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [FooterLinks]:",
          error.message
        );
      }
    };

    fetchFooterMenu();
  }, []);

  useEffect(() => {}, [FooterMenu]);

  return (
    <>
      {/* <div id={styles.FooterLinks}> */}
      <Container fluid className="p-0">
        {!isDesktop && (
          <>
            <h2 className={`${styles.Heading}`}>Page Links</h2>
            <Accordion className={`${styles.PageMobileLinks}`}>
              {loader && <Spinner />}
              {FooterMenu !== undefined &&
                FooterMenu.length > 0 &&
                FooterMenu.map((Section: any, index: number) => {
                  return (
                    <Accordion.Item
                      key={nanoid(3)}
                      eventKey={`${index}`}
                      className={`${styles.PageMobileLink}`}
                    >
                      <Accordion.Header
                        className={`${styles.MobileLinkHeader}`}
                      >
                        {Section.heading}
                      </Accordion.Header>
                      <Accordion.Body
                        className={`${styles.PageSubLinks} px-3 pb-2 pt-3`}
                      >
                        <Nav>
                          {Section.links.map((link: any, index: number) => {
                            return (
                              <Nav.Item key={nanoid(4)}>
                                <Nav.Link
                                  href={link.url}
                                  className={`${styles.PageMobilePill} rounded-pill py-1 px-2`}
                                >
                                  {link.text}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
            </Accordion>
          </>
        )}

        {/* {isDesktop && (
          <>
            <div className={`${styles.PageLinks} px-3`}>
              {loader && (
                <>
                  <Spinner />
                  <Spinner />
                  <Spinner />
                  <Spinner />
                  <Spinner />
                  <Spinner />
                </>
              )}
              {FooterMenu !== undefined &&
                FooterMenu.length > 0 &&
                FooterMenu.map((Section: any, index: number) => {
                  return (
                    <div className="py-3" key={nanoid(5)}>
                      <h3 className="h5" style={{ color: "#51c4c4" }}>
                        {Section.heading}
                      </h3>
                      <div className={`${styles.PageSubLinks}`}>
                        {Section.links.map((link: any, index: number) => {
                          return (
                            <NavDropdown.Item key={nanoid(6)} href={link.url}>
                              {link.text}
                            </NavDropdown.Item>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )} */}

        {isDesktop && (
          <>
            {/* <div className={`${styles.PageLinks}`}></div> */}

            <Row>
              {loader && (
                <>
                  <Spinner />
                  <Spinner />
                  <Spinner />
                  <Spinner />
                  <Spinner />
                  <Spinner />
                </>
              )}
              {FooterMenu !== undefined &&
                FooterMenu.length > 0 &&
                FooterMenu.map((Section: any, index: number) => {
                  return (
                    <Col sm={{ span: 4 }} key={nanoid(5)}>
                      <div className="mb-3">
                        <SectionHeading>{Section.heading}</SectionHeading>
                        <div className={`${styles.PageSubLinks}`}>
                          {Section.links.map((link: any, index: number) => {
                            return (
                              <Link
                                key={nanoid(6)}
                                href={link.url}
                                className={`
                                  fsz-0 text-decoration-none d-block mb-1
                                `}
                              >
                                {link.text}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default FooterLinks;
