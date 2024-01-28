"use client";
import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import styles from "@/styles/ModalGallery.module.scss";
import { FaSearchPlus, FaTimes } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BigGallery from "@/components/Gallery/BigGallery";
import LaptopDetailStyles from "@/styles/laptop/LaptopDetail.module.scss";
import { useTheme } from "@/store/ThemeContext";
import { isBodyDark } from "../Auth/LoginModal";

const placeholderImg =
  "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

const ModalGallery = (props: any) => {
  let product = props.product;
  let galleryData = props.gallerydata;
  let videoUrls = props.videourls;

  /* useEffect(() => {}, [props.gallerydata]); */

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className={`position-relative ${isBodyDark(darkMode)}`}>
          <Button
            variant="danger"
            onClick={props.onHide}
            className={`position-absolute end-0 me-2 me-sm-3`}
          >
            <FaTimes />
          </Button>
          <Tabs
            defaultActiveKey="images"
            id="uncontrolled-tab-example-2"
            className={`mb-3 mt-2 ${LaptopDetailStyles.Tabs} ${
              darkMode ? LaptopDetailStyles.darkMode : ``
            }`}
          >
            <Tab eventKey="images" title="Images">
              <span className={`position-relative`}>
                <p className={`d-flex gap-2 flex-wrap justify-content-between`}>
                  <span className="d-none d-lg-block">
                    <span className="fw-2">Product Name: </span>
                    {product.name}
                  </span>
                  <Badge
                    bg="primary"
                    className={`rounded-pill d-flex align-items-center`}
                  >
                    <span className={`d-flex gap-2`}>
                      <span className="lh-1 d-flex align-items-center gap-1">
                        <FaSearchPlus /> <span>ZOOM:</span>{" "}
                      </span>
                      <span className={`fw-1`}>Hover over image</span>
                    </span>
                  </Badge>
                </p>
                {galleryData !== undefined && galleryData.length > 0 && (
                  <BigGallery gallerydata={galleryData} />
                )}
                {galleryData !== undefined && galleryData.length === 0 ? (
                  <div className="p-5 text-center fs-4 text-danger d-grid gap-2 justify-content-center">
                    <LazyLoadImage
                      src="https://www.evetech.co.za/repository/ProductImages/woman-confused-laptop.png"
                      alt="woman confused laptop"
                      width={200}
                      height={200}
                      className="img-fluid"
                      placeholderSrc={placeholderImg}
                    />
                    <span className="">No Images Found</span>
                  </div>
                ) : null}
              </span>
            </Tab>
            {product.type === 2 && videoUrls.length > 0 ? (
              <Tab eventKey="videos" title="Videos">
                <div className={`${styles.Videos}`}>
                  <BigGallery videourls={videoUrls} />
                </div>
              </Tab>
            ) : null}
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalGallery;
