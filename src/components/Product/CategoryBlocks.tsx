"use client";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { nanoid } from "nanoid";

const CategoryBlocks = (props: any) => {
  const router = useRouter();
  const isSM = useMediaQuery("(min-width: 576px)");
  const placeholderImg =
    "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

  return props.tileLinks.map((Child: any, index: number) => {
    return (
      <div
        onClick={() => router.push(Child.url)}
        title={Child.title}
        className={`${props.classes} h-100 d-grid gap-1 cursor-pointer`}
        style={{
          gridTemplateRows: `${props.imgContainSize} auto`,
        }}
        key={nanoid(8)}
      >
        <div style={{ padding: props.shadowSize }}>
          <div
            className={`${props.imgParentClass} rounded-circle w-100 h-100 position-relative`}
            key={index}
          >
            <div
              className="position-absolute rounded-circle top-0 start-0 w-100 h-100"
              style={{ padding: "2px" }}
            >
              <div className={`rounded-circle bg-white w-100 h-100`}></div>
            </div>

            <LazyLoadImage
              placeholderSrc={placeholderImg}
              src={Child.product}
              visibleByDefault={Child.product}
              alt={Child.productAlt}
              className={`
                img-contain w-100 h-100 pe-none user-select-none position-relative
              `}
              width={Child.width}
              height={Child.height}
            />
          </div>
        </div>

        <p
          className={`${props.textClass} m-0 lh-1 user-select-none text-center fw-2`}
        >
          {!isSM ? (
            <small>
              <small>{Child.title}</small>
            </small>
          ) : (
            <small>{Child.title}</small>
          )}
        </p>
      </div>
    );
  });
};

export default CategoryBlocks;
