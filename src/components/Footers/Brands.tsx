"use client";
import React from "react";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Hover from "@/styles/Hover.module.scss";
import HorizontalScrollView from "@/components/Main/Controls/HorizontalScrollView";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { CmsAPI } from "@actions";
import Text from "../Text";
import Link from "next/link";

function Brands() {
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
    <Text className={`m-0`}>
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

      <div className="d-flex flex-wrap gap-2 mb-3">
        {BrandLogos !== undefined &&
          BrandLogos.length > 0 &&
          BrandLogos.map((Logo: any, index: number) => {
            return (
              <div key={index}>
                <Link
                  href={Logo.link}
                  title={Logo.title}
                  className="cursor-pointer text-light fsz-0"
                >
                  {Logo.title}
                </Link>
              </div>
            );
          })}
      </div>
    </Text>
  );
}

export default Brands;
