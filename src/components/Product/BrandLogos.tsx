"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Hover from "@/styles/Hover.module.scss";
import { CmsAPI } from "@/custom/utils/actions";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";

const BrandLogos = () => {
  const [BrandLogos, setBrandLogos] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const isSM = useMediaQuery("(min-width: 576px)");

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 5 });

        if (data.result !== undefined) {
          setBrandLogos(data.result);
          setLoader(false);
        }
      } catch (error: any) {
        console.error("Failed to fetch React Info [Brands]:", error.message);
      }
    };

    fetchLogos();
  }, []);

  useEffect(() => {}, [BrandLogos]);

  return (
    <>
      {loader && (
        <div className={`d-grid cols-3 cols-sm-4 cols-md-5 cols-lg-6 gap-3`}>
          <Spinner />
          <Spinner />
          <Spinner />
          <Spinner />
          <Spinner />
          <Spinner />
        </div>
      )}
      {BrandLogos !== undefined &&
        BrandLogos.length > 0 &&
        BrandLogos.map((Logo: any, index: number) => {
          return (
            <div
              className={`
                    ${Hover.easeInOut_1}
                    position-relative text-center animatedBtn animatedBtn-4 hover_border-show hover-border-7 roundy bg-secondary-before_nb bg-secondary-after_nb 
                  `}
              key={index}
              style={{ width: isSM ? "150px" : "75px" }}
              onClick={() => router.push(Logo.link)}
            >
              <span
                className="position-relative border-secondary-before_nb border-secondary-after_nb"
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
              >
                <span className="px-3 py-2">
                  <LazyLoadImage
                    src={Logo.image}
                    alt={Logo.title}
                    visibleByDefault={Logo.image}
                    className={`img-fluid d-block w-100 h-100 px-1 px-sm-3 pe-none`}
                    width={150}
                    height={50}
                  />
                </span>
              </span>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 cursor-pointer"
                title={Logo.title}
              ></div>
            </div>
          );
        })}
    </>
  );
};

export default BrandLogos;
