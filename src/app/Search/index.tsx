import { useContext } from "react";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Search/Search.module.scss";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  RefinementList,
  Pagination,
  ClearRefinements,
  CurrentRefinements,
  HitsPerPage,
  SortBy,
  Stats,
  SearchBox,
} from "react-instantsearch-hooks-web";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import "instantsearch.css/themes/satellite.css";
import { Badge, Button, Col, Image, Stack } from "react-bootstrap";
import { RangeSlider } from "@/components/Main/Controls/Search/RangeSlider";
import { useParams } from "next/navigation";
import Link from "next/link";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import PCBanners from "@/components/Banners/PCBanners";
import { simple } from "instantsearch.js/es/lib/stateMappings";
import { useRouter } from "next/router";
import { search } from "@algolia/autocomplete-plugin-recent-searches";
//import AppFooter from "../Layouts/CompFooter";
import { Helmet } from "react-helmet";
import HeaderContext from "@/store/header-context";
import HelperContext from "@/store/helper-context";
import SpecialTag from "@/components/Main/Controls/SpecialTag";
import { useTheme } from "@/store/ThemeContext";

const searchClient = algoliasearch(
  "NWQ20MVYTE",
  "32f67d10c8d5e238d221214191bcab43"
);

const _ = require("lodash");
// Product Card
function Hit({ hit }: any) {
  const imageRef = useRef<any>(null);
  const swapImageRef = useRef<any>(null);
  const helperCtx = useContext<any>(HelperContext);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  // const swapImageFn = (e: any) => {
  //   if (swapImageRef !== null && swapImageRef.current !== undefined) {
  //     if (imageRef.current.className.includes("show")) {
  //       swapImageRef.current.className =
  //         swapImageRef.current.className + "show";
  //       imageRef.current.className = swapImageRef.current.className.replace(
  //         "show",
  //         ""
  //       );
  //     } else {
  //       imageRef.current.className = imageRef.current.className + "show";
  //       swapImageRef.current.className = swapImageRef.current.className.replace(
  //         "show",
  //         ""
  //       );
  //     }
  //   }
  // };

  return (
    <article
      className={`
        ${styles.Card}
        ${darkMode ? `bg-black border-secondary border-opacity-50` : ``} 
        position-relative border w-100 h-100 d-grid gap-2 gap-sm-3
      `}
    >
      <div className="p-2 pb-0 d-flex position-relative align-items-center justify-content-center">
        <Image
          src={hit.ProductImage}
          alt={`` + hit._highlightResult.Name.value}
          className="h-100 w-100 img-contain fade show bg-white p-2"
        />
      </div>
      <div className="h-100 overflow-hidden px-2">
        <p
          className="fw-2"
          dangerouslySetInnerHTML={{ __html: hit._highlightResult.Name.value }}
        ></p>
      </div>
      <div
        className={`${styles.Price} ${
          darkMode ? styles.darkMode : ``
        } d-flex align-items-center px-2 justify-content-between`}
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
        href={`../../${hit.Url.replace("http://localhost:3000/", "").replace(
          "https://www.evetech.co.za/",
          ""
        )}`}
        replace
        className="position-absolute top-0 start-0 w-100 h-100"
      />
    </article>
  );
}

const Products = () => {
  return <Hits hitComponent={Hit} className={styles.Results} />;
};

const ResultExtras = () => {
  return (
    <>
      <div className="span-full d-flex justify-content-between align-items-center flex-wrap gap-2">
        <Stats />
        <div className="d-flex gap-1 gap-sm-2 flex-wrap">
          <SortBy
            items={[
              { label: "Sort by", value: "eve_products" },
              {
                label: "Lowest Price",
                value: "eve_products_virtual_asc",
              },
              {
                label: "Highest Price",
                value: "eve_products_virtual_desc",
              },
            ]}
          />
          <HitsPerPage
            items={[
              { label: "20 hits per page", value: 20, default: true },
              { label: "32 hits per page", value: 32 },
              { label: "64 hits per page", value: 64 },
            ]}
          />
        </div>
      </div>
      <div className={`${styles.CurrentRefinements} overflow-hidden`}>
        <CurrentRefinements />
      </div>
    </>
  );
};

