"use client";
import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { nanoid } from "nanoid";
import Link from "next/link";
import { CmsAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import Heading from "../Heading";
const _ = require("lodash");

const BrandCard = (props: any) => {
  let BrandName = props.product.Brand;
  const [isCardSet, setIsCardSet] = useState(false);
  const brandInfo = useRef(null);
  const [BrandCards, setBrandCards] = useState<any[]>([]);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    const fetchBrandCards = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 8 });

        if (data.result !== undefined) {
          setBrandCards(data.result);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [LaptopFooterLinks]:",
          error.message
        );
      }
      /*  FetchReactInfo(`/api/gutil/getReactInfo`, 8)
          .then((data) => {
            // Handle the data here
            if (data.result !== undefined) {
              setBrandCards(data.result);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch data:", error);
          }); */
    };

    fetchBrandCards();
  }, []);

  useEffect(() => {}, [setBrandCards]);

  useEffect(() => {
    if (!isCardSet) {
      if (BrandName !== null && BrandName !== undefined) {
        brandInfo.current = _.find(BrandCards, (brand: any) => {
          return brand.vendor === BrandName.toLowerCase();
        });

        if (brandInfo.current !== undefined) {
          setIsCardSet(true);
          props.onBrandCardUpdate(brandInfo.current);
        }
      }
    }
  }, [props.product.Brand, BrandName, isCardSet, props, BrandCards]);

  return (
    <>
      {!_.isEmpty(brandInfo.current, true) && (
        <div
          className={`${
            brandInfo.current !== null &&
            brandInfo.current.link !== undefined &&
            brandInfo.current.link !== ""
              ? "d-xl-grid cols-xl-12 gap-xl-3"
              : ""
          } 
          ${
            darkMode
              ? `bg-black text-light border-secondary border-opacity-50`
              : `bg-light`
          }
          border p-3 rounded my-4 shadow `}
        >
          <section
            className={`${
              brandInfo.current !== null &&
              brandInfo.current.link !== undefined &&
              brandInfo.current.link !== ""
                ? "span-xl-9"
                : ""
            } `}
          >
            <LazyLoadImage
              className={`float-sm-start me-sm-3 mb-2 img-fluid rounded shadow`}
              src={
                brandInfo.current !== null &&
                brandInfo.current.logo !== undefined &&
                brandInfo.current.logo.replace("evereact", "www")
              }
              alt={`${
                brandInfo.current !== null &&
                brandInfo.current.vendor !== undefined &&
                brandInfo.current.vendor
              } South Africa`}
            />
            <Heading level={2} className={`fs-6`}>
              Supplier Description
            </Heading>
            {brandInfo.current !== null &&
              brandInfo.current.description !== undefined &&
              brandInfo.current.description.map(
                (paragraph: any, index: any) => (
                  <p key={nanoid(6)}>{paragraph}</p>
                )
              )}
          </section>

          {brandInfo.current !== null &&
          brandInfo.current.link !== undefined &&
          brandInfo.current.link !== "" ? (
            <>
              <hr className={`d-xl-none`}></hr>

              <section className={`span-xl-3 ps-3 border-start`}>
                <h2 className={`fs-6`}>
                  More links for{" "}
                  <span className={`fw-3`}>
                    &ldquo;{props.product.Title}&ldquo;
                  </span>
                </h2>
                <Link
                  href={
                    brandInfo.current !== null &&
                    brandInfo.current.link !== undefined &&
                    brandInfo.current.link
                  }
                  title={
                    brandInfo.current !== null &&
                    brandInfo.current.title !== undefined &&
                    brandInfo.current.title
                  }
                >
                  <Button
                    variant={`${
                      darkMode ? `outline-info` : `outline-primary`
                    } `}
                  >
                    More products by{" "}
                    <span className={`fw-3`}>
                      {brandInfo.current !== null &&
                        brandInfo.current.vendor !== undefined &&
                        brandInfo.current.vendor}
                    </span>
                  </Button>
                </Link>
              </section>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default BrandCard;
