"use client";
import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import Spinner from "@/components/Spinner";
// import { FetchReactInfo } from "../util/Helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CmsAPI } from "@actions";
import Link from "next/link";
// import styles from "../Assets/Styles/SocialLinks.module.scss";

const _ = require("lodash");
function SocialLinks() {
  const [Links, setLinks] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 20 });

        if (data.result !== undefined) {
          
          const fixedData = data.result.map((item: any) => {
            item.image = item.image.replace("evereact.", "");
            return item;
          })
          setLinks(fixedData);
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [SocialLinks]:",
          error.message
        );
      }
    };

    fetchLinks();
  }, []);

  useEffect(() => {}, [Links]);

  const openInNewTab = (url: any) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {loader && <Spinner />}
      {/* {Links !== undefined &&
        Links.length > 0 &&
        Links.map(({ url, name, image }) => (
          <Button
            title={`${name} - Evetech Social Page`}
            key={nanoid(5)}
            className="rounded-pill d-flex border-primary align-items-center gap-1"
            variant="dark"
            onClick={() => openInNewTab(`${url}`)}
          >
            <LazyLoadImage
              src={image}
              alt={`` + name}
              style={{ height: "16px" }}
              height={16}
              width={16}
              className="img-fluid"
            />
            <div>{name}</div>
          </Button>
        ))} */}
      {Links !== undefined && Links.length > 0
        ? Links.map(({ url, name, image }) => (
            <Link
              title={`${name} - Evetech Social Page`}
              key={nanoid(5)}
              href={`${url}`}
              target="_blank"
            >
              <Button
                variant="dark"
                className="rounded-circle border-secondary border-0 border-bottom p-0 f-flex justify-content-center align-items-center"
                style={{ height: "40px", width: "40px" }}
              >
                <LazyLoadImage
                  src={image}
                  alt={`` + name}
                  style={{ height: "16px" }}
                  height={16}
                  width={16}
                  className="img-fluid"
                />
              </Button>
            </Link>
          ))
        : null}
    </>
  );
}

export default SocialLinks;
