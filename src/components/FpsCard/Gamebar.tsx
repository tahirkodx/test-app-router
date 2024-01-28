"use client";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "@/styles/FpsCard/gamebar.module.scss";

const Gamebar = ({
  gameTitle,
  gameImg,
  placeholderImg,
  hdFPS,
  fhdFPS,
  fourkFPS,
}: any) => {
  return (
    <>
      <section className="position-relative">
        <div
          className={`${styles.LazyPlaceholder} position-absolute w-100 h-100 top-0`}
        >
          {/* <img className="w-100 img-cover" alt="" src={gameImg} /> */}
          <LazyLoadImage
            className="w-100 h-100 img-cover position-absolute top-0 start-0"
            alt={gameTitle}
            src={gameImg}
            width={300}
            height={300}
            placeholderSrc={placeholderImg}
            visibleByDefault={gameImg}
            style={{ objectPosition: "50% 0%" }}
          />
        </div>
        <div className="p-2 px-sm-3 bg-dark bg-opacity-25 position-relative">
          <div className="d-grid gap-1 cols-3 text-center">
            <div>
              <div className="bg-dark bg-opacity-75 border-bottom border-secondary text-info rounded-top">
                <small>
                  <small>1080P</small>
                </small>
              </div>
              <div className="lh-1 text-light bg-dark bg-opacity-75 py-1 rounded-bottom">
                <div
                  className="fw-2"
                  style={{ lineHeight: isNaN(hdFPS) ? "0.7rem" : "" }}
                >
                  {isNaN(hdFPS) ? (
                    <small>
                      <small>
                        <small>Not Playable</small>
                      </small>
                    </small>
                  ) : (
                    hdFPS
                  )}
                </div>
                <div>
                  <small>
                    <small>FPS</small>
                  </small>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-dark bg-opacity-75 border-bottom border-secondary text-info rounded-top">
                <small>
                  <small>1440P</small>
                </small>
              </div>
              <div className="lh-1 text-light bg-dark bg-opacity-75 py-1 rounded-bottom">
                <div
                  className="fw-2"
                  style={{ lineHeight: isNaN(fhdFPS) ? "0.7rem" : "" }}
                >
                  {" "}
                  {isNaN(fhdFPS) ? (
                    <small>
                      <small>
                        <small>Not Playable</small>
                      </small>
                    </small>
                  ) : (
                    fhdFPS
                  )}
                </div>
                <div>
                  <small>
                    <small>FPS</small>
                  </small>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-dark bg-opacity-75 border-bottom border-secondary text-info rounded-top">
                <small>
                  <small>4K</small>
                </small>
              </div>
              <div className="lh-1 text-light bg-dark bg-opacity-75 py-1 rounded-bottom">
                <div
                  className="fw-2"
                  style={{ lineHeight: isNaN(fourkFPS) ? "0.7rem" : "" }}
                >
                  {isNaN(fourkFPS) ? (
                    <small>
                      <small>
                        <small>Not Playable</small>
                      </small>
                    </small>
                  ) : (
                    fourkFPS
                  )}
                </div>
                <div>
                  <small>
                    <small>FPS</small>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gamebar;