const Search = () => {
  const params = useParams<any>();
  let searchTerm = params?.st;

  const isSM = useMediaQuery("(min-width: 576px)");
  const isLG = useMediaQuery("(min-width: 992px)");
  const isXL = useMediaQuery("(min-width: 1200px)");
  const [searchTxt, setSearchTxt] = useState("");
  const searchForm = useRef(null);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  // const [isSelectedTagsActive, setIsSelectedTagsActive] = useState(false);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const headerCtx = useContext<any>(HeaderContext);

  useEffect(() => {
    headerCtx.onSearchPageSet({ isSearchPage: true });
  }, []);

  const showFilters = () => {
    !isFiltersActive && setIsFiltersActive(!isFiltersActive);
  };
  const hideFilters = () => {
    isFiltersActive && setIsFiltersActive(!isFiltersActive);
  };

  useEffect(() => {
    /* ais-searchbox-input */
    setSearchTxt(searchTerm);
  }, [searchTerm]);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const router: any = useRouter();
  const location = router.pathname;

  const gameLaptopData = location.state?.gameLaptopData;
  const everyDayLaptopData = location.state?.everyDayLaptopData;
  const query = location.state?.query;

  useEffect(() => {}, [searchForm]);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Online shopping South Africa - Discounts - shop Online Laptops,
          Ultrabook, Tablets etc
        </title>
        <link rel="canonical" href="https://www.evetech.co.za/Search.aspx" />
        {/* <meta
          name="description"
          content="We strive to offer the best laptop specials in South Africa, covering a vast variety of laptop deals. Take a look at our current laptops for sale on offer"
        /> */}
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Helmet>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <InstantSearch
        searchClient={searchClient}
        indexName="eve_products"
        initialUiState={{
          eve_products: {
            query: searchTerm ? searchTerm : "",
            refinementList: {
              "Attributes.CPU": gameLaptopData
                ? gameLaptopData[0]["CPU"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["CPU"]
                : "",
              "Attributes.GPU": gameLaptopData
                ? gameLaptopData[0]["GPU"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["GPU"]
                : "",
              "Attributes.MemorySize": gameLaptopData
                ? gameLaptopData[0]["MemorySize"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["MemorySize"]
                : "",
              "Attributes.SSD": gameLaptopData
                ? gameLaptopData[0]["SSD"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["SSD"]
                : "",
              "Attributes.HDD": gameLaptopData
                ? gameLaptopData[0]["HDD"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["HDD"]
                : "",
              "Attributes.ScreenSize": gameLaptopData
                ? gameLaptopData[0]["ScreenSize"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["ScreenSize"]
                : "",
              "Attributes.OS": gameLaptopData
                ? gameLaptopData[0]["OS"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["OS"]
                : "",
              Brand: gameLaptopData
                ? gameLaptopData[0]["Brand"]
                : everyDayLaptopData
                ? everyDayLaptopData[0]["Brand"]
                : "",
            },
          },
        }}
      >
        <main
          className={`
            ${darkMode ? `bg-dark text-light` : ``} 
            ${darkMode ? styles.DarkSearch : ``}
            d-grid
          `}
        >
          <section
            className={`${styles.SearchArea} position-sticky w-100 p-2 py-lg-3`}
          >
            <Col xs={12} md={{ span: 10, offset: 1 }}>
              <Stack direction="horizontal" gap={2}>
                <SearchBox
                  placeholder="Search products here"
                  /* className={`${styles.Search} shadow rounded-pill w-100`} */
                  searchAsYouType={false}
                  classNames={{
                    root: `${styles.Search} shadow rounded-pill w-100`,
                    input: "ais-searchbox-input",
                  }}
                  onLoad={() => {
                    let searchbox: any = document.getElementsByClassName(
                      "ais-searchbox-input"
                    )[0];

                    try {
                      searchbox.value = searchTerm;
                    } catch (ex) {}
                  }}
                />
                <Button
                  className="rounded-pill d-flex align-items-center gap-2 d-xl-none"
                  onClick={showFilters}
                >
                  <FaSlidersH /> Filters
                </Button>
              </Stack>
            </Col>
          </section>

          <section className={``}>
            <div className="d-lg-grid cols-lg-10 cols-xl-12 gap-2 gap-lg-0">
              <div
                className={`${styles.Filters} ${styles.Scrollbar} ${
                  !isFiltersActive ? styles.Hide : styles.Show
                } span-xl-2 overflow-auto`}
              >
                <div
                  className={`${styles.Filters__Content} ${
                    !isFiltersActive ? styles.Hide : styles.Show
                  } overflow-auto position-relative`}
                >
                  <div
                    className={`${styles.Filters__Header} position-sticky top-0 p-2 bg-light`}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="m-0 d-flex align-items-center fs-5">
                        Filters
                      </h2>
                      <Button
                        variant="light"
                        className="shadow text-danger border"
                        onClick={hideFilters}
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 p-sm-3">
                    <Stack className="gap-2 gap-sm-3">
                      {!isXL ? <ResultExtras /> : null}
                      <ClearRefinements />
                      <RangeSlider attribute="PriceIncVat" title="Price" />
                      <div>
                        <h2 className="fs-6">Brands</h2>
                        <RefinementList
                          attribute="Brand"
                          limit={3}
                          showMore={true}
                          searchable={true}
                          searchablePlaceholder="Search Brand"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Categories</h2>
                        <RefinementList
                          attribute="Category1"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Categories 2</h2>
                        <RefinementList
                          attribute="Category2"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Category"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Categories 3</h2>
                        <RefinementList
                          attribute="Category3"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Category"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Categories 4</h2>
                        <RefinementList
                          attribute="Category4"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Category"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">CPU</h2>
                        <RefinementList
                          attribute="Attributes.CPU"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search CPU"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">GPU Series</h2>
                        <RefinementList
                          attribute="Attributes.GPUSeries"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search GPU Series"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Screen Size</h2>
                        <RefinementList
                          attribute="Attributes.ScreenSize"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Screen Size"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Memory</h2>
                        <RefinementList
                          attribute="Attributes.MemorySize"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Memory"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Warranty Info</h2>
                        <RefinementList
                          attribute="Attributes.WarrantyInfo"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Warranty Info"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Form Factor</h2>
                        <RefinementList
                          attribute="Attributes.FormFactor"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Form Factor"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Laptop Memory</h2>
                        <RefinementList
                          attribute="Attributes.Memory"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search Laptop Memory"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">CPU Model</h2>
                        <RefinementList
                          attribute="Attributes.CPUModel"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search CPU Model"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">SSD Capacity</h2>
                        <RefinementList
                          attribute="Attributes.SSD"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search SSD Capacity"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">HDD Capacity</h2>
                        <RefinementList
                          attribute="Attributes.HDD"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search HDD Capacity"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">GPU Memory</h2>
                        <RefinementList
                          attribute="Attributes.GPUMemory"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search GPU Memory"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">GPU</h2>
                        <RefinementList
                          attribute="Attributes.GPU"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search GPU"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">GPU Brand</h2>
                        <RefinementList
                          attribute="Attributes.GPUManufacturer"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search GPU Brand"
                          className="text-wrap"
                        />
                      </div>
                      <div>
                        <h2 className="fs-6">Operating System</h2>
                        <RefinementList
                          attribute="Attributes.OS"
                          limit={3}
                          searchable={true}
                          showMore={true}
                          searchablePlaceholder="Search OS"
                          className="text-wrap"
                        />
                      </div>
                    </Stack>
                  </div>
                </div>
              </div>

              <div
                className={`
                  ${styles.Results} 
                  ${styles.Scrollbar} 
                  ${darkMode ? `bg-dark` : `bg-light`}
                  span-lg-8 span-xl-8 overflow-auto position-relative
                `}
              >
                <div className="d-grid gap-2 gap-sm-3">
                  {isXL ? (
                    <>
                      <div
                        className={`
                          ${styles.ResultsExtras}
                          ${darkMode ? `bg-dark` : `bg-light`} 
                          p-2 p-sm-3 position-sticky top-0
                        `}
                      >
                        <ResultExtras />
                      </div>
                      <div className="p-2 p-sm-3">
                        <Products />
                      </div>
                    </>
                  ) : (
                    <div className="p-2 p-sm-3">
                      <Products />
                    </div>
                  )}
                </div>
              </div>

              {isLG ? (
                <div
                  className={`${styles.Banners} ${styles.Scrollbar} span-lg-2 px-2 px-sm-3 pb-3 overflow-auto`}
                >
                  <PCBanners />
                </div>
              ) : null}
            </div>
          </section>

          <section
            className={`${styles.PaginationArea} d-flex justify-content-center p-2 py-3`}
          >
            <Pagination padding={isSM ? 2 : 1} />
          </section>
        </main>
      </InstantSearch>

      {!isLG ? (
        <div className="px-2 pb-3">
          <PCBanners />
        </div>
      ) : null}
    </>
  );
};

export default Search;
