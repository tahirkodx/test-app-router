"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "@/styles/Searchbar.module.scss";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  Pagination,
  Stats,
  SearchBox,
} from "react-instantsearch-hooks-web";
import "instantsearch.css/themes/satellite.css";
// import { Link, useNavigate } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button, Col, Image } from "react-bootstrap";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import HeaderContext from "@/store/header-context";
// import { event } from "jquery";
import HelperContext from "@/store/helper-context";
import SpecialTag from "@/components/Main/Controls/SpecialTag";
import { useTheme } from "@/store/ThemeContext";
import { FaSearch } from "react-icons/fa";
import Text from "../Text";

const searchClient = algoliasearch(
  "NWQ20MVYTE",
  "32f67d10c8d5e238d221214191bcab43"
);

const _ = require("lodash");
// Product Card
function Hit({ hit }: any) {
  const imageRef: any = useRef(null);
  const swapImageRef: any = useRef(null);
  const helperCtx = useContext(HelperContext);
  const { isDarkMode } = useTheme();

  const swapImageFn = (e: any) => {
    if (swapImageRef !== null && swapImageRef.current !== undefined) {
      if (imageRef.current.className.includes("show")) {
        swapImageRef.current.className =
          swapImageRef.current.className + "show";
        imageRef.current.className = swapImageRef.current.className.replace(
          "show",
          ""
        );
      } else {
        imageRef.current.className = imageRef.current.className + "show";
        swapImageRef.current.className = swapImageRef.current.className.replace(
          "show",
          ""
        );
      }
    }
  };

  return (
    <article
      className={`
        ${styles.Card} 
        ${isDarkMode ? `bg-black border-secondary border-opacity-50` : ``}
        position-relative border w-100 h-100 d-grid gap-2 gap-sm-3 w-100
      `}
    >
      <div className="p-2 pb-0 d-flex align-items-center justify-content-center w-100 position-relative">
        <div className="bg-light h-100 w-100 rounded p-2 position-relative">
          <Image
            src={hit.ProductImage}
            alt={`` + hit._highlightResult.Name.value}
            className="h-100 w-100 top-0 start-0 img-contain fade show"
            ref={imageRef}
          />
          {hit.OtherImages !== undefined && hit.OtherImages.length > 0 && (
            <Image
              src={
                hit.OtherImages[
                  Math.floor(
                    Math.random() * (hit.OtherImages.length - 1 - 0 + 1)
                  ) + 0
                ]
              }
              alt={`` + hit._highlightResult.Name.value}
              className="h-100 w-100 top-0 start-0 img-contain position-absolute fade "
              ref={swapImageRef}
            />
          )}
        </div>
      </div>
      <div className="h-100 overflow-hidden px-2">
        <p
          className="fw-2"
          dangerouslySetInnerHTML={{
            __html: hit._highlightResult.Name.value,
          }}
        ></p>
      </div>
      <div
        className={`
          ${styles.Price} 
          ${
            isDarkMode ? styles.darkMode : ``
          } d-flex justify-content-between align-items-center px-2`}
      >
        <p className="fw-2 fs-3 m-0 text-light">
          R{" "}
          {hit.EntityType === "2"
            ? Math.round(
                Math.floor(
                  parseFloat(hit.PriceIncVat) -
                    (parseFloat(hit.PriceIncVat) * 4.76) / 100
                )
              )
            : hit.PriceIncVat}
        </p>
      </div>

      {hit.IsSpecial === "Special" ? (
        <div className="position-absolute top-0 start-0 p-2 w-100">
          {helperCtx.dealTags !== undefined &&
            helperCtx.dealTags.length > 0 && <SpecialTag type={"On Special"} />}
          {(helperCtx.dealTags === undefined ||
            _.isEmpty(helperCtx.dealTags) ||
            (helperCtx.dealTags !== undefined &&
              helperCtx.dealTags.length === 0)) && (
            <Badge bg="danger" className="rounded-0 rounded-start rounded-pill">
              <span className="fw-2">On Special</span>
            </Badge>
          )}
        </div>
      ) : null}
      <Link
        className="position-absolute top-0 start-0 w-100 h-100"
        href={hit.Url.replace("https://www.evetech.co.za/", "")}
        onMouseOver={(e) => {
          swapImageFn(e);
        }}
        onMouseOut={(e) => {
          swapImageFn(e);
        }}
      ></Link>
    </article>
  );
}

