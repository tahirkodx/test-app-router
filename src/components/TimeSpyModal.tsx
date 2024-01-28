"use client";
import React from "react";
import { Modal, Stack } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "@/styles/TimeSpyModal.module.scss";
import CircularProgress from "./CircularProgress";
import { useTheme } from "@/store/ThemeContext";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import { isBodyDark, isDarkHeaderFooter } from "./Auth/LoginModal";

const isDarkTxtBg = (darkMode: any) => {
  return darkMode ? `bg-dark text-light` : `bg-light text-dark`;
};

const qualityMeterLvlClass = `w-100 h-100 rounded pb-1 d-flex align-items-center justify-content-center flex-column`;

const placeholderImg =
  "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

var _ = require("lodash");

const TimeSpyModal = ({
  show,
  setShow,
  hdFPS,
  productTitle,
  Performance,
}: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        setShow(false);
      }}
      aria-labelledby="Timespy-Modal"
      centered
    >
      <Modal.Header
        closeButton
        className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
      >
        <Modal.Title id="example-modal-sizes-title-lg">
          3DMark Time Spy
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={`${isBodyDark(darkMode)}`}>
        <Stack gap={3}>
          <div className="d-grid cols-sm-2 gap-2 align-items-center">
            <section>
              <div
                className={`${styles.TimeSpyCircles} position-relative d-flex gap-2 justify-content-center flex-wrap`}
              >
                <div className={`${styles.O} position-relative`}>
                  <div
                    className={`
                      ${styles.O__Lvl} 
                      ${darkMode ? `` : `bg-light`}
                      position-absolute w-100 h-100 rounded-circle overflow-hidden d-grid gap-2 cols-2
                    `}
                  >
                    <span
                      className={
                        (hdFPS < 60
                          ? `bg-danger`
                          : hdFPS < 120
                          ? `bg-warning`
                          : `bg-success`) + ` border border-dark`
                      }
                    ></span>
                    <span
                      className={
                        (hdFPS < 60
                          ? `bg-danger`
                          : hdFPS < 120
                          ? `bg-warning`
                          : `bg-success`) + ` border border-dark`
                      }
                    ></span>
                    <span
                      className={
                        (hdFPS < 60
                          ? `bg-danger`
                          : hdFPS < 120
                          ? `bg-warning`
                          : `bg-success`) + ` border border-dark`
                      }
                    ></span>
                    <span className={``}></span>
                  </div>
                  <div
                    className={`position-absolute w-100 h-100 bg-dark rounded-circle`}
                  ></div>
                  <div className="progress p-2 m-0 position-relative w-100 h-100 rounded-circle bg-dark">
                    <CircularProgress
                      Percentage={
                        !_.isEmpty(Performance) &&
                        Performance.timeSpyOverallScore !== undefined &&
                        Performance.timeSpyOverallScore < 7500
                          ? Math.ceil(
                              (Performance.timeSpyOverallScore * 100) / 7500
                            )
                          : 100
                      }
                      Text={Performance.timeSpyOverallScore}
                      Duration={1}
                    />
                    <span
                      className={`${styles.TimeSpyCircles__FPS} text-light`}
                    >
                      Timespy
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <Stack gap={2}>
                <p className="m-0 lh-1">
                  <small>
                    <span className="fw-2 text-primary">
                      Timespy Score for:
                    </span>
                    {productTitle}
                  </small>
                </p>

                <div>
                  <h3 className="fs-6">Quality Meter</h3>
                  <div
                    className={`${styles.QualityMeter} w-100 d-grid cols-4 cols-sm-2 gap-2 text-center lh-1`}
                  >
                    <div
                      className={`${
                        Performance.timeSpyOverallScore > 2000 &&
                        Performance.timeSpyOverallScore < 3500
                          ? "active"
                          : ""
                      } border border-secondary rounded`}
                    >
                      <div
                        className={`
                          ${isDarkTxtBg(darkMode)} 
                          ${qualityMeterLvlClass}
                        `}
                      >
                        <h3 className="fs-6 m-0">Entry</h3>
                        <p className="m-0">
                          <small>
                            <small>2000 - 3500</small>
                          </small>
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        Performance.timeSpyOverallScore > 3500 &&
                        Performance.timeSpyOverallScore < 6000
                          ? "active"
                          : ""
                      } border border-secondary rounded`}
                    >
                      <div
                        className={`
                          ${isDarkTxtBg(darkMode)} 
                          ${qualityMeterLvlClass}
                        `}
                      >
                        <h3 className="fs-6 m-0">Good</h3>
                        <p className="m-0">
                          <small>
                            <small>3500 - 6000</small>
                          </small>
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        Performance.timeSpyOverallScore > 6000 &&
                        Performance.timeSpyOverallScore < 7500
                          ? "active"
                          : ""
                      } border border-secondary rounded`}
                    >
                      <div
                        className={`
                          ${isDarkTxtBg(darkMode)} 
                          ${qualityMeterLvlClass}
                        `}
                      >
                        <h3 className="fs-6 m-0">High</h3>
                        <p className="m-0">
                          <small>
                            <small>6000 - 7500</small>
                          </small>
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        Performance.timeSpyOverallScore > 7500 ? "active" : ""
                      } border border-secondary rounded`}
                    >
                      <div
                        className={`
                          ${isDarkTxtBg(darkMode)} 
                          ${qualityMeterLvlClass}
                        `}
                      >
                        <h3 className="fs-6 m-0">Elite</h3>
                        <p className="m-0">
                          <small>
                            <small>7500+</small>
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Stack>
            </section>
          </div>

          <section>
            <small className="d-sm-grid cols-2 gap-2">
              <div>
                <h3 className="fs-6">What does the 3D mark score mean?</h3>
                <p>
                  3DMark is a popular tool for benchmarking the performance of
                  gaming PCs. The 3DMark score tells you how good a PC is for
                  gaming based on it&apos;s graphics card and processor. The
                  higher score. The better performance.
                </p>
              </div>
              <div>
                <h3 className="fs-6">Entry Level - (Step into the Game)</h3>
                <p>
                  The system provides a good experience with the majority of
                  games by 1080p resolution and acceptable graphics settings.
                </p>
              </div>
              <div>
                <h3 className="fs-6">Good Level - (Next level of Gaming)</h3>
                <p>
                  You can comfortably play all current games at 1080p resolution
                  and high graphics settings. All PCs at this level and above
                  are VR-Ready.
                </p>
              </div>
              <div className="lh-1">
                <h3 className="fs-6">Benchmark scores for gaming </h3>
                <p className="d-flex fle-wrap m-0 gap-2">
                  <span className="bg-danger text-light p-1 px-2 rounded">
                    30+ FPS - OK
                  </span>
                  <span className="bg-warning text-dark p-1 px-2 rounded">
                    60+ FPS - Ideal
                  </span>
                  <span className="bg-success text-light p-1 px-2 rounded">
                    120+ FPS - Perfect
                  </span>
                </p>
              </div>
            </small>
          </section>

          <section className={`text-end`}>
            <div
              className={`
                      ${darkMode ? `p-2 bg-light bg-opacity-25 rounded` : ``}
                      d-inline-block
                    `}
            >
              <LazyLoadImage
                src="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
                alt="3DMARK"
                className="me-1"
                width={135}
                height={28}
                placeholderSrc={placeholderImg}
                defaultValue="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
              />
              <LazyLoadImage
                src="https://www.evetech.co.za/repository/ProductImages/UL.png"
                alt="UL"
                width={25}
                height={25}
                placeholderSrc={placeholderImg}
                defaultValue="https://www.evetech.co.za/repository/ProductImages/UL.png"
              />
            </div>
          </section>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default TimeSpyModal;
