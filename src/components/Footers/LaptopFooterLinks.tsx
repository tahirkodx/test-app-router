"use client";
import React from "react";
import { Container, Accordion, Nav, NavDropdown } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import styles from "@/styles/AppFooter.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
// import { FetchReactInfo } from "../util/Helper";
import { nanoid } from "nanoid";
import { CmsAPI } from "@actions";

const _ = require("lodash");
function LaptopFooterLinks() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [FooterMenu, setFooterMenu] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 13 });

        if (data.result !== undefined) {
          setFooterMenu(data.result);
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [LaptopFooterLinks]:",
          error.message
        );
      }
    };

    fetchFooterMenu();
  }, []);

  useEffect(() => {}, [FooterMenu]);

  return (
    <>
      <div id={styles.FooterLinks}>
        {!isDesktop && (
          <>
            <Container>
              <h2 className={`${styles.Heading}`}>Page Links</h2>
              <Accordion className={`${styles.PageMobileLinks}`}>
                {FooterMenu !== undefined &&
                  FooterMenu.length > 0 &&
                  FooterMenu.map((Section: any, index: number) => {
                    return (
                      <Accordion.Item
                        key={nanoid(4)}
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
                                <Nav.Item key={nanoid(5)}>
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
            </Container>
          </>
        )}

        {isDesktop && (
          <>
            <div className={`${styles.PageLinks} px-3`}>
              {FooterMenu !== undefined &&
                FooterMenu.length > 0 &&
                FooterMenu.map((Section: any, index: number) => {
                  return (
                    <div className="py-3" key={nanoid(6)}>
                      <h3 className="h5">{Section.heading}</h3>
                      <div className={`${styles.PageSubLinks}`}>
                        {Section.links.map((link: any, index: number) => {
                          return (
                            <NavDropdown.Item key={nanoid(7)} href={link.url}>
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
        )}
      </div>
    </>
  );
}

export default LaptopFooterLinks;
