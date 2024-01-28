"use client";
import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/Header.module.scss";
import { Stack, Navbar, Nav, NavDropdown, Row, Image } from "react-bootstrap";

import useMediaQuery from "@/custom/hooks/useMediaQuery";
import NoticeBoard from "@/components/NoticeBoard";
import HeaderContext from "@/store/header-context";
import { nanoid } from "nanoid";
import { CmsAPI } from "@actions";
import * as _ from "lodash";

function MenuHeader(props: any) {
  const isBig: any = useMediaQuery("(min-width: 1200px)");
  const headerCtx = useContext(HeaderContext);
  const [TopMenu, setTopMenu] = useState([]);

  const fetchTiles = async () => {
    try {
      const menuData = await CmsAPI.getReactInfo({ id: 3 });
      if (menuData.result !== undefined) {
        setTopMenu(menuData.result);
      }
    } catch (error: any) {
      console.error("Failed to fetch React Info [Menu Header]:", error.message);
    }
  };

  useEffect(() => {
    headerCtx.onHeaderSet({ isLaptop: false });
    // if (TopMenu.length <= 0) {
    fetchTiles();
    // }
  }, []);

  // useEffect(() => {}, [TopMenu]);

  return (
    <>
      <Navbar
        bg="light"
        expand="xl"
        className={`${styles.NavBar} px-0 py-0 text-light`}
      >
        {!isBig && (
          <div className={`${styles.MobiNav} py-2 px-3`}>
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex justify-content-end"
            >
              <Navbar.Toggle
                aria-controls="basic-navbar-nav "
                className={`${styles.MobiNav__Toggle} pe-auto px-0`}
              />
            </Stack>
          </div>
        )}

        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`${styles.Collapse} ${!isBig ? "px-3" : null}`}
        >
          <Nav className={isBig && `justify-content-evenly w-100`} navbarScroll>
            {TopMenu !== undefined &&
              TopMenu.length > 0 &&
              TopMenu.map((Section: any, index: number) => {
                return (
                  <div key={nanoid(4)}>
                    {Section.type === "link" && (
                      <Nav.Link
                        key={nanoid(3)}
                        href={Section.link ? Section.link : ""}
                      >
                        {
                          <div style={{ display: "inline-block" }}>
                            {isBig &&
                            Section.logo !== undefined &&
                            Section.logo.trim().length > 0 ? (
                              <Image
                                src={Section.logo}
                                alt={Section.title}
                                width={Section.logoWidth}
                                height={Section.logoHeight}
                                fluid
                              />
                            ) : (
                              <span
                                style={{
                                  color:
                                    Section.color !== undefined
                                      ? Section.color
                                      : "black",
                                }}
                                className={`${styles.SectionLink} fw-2`}
                              >
                                {Section.title}
                              </span>
                            )}
                          </div>
                        }
                      </Nav.Link>
                    )}
                    {Section.type === "dropdown" && (
                      <NavDropdown
                        key={nanoid(5)}
                        title={
                          <div style={{ display: "inline-block" }}>
                            {isBig &&
                            Section.logo !== undefined &&
                            Section.logo.trim().length > 0 ? (
                              <Image
                                src={Section.logo}
                                alt={Section.title}
                                width={Section.logoWidth}
                                height={Section.logoHeight}
                                fluid
                              />
                            ) : (
                              <span
                                className={`${styles.DropDown__Toggle} fw-2`}
                                style={{
                                  color:
                                    Section.color !== undefined
                                      ? Section.color
                                      : "black",
                                }}
                              >
                                {Section.title}
                              </span>
                            )}
                          </div>
                        }
                        id={Section.title}
                        className={`${styles.Components} ${styles.DropDown} ${styles.SectionDropdown}`}
                      >
                        <>
                          {Section.dropdown.map((Item: any, index: number) => {
                            return (
                              <Row
                                className={`${styles.DropDown__Content} mx-2 mx-lg-3 my-lg-2`}
                                key={nanoid(6)}
                              >
                                <div className="py-3 rounded">
                                  <Image
                                    src={`https://www.evetech.co.za${Item.img}`}
                                    alt={`` + Item.alt}
                                    width={Item.imageWidth}
                                    height={Item.imageHeight}
                                    className="img-fluid section"
                                  />
                                </div>
                                {isBig && (
                                  <>
                                    {Item.sections.map(
                                      (SubSection: any, index: number) => {
                                        return (
                                          <div
                                            className={`${styles.DropDown__SubSection} py-3 rounded`}
                                            key={nanoid(7)}
                                          >
                                            <h2 className="h5 px-3 fs-6">
                                              {SubSection.heading}
                                            </h2>
                                            <div>
                                              {SubSection.links.map(
                                                (
                                                  SectionLink: any,
                                                  index: number
                                                ) => {
                                                  return (
                                                    <NavDropdown.Item
                                                      key={nanoid(8)}
                                                      href={
                                                        SectionLink.url
                                                          ? SectionLink.url
                                                          : ""
                                                      }
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
                                      }
                                    )}
                                  </>
                                )}
                                {!isBig && (
                                  <>
                                    {Item.sections.map(
                                      (SubSection: any, index: number) => {
                                        return (
                                          <NavDropdown
                                            key={nanoid(9)}
                                            title={SubSection.heading}
                                            id={SubSection.heading}
                                            className="px-2 pt-1 fs-6"
                                          >
                                            <div>
                                              {SubSection.links.map(
                                                (
                                                  SectionLink: any,
                                                  index: number
                                                ) => {
                                                  return (
                                                    <NavDropdown.Item
                                                      key={nanoid(10)}
                                                      href={
                                                        SectionLink.url
                                                          ? SectionLink.url
                                                          : ""
                                                      }
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
                                      }
                                    )}
                                  </>
                                )}
                              </Row>
                            );
                          })}
                        </>
                      </NavDropdown>
                    )}
                    {Section.type === "linkbar" && (
                      <NavDropdown
                        key={nanoid(11)}
                        title={
                          <div
                            style={{
                              display: "inline-block",
                              color:
                                Section.color !== undefined
                                  ? Section.color
                                  : "black",
                            }}
                            className="fw-2"
                          >
                            {isBig &&
                            Section.logo !== undefined &&
                            Section.logo.trim().length > 0 ? (
                              <Image
                                src={Section.logo}
                                width={Section.logoWidth}
                                height={Section.logoHeight}
                                alt={Section.title}
                                className="small logos"
                                fluid
                              />
                            ) : (
                              <span className={`${styles.LinkBar__Toggle}`}>
                                {Section.title}
                              </span>
                            )}
                          </div>
                        }
                        id={Section.title}
                        className={`${styles.Components} ${styles.LinkBar} ${styles.SectionDropdown}`}
                      >
                        <Row
                          className={`${styles.LinkBar__Content} mx-2 mx-lg-0 my-lg-0`}
                        >
                          {Section.links.map((PageLink: any, index: number) => {
                            return (
                              <NavDropdown.Item
                                key={nanoid(12)}
                                href={PageLink.url ? PageLink.url : ""}
                                className={`${styles.DropDown__SubLinks}`}
                              >
                                {PageLink.text}
                              </NavDropdown.Item>
                            );
                          })}
                        </Row>
                      </NavDropdown>
                    )}
                    {Section.type === "linkBranch" && (
                      <NavDropdown
                        key={nanoid(13)}
                        align={Section.leaning === "left" ? "end" : "start"}
                        title={
                          <span
                            style={{
                              color:
                                Section.color !== undefined
                                  ? Section.color
                                  : "black",
                            }}
                            className={`${styles.LinkBranch__Toggle} fw-2`}
                          >
                            {Section.title}
                          </span>
                        }
                        id={Section.title}
                        className={`${styles.Components} ${styles.LinkBranch} ${styles.Main} ${styles.SectionDropdown} `}
                      >
                        <Row
                          className={`${styles.LinkBranch__Content} mx-2 mx-lg-0 my-lg-0`}
                        >
                          {Section.branches.map(
                            (Branch: any, index: number) => {
                              return Branch.type === "link" ? (
                                <NavDropdown.Item
                                  key={nanoid(14)}
                                  href={Branch.url ? Branch.url : ""}
                                  className={`${styles.DropDown__SubLinks}`}
                                >
                                  {Branch.text}
                                </NavDropdown.Item>
                              ) : (
                                <NavDropdown
                                  key={nanoid(15)}
                                  align={
                                    Section.leaning === "left" ? "end" : "start"
                                  }
                                  drop={
                                    Section.leaning === "left"
                                      ? "end"
                                      : "start"
                                  }
                                  title={Branch.text}
                                  id={(Section.title + Branch.text).replace(
                                    /\s/g,
                                    ""
                                  )}
                                  className={`${styles.Components} ${styles.LinkBranch} px-3 px-xl-0 mb-1 mb-xl-0`}
                                >
                                  {Branch.links.map(
                                    (SmallBranch: any, index: number) => {
                                      return SmallBranch.type === "link" ? (
                                        <NavDropdown.Item
                                          key={nanoid(16)}
                                          href={
                                            SmallBranch.url
                                              ? SmallBranch.url
                                              : ""
                                          }
                                          className={`${styles.DropDown__SubLinks}`}
                                        >
                                          {SmallBranch.text}
                                        </NavDropdown.Item>
                                      ) : (
                                        <NavDropdown
                                          key={nanoid(17)}
                                          align={
                                            Section.leaning === "left"
                                              ? "end"
                                              : "start"
                                          }
                                          drop={
                                            Section.leaning === "left"
                                              ? "end"
                                              : "start"
                                          }
                                          title={SmallBranch.text}
                                          id={(
                                            Section.title + SmallBranch.text
                                          ).replace(/\s/g, "")}
                                          className={`${styles.Components} ${styles.LinkBranch} px-3 px-xl-0 mb-1 mb-xl-0`}
                                        >
                                          {SmallBranch.links.map(
                                            (
                                              TinyBranch: any,
                                              index: number
                                            ) => {
                                              return TinyBranch.type ===
                                                "link" ? (
                                                <span key={nanoid(18)}>
                                                  <NavDropdown.Item
                                                    href={
                                                      TinyBranch.url
                                                        ? TinyBranch.url
                                                        : ""
                                                    }
                                                    className={`${styles.DropDown__SubLinks}`}
                                                  >
                                                    {TinyBranch.text}
                                                  </NavDropdown.Item>
                                                </span>
                                              ) : null;
                                            }
                                          )}
                                        </NavDropdown>
                                      );
                                    }
                                  )}
                                </NavDropdown>
                              );
                            }
                          )}
                        </Row>
                      </NavDropdown>
                    )}
                    {Section.type === "linkTree" && (
                      <NavDropdown
                        key={nanoid(19)}
                        title={
                          <span
                            className={`${styles.LinkTree__Toggle} fw-2`}
                            style={{
                              color:
                                Section.color !== undefined
                                  ? Section.color
                                  : "black",
                            }}
                          >
                            {Section.title}
                          </span>
                        }
                        id={Section.title}
                        className={`${styles.Components} ${styles.LinkTree} ${styles.SectionDropdown}`}
                      >
                        <Row
                          className={`${styles.LinkTree__Content} mx-2 mx-lg-3 my-lg-2 d-xl-grid rows-${Section.rows}-min cols-xl-5`}
                        >
                          {Section.branches.map(
                            (Branch: any, index: number) => {
                              return Branch.type === "link" ? (
                                <NavDropdown.Item
                                  key={nanoid(20)}
                                  href={Branch.url ? Branch.url : ""}
                                  className={`${styles.DropDown__SubLinks}`}
                                >
                                  {Branch.text}
                                </NavDropdown.Item>
                              ) : (
                                <NavDropdown
                                  key={nanoid(21)}
                                  title={Branch.text}
                                  id={(Section.title + Branch.text).replace(
                                    /\s/g,
                                    ""
                                  )}
                                  align={
                                    Branch.align === "right" ? "end" : undefined
                                  }
                                  className={`${styles.Components} ${styles.LinkBranch} mb-1 mb-xl-0 px-xl-0`}
                                >
                                  <div
                                    className={`d-xl-grid gap-1 cols-${Branch.cols} align-items-center`}
                                  >
                                    {Branch.links.map(
                                      (SmallBranch: any, index: number) => {
                                        return SmallBranch.type === "link" ? (
                                          <span key={nanoid(22)}>
                                            <NavDropdown.Item
                                              href={
                                                SmallBranch.url
                                                  ? SmallBranch.url
                                                  : ""
                                              }
                                              className={`${styles.DropDown__SubLinks}`}
                                            >
                                              {SmallBranch.text}
                                            </NavDropdown.Item>
                                          </span>
                                        ) : (
                                          <NavDropdown
                                            key={nanoid(23)}
                                            title={SmallBranch.text}
                                            id={(
                                              Section.title + SmallBranch.text
                                            ).replace(/\s/g, "")}
                                            className={`${styles.Components} ${styles.LinkBranch} mb-1 mb-xl-0 px-3 px-xl-0`}
                                            align={
                                              Branch.align === "right"
                                                ? "end"
                                                : undefined
                                            }
                                          >
                                            <div
                                              className={`d-xl-grid gap-1 cols-${SmallBranch.cols} align-items-center`}
                                            >
                                              {SmallBranch.links.map(
                                                (
                                                  TinyBranch: any,
                                                  index: number
                                                ) => {
                                                  return TinyBranch.type ===
                                                    "link" ? (
                                                    <span key={nanoid(24)}>
                                                      <NavDropdown.Item
                                                        href={
                                                          TinyBranch.url
                                                            ? TinyBranch.url
                                                            : ""
                                                        }
                                                        className={`${styles.DropDown__SubLinks}`}
                                                      >
                                                        {TinyBranch.text}
                                                      </NavDropdown.Item>
                                                    </span>
                                                  ) : null;
                                                }
                                              )}
                                            </div>
                                          </NavDropdown>
                                        );
                                      }
                                    )}
                                  </div>
                                </NavDropdown>
                              );
                            }
                          )}
                        </Row>
                      </NavDropdown>
                    )}
                  </div>
                );
              })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {props.showpagetopmsg !== undefined && props.showpagetopmsg ? (
        <NoticeBoard />
      ) : null}
    </>
  );
}

export default MenuHeader;
