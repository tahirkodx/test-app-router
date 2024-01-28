"use client";
import React, { useEffect, useContext, useState } from "react";
import styles from "@/styles/Header.module.scss";
import { Stack, Navbar, Nav, NavDropdown, Row, Image } from "react-bootstrap";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import NoticeBoard from "@/components/NoticeBoard";
import HeaderContext from "@/store/header-context";
import { nanoid } from "nanoid";
import { CmsAPI } from "@actions";
import { useTheme } from "@/store/ThemeContext";
// import { Image } from "react-bootstrap";
// import CommonContext from "@/store/common-context";

function LaptopHeader() {
  const isSM = useMediaQuery("(min-width: 576px)");
  const isBig = useMediaQuery("(min-width: 1200px)");
  const headerCtx = useContext(HeaderContext);
  const [TopMenu, setTopMenu] = useState([]);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const fetchMenu = async () => {
    try {
      const menuData = await CmsAPI.getReactInfo({ id: 12 });

      if (menuData.result !== undefined) {
        setTopMenu(menuData.result);
      }
    } catch (error: any) {
      console.error(
        "Failed to fetch React Info [ComponentHeader]:",
        error.message
      );
    }
  };

  useEffect(() => {
    headerCtx.onHeaderSet({ isLaptop: true });
    fetchMenu();
  }, []);

  useEffect(() => {}, [TopMenu]);

  return (
    <>
      <Navbar
        bg={darkMode ? `dark` : `light`}
        expand="xl"
        className={`${styles.NavBar} ${styles.Laptop} ${
          darkMode ? styles.darkMode : ``
        } px-0 py-0 text-light`}
      >
        {!isBig && (
          <div className={`${styles.MobiNav} py-2 px-3`}>
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex justify-content-end"
            >
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className={`${styles.MobiNav__Toggle} pe-auto px-0`}
              />
            </Stack>
          </div>
        )}

        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`${styles.Collapse} ${!isBig ? "px-3" : null} ${
            darkMode ? `text-light` : ``
          }`}
          style={{ backgroundColor: darkMode ? `#171717` : `` }}
        >
          <Nav className={isBig && `justify-content-evenly w-100`}>
            {TopMenu !== undefined &&
              TopMenu.length > 0 &&
              TopMenu.map((Section: any) => {
                return (
                  <div key={nanoid(4)}>
                    {Section.type === "link" && (
                      <Nav.Link
                        key={nanoid(3)}
                        href={Section.link}
                        style={{
                          color:
                            Section.color !== undefined
                              ? darkMode
                                ? Section.colorDark
                                : Section.color
                              : darkMode
                              ? `white`
                              : `black`,
                        }}
                        className="h-100"
                      >
                        <div
                          style={{ display: "inline-block" }}
                          className="h-100 d-flex align-items-center"
                        >
                          {isBig &&
                          Section.logo !== undefined &&
                          Section.logo.trim().length > 0 ? (
                            <Image
                              src={darkMode ? Section.logoDark : Section.logo}
                              alt={Section.title}
                              width={Section.logoWidth}
                              height={Section.logoHeight}
                              className="object-contain"
                              style={{ maxHeight: "20px" }}
                            />
                          ) : (
                            <span
                              className={`${styles.SectionLink} h-100 fw-2`}
                            >
                              {Section.title}
                            </span>
                          )}
                        </div>
                      </Nav.Link>
                    )}

                    {Section.type === "dropdown" && (
                      <NavDropdown
                        key={nanoid(3)}
                        title={
                          isBig &&
                          Section.logo !== undefined &&
                          Section.logo.trim().length > 0 ? (
                            <Image
                              src={darkMode ? Section.logoDark : Section.logo}
                              alt={Section.title}
                              width={Section.logoWidth}
                              height={Section.logoHeight}
                              className="object-contain"
                              style={{ maxHeight: "20px" }}
                            />
                          ) : (
                            <span
                              style={{
                                color:
                                  Section.color !== undefined
                                    ? darkMode
                                      ? Section.colorDark
                                      : Section.color
                                    : darkMode
                                    ? `white`
                                    : `black`,
                              }}
                              className={`${styles.SectionLink} h-100`}
                            >
                              {Section.title}
                            </span>
                          )
                        }
                        id={Section.title}
                        className={`${styles.Laptop} ${styles.DropDown} h-100 fw-2`}
                      >
                        <Row
                          className={`${styles.DropDown__Content} mx-2 mx-lg-3 my-lg-2`}
                        >
                          {Section.dropdown.map((Item: any) => {
                            return (
                              <React.Fragment key={nanoid(4)}>
                                <div className="py-3 rounded" key={nanoid(4)}>
                                  <Image
                                    src={Item.img}
                                    alt={`` + Item.alt}
                                    width={Item.logoWidth}
                                    height={Item.logoHeight}
                                    className="object-contain"
                                  />
                                </div>
                                {isBig && (
                                  <React.Fragment key={nanoid(4)}>
                                    {Item.sections.map((SubSection: any) => {
                                      return (
                                        <div
                                          className={`${styles.DropDown__SubSection} py-3 rounded`}
                                          key={nanoid(4)}
                                        >
                                          <h2 className="h5 px-3 fs-6">
                                            {SubSection.heading}
                                          </h2>
                                          <div>
                                            {SubSection.links.map(
                                              (SectionLink: any) => {
                                                return (
                                                  <NavDropdown.Item
                                                    key={nanoid(4)}
                                                    href={SectionLink.url}
                                                    className={`${styles.DropDown__SubLinks}`}
                                                  >
                                                    {SectionLink.text}
                                                  </NavDropdown.Item>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </React.Fragment>
                                )}
                                {!isBig && (
                                  <React.Fragment>
                                    {Item.sections.map((SubSection: any) => {
                                      return (
                                        <NavDropdown
                                          key={nanoid(4)}
                                          title={SubSection.heading}
                                          id={SubSection.heading}
                                          className="px-2 pt-1"
                                        >
                                          <div>
                                            {SubSection.links.map(
                                              (SectionLink: any) => {
                                                return (
                                                  <NavDropdown.Item
                                                    key={nanoid(4)}
                                                    href={SectionLink.url}
                                                    className={`${styles.MobileDropdownLinks} text-wrap`}
                                                  >
                                                    {SectionLink.text}
                                                  </NavDropdown.Item>
                                                );
                                              }
                                            )}
                                          </div>
                                        </NavDropdown>
                                      );
                                    })}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </Row>
                      </NavDropdown>
                    )}
                  </div>
                );
              })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <NoticeBoard />
    </>
  );
}

export default LaptopHeader;
