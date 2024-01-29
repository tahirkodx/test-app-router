"use client";
import React from "react";
import Col from "react-bootstrap/Col";
import { nanoid } from "nanoid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Hover from "@/styles/Hover.module.scss";
import Background from "@/styles/Background.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery"; 
import { Carousel } from "react-bootstrap";
import styles from "@/styles/Banners.module.scss";
import HorizontalScrollView from "@/components/Main/Controls/HorizontalScrollView";
import Link from "next/link";
import { useRouter } from "next/navigation";

const placeholderImg =
  "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

const SmallBanners = ({ section }:any) => {
  return section.content.map((Grid:any) => {
    return (
      <div className={`d-grid gap-3 ${Grid.mainClasses}`} key={nanoid(14)}>
        {Grid.links.map((Banner:any) => {
          return (
            <div
              className={`${Banner.classes} position-relative bg-dark rounded overflow-hidden`}
              key={nanoid(15)}
            >
              <div
                className={`${Background.rainbowGradient_4} position-absolute top-0 start-0 w-100 h-100`}
              ></div>
              <Link
                href={Banner.link}
                title={Banner.title}
                className="position-relative d-block"
              >
                <LazyLoadImage
                  src={Banner.image.replace("evereact.", "")}
                  alt={Banner.title}
                  className={`
                      ${Hover.easeInOut_1} ${Hover.grow_1} ${Hover.hide_50}
                      img-fluid w-100
                    `}
                  width={2560}
                  height={525}
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  });
};

const Banners = (props:any) => {
  const isSM = useMediaQuery("(min-width: 576px)");
  const isLG = useMediaQuery("(min-width: 992px)");
  const router = useRouter();
  console.log("props.source", props.source)
  return (
    <>
      {props.source.map((Section:any) => {
        return (
          <span key={nanoid(11)}>
            {Section.type === "darkBanner" ? (
              <section className={`bg-black p-3 py-sm-4 px-3`}>
                {Section.content.map((Banner:any) => {
                  return (
                    <Link
                      href={Banner.link}
                      title={Banner.title}
                      key={nanoid(12)}
                      className="position-relative bg-dark overflow-hidden w-100 rounded border border-light d-block"
                    >
                      <div
                        className={`
                          ${Background.rainbowGradient_4} 
                          opacity-50 position-absolute w-100 h-100 top-0 start-0
                        `}
                      ></div>
                      <LazyLoadImage
                        src={Banner.image.replace("evereact.", "")}
                        alt={Banner.title}
                        width={2560}
                        height={525}
                        className={`
                          ${Hover.easeInOut_1} ${Hover.grow_1} ${Hover.hide_50} 
                          position-relative img-fluid 
                        `}
                      />
                    </Link>
                  );
                })}
              </section>
            ) : null}

            {Section.type === "smallBanners" && isLG ? (
              <Col md={{ span: 10, offset: 1 }}>
                <SmallBanners section={Section} />
              </Col>
            ) : null}

            {Section.type === "smallBanners" &&
            !isLG &&
            Section.content[0].links.length === 1 ? (
              <SmallBanners section={Section} />
            ) : null}

            {Section.type === "smallBanners" &&
            !isLG &&
            Section.content[0].links.length > 1 ? (
              // <HorizontalScrollView
              //   className="hide-scrollbar px-3 d-grid gap-3"
              //   hideHeading={true}
              //   hideButtons={true}
              //   style={{
              //     gridTemplateColumns: `repeat(${
              //       Section.content[0].links.length
              //     }, ${!isSM ? `275px` : `400px`})`,
              //   }}
              // >
              <div className="px-3 d-grid gap-3 cols-sm-2">
                {Section.content[0].links.map((LinkArea:any) => {
                  return (
                    <div
                      key={nanoid(16)}
                      className={`${styles.MobiSlide} position-relative user-select-none rounded overflow-hidden`}
                    >
                      <div
                        className={`${Background.rainbowGradient_4} position-absolute top-0 start-0 w-100 h-100 user-select-none rounded overflow-hidden`}
                      ></div>
                      <div
                        onClick={() => router.push(LinkArea.link)}
                        title={LinkArea.title}
                        className="position-relative d-block cursor-pointer rounded overflow-hidden"
                      >
                        <LazyLoadImage
                          src={
                            LinkArea.mobileImg !== undefined &&
                            LinkArea.mobileImg.length > 0
                              ? LinkArea.mobileImg.replace("evereact.", "")
                              : LinkArea.image.replace("evereact.", "")
                          }
                          visibleByDefault={
                            LinkArea.mobileImg !== undefined &&
                            LinkArea.mobileImg.length > 0
                              ? LinkArea.mobileImg
                              : LinkArea.image
                          }
                          alt={LinkArea.title}
                          className={`
                            ${Hover.easeInOut_1} ${Hover.grow_1} ${Hover.hide_50}
                            img-fluid w-100 pe-none user-select-none
                          `}
                          width={2560}
                          height={525}
                          placeholderSrc={placeholderImg}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : // </HorizontalScrollView>
            null}
          </span>
        );
      })}
    </>
  );
};

export default Banners;