const Searchbar = () => {
  const isSM = useMediaQuery("(min-width: 576px)");
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useTheme();

  const openSearch = () => {
    setIsSearchActive(true);
  };
  const closeSearch = () => {
    setIsSearchActive(false);
  };

  const advancedSearch = () => {
    function closingSearch() {
      return new Promise(function (resolve) {
        closeSearch();
        resolve(true);
      });
    }

    function goToPage() {
      return new Promise(function (resolve) {
        router.push(`/search/${searchTerm}`);
        resolve(false);
      });
    }

    async function steps() {
      await closingSearch();
      await goToPage();
    }

    steps();
  };

  const headerCtx = useContext(HeaderContext);

  // const [isInitHeaderFetched, setIsInitHeaderFetched] = useState(false);

  // useEffect(() => {
  //   let header = JSON.parse(localStorage.getItem("header_ctx")) || null;
  //   if (header) {
  //     headerCtx.onHeaderSet(header);
  //   }
  //   setIsInitHeaderFetched(true);
  // }, []);

  // useEffect(() => {
  //   if (isInitHeaderFetched) {
  //     localStorage.setItem("header_ctx", JSON.stringify(headerCtx));
  //   }
  // }, [headerCtx.isSearchPage]);

  return (
    <>
      {!headerCtx.isSearchPage ? (
        <>
          <InstantSearch searchClient={searchClient} indexName="eve_products">
            {isSearchActive ? (
              <div
                className={`${styles.Results} ${
                  !isSearchActive ? "d-none" : styles.SearchActive
                } position-fixed top-0 start-0 vw-100 vh-100 px-2 px-md-0 pe-auto`}
              >
                <div
                  className={`${styles.Overview} position-fixed bg-black bg-opacity-75 w-100 h-100 top-0 start-0 z-index-1`}
                  onClick={() => closeSearch()}
                ></div>
                <Col
                  xs={12}
                  md={{ span: 10, offset: 1 }}
                  xxl={{ span: 8, offset: 2 }}
                  className={`
                  ${styles.Main} 
                  ${styles.Scrollbar} 
                  ${
                    isDarkMode
                      ? `bg-dark text-light border border-bottom-0 border-secondary border-opacity-75`
                      : `bg-light`
                  }
                  overflow-auto rounded-top z-index-2 position-relative
                `}
                >
                  <div
                    className={`
                    ${isDarkMode ? `bg-dark` : `bg-light`}
                    mb-3 position-sticky top-0 z-index-2 p-2 p-sm-3 pb-sm-2 px-xxl-4 pt-xxl-4
                  `}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <small>
                        <Stats />
                      </small>
                      <div className="text-light d-flex align-items-center gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => advancedSearch()}
                        >
                          View all
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => closeSearch()}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.Grid} position-relative z-index-1 px-2 px-sm-3 px-xxl-4 pb-2 pb-sm-3 pb-xxl-4`}
                  >
                    <Hits
                      hitComponent={Hit}
                      className={styles.Products}
                      onClick={() => {
                        router.push("/");
                      }}
                    />
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={{ span: 10, offset: 1 }}
                  xxl={{ span: 8, offset: 2 }}
                  className="position-relative z-index-2"
                >
                  <section
                    className={`
                    ${styles.PaginationArea} 
                    ${
                      isDarkMode
                        ? `bg-dark border border-secondary border-opacity-75 border-top-0`
                        : `bg-light`
                    }
                    ${isDarkMode ? styles.DarkSearch : ``}
                    d-flex justify-content-between flex-wrap p-2 p-sm-3 py-3 gap-2 rounded-bottom
                  `}
                  >
                    <Pagination padding={isSM ? 2 : 1} />
                    {isSM ? (
                      <div className="text-light d-flex align-items-center gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            advancedSearch();
                          }}
                        >
                          View all
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => closeSearch()}
                        >
                          Close
                        </Button>
                      </div>
                    ) : null}
                  </section>
                </Col>
              </div>
            ) : null}

            <SearchBox
              placeholder={isSM ? "Search products here" : "Search"}
              className={`
              ${styles.SearchBox}
              ${isDarkMode ? styles.darkMode : ``} 
              shadow rounded-pill h-100 overflow-hidden position-relative pe-auto
            `}
              onKeyUp={(event: any) => {
                setSearchTerm(event.target.value);
                if (event.target.value.trim().length > 0) openSearch();
                else closeSearch();
              }}
              onKeyDown={(event: any) => {
                if (
                  event.target.value.trim().length > 0 &&
                  event.key === "Enter"
                ) {
                  advancedSearch();
                }
              }}
            />
          </InstantSearch>
          <Text
            className={`
              mb-0 f-15 position-absolute top-0 start-0 z-index-1
            `}
            style={{ marginTop: `0.35rem`, marginLeft: `0.30rem` }}
          >
            <FaSearch />
          </Text>
        </>
      ) : null}
    </>
  );
};

export default Searchbar;
