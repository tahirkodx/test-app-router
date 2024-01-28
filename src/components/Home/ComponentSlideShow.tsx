"use client";
import React, { Suspense } from "react";
import { Carousel } from "react-bootstrap";
import Link from "next/link";
// Custom Imports
import styles from "@/styles/Component.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { nanoid } from "nanoid";
import { CmsAPI } from "@actions";
import { Image } from "react-bootstrap";

const ComponentSlideShow = () => {
  const [TopSliders, setTopSliders] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isBiggerSlides = useMediaQuery("(min-width: 550px)");

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 1 });

        if (data.result !== undefined) {
          setTopSliders(data.result);
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [ComponentSlideShow]:",
          error.message
        );
      }
    };

    fetchSlider();
  }, []);

  useEffect(() => {}, [TopSliders]);

  return (
    <>
      <div className={`${styles.Slide}`}>
        {TopSliders !== undefined && TopSliders.length > 0 && (
          <Carousel
            className={`${styles.MainSlideshow} w-100 h-100 position-absolute top-0 start-0 bg-dark`}
          >
            {/* {loader && (
          <>
            <Spinner />
          </>
        )} */}
            {TopSliders.map((Slide: any) => {
              return (
                <Carousel.Item
                  className={`${styles.MainSlideshow__Item}`}
                  key={nanoid(6)}
                >
                  <Link
                    href={Slide.url ? Slide.url : ""}
                    title={Slide.title}
                    className={`${styles.SlideLink} overflow-hidden`}
                  >
                    {isBiggerSlides ? (
                      <Image 
                      src={`${Slide.desktop}`}
                        alt={`${Slide.alt}`}
                        className={`
                          hover-grow-1 d-block w-100 h-100 img-fluid`}
                        width={2560}
                        height={525} />
                    ) : (
                      <Image
                        src={`${Slide.mobile}`}
                        alt={`${Slide.alt}`}
                        className="d-block w-100 h-100 img-fluid"
                        width={980}
                        height={380}
                      />
                    )}
                  </Link>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}

        {TopSliders !== undefined && TopSliders?.length === 0 && (
          <div className="w-100 h-100 position-absolute top-0 start-0">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default ComponentSlideShow;
