"use client";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Stack,
  Badge,
  Button,
} from "react-bootstrap";
import styles from "@/styles/Specials/Specials.module.scss";
import Slider from "react-slick";
import _ from "lodash";
import { useTheme } from "@/store/ThemeContext";
import Link from "next/link";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
  ],
};

const LaptopSpecialList = (props: any) => {
  const [specialData, setSpecialData] = React.useState<any>([]);
  const [isInit, setIsInit] = React.useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    if (props.specialData !== undefined && !isInit) {
      setSpecialData(props.specialData);
      setIsInit(true);
    }
  }, [props]);

  return (
    <>
      {isInit &&
        specialData !== undefined &&
        specialData.length > 0 &&
        _.map(specialData, (specialDetail: any) => {
          return (
            <section
              className={`pb-3 py-md-5  ${styles.Banner} rounded-4`}
              key={nanoid(6)}
              style={{ background: specialDetail.background }}
            >
              <Container className={`${styles.Banner__Container} mt-2`}>
                <Row className={`${styles.Banner__Row}`}>
                  <Col lg={4}>
                    {specialDetail.logo !== null &&
                    specialDetail.logo !== undefined ? (
                      <Image
                        src={specialDetail.logo}
                        alt={specialDetail.title}
                        className={`${styles.Banner__Logo} mb-3 mt-3 mt-md-0`}
                      />
                    ) : null}
                    {specialDetail.brand !== null &&
                    specialDetail.brand !== undefined ? (
                      <>
                        <h2 className={`${styles.Banner__Heading} text-light`}>
                          <span className={`text-white`}>
                            {_.upperCase(specialDetail.brand)}
                          </span>{" "}
                          Laptop Specials
                        </h2>
                      </>
                    ) : null}
                    {specialDetail.title !== null &&
                    specialDetail.title !== undefined ? (
                      <>
                        <p className={`${styles.Banner__Paragraph}`}>
                          {specialDetail.title}
                        </p>
                      </>
                    ) : null}
                  </Col>
                  <Col lg={8} className={`px-4`}>
                    <div className={`px-3`}>
                      <Slider {...settings}>
                        {specialDetail.data !== undefined &&
                          _.map(
                            specialDetail.data,
                            (laptop: any, index: any) => {
                              return (
                                <Card
                                  key={nanoid(7)}
                                  className={`
                                            ${styles.Banner__Card} 
                                            ${
                                              darkMode
                                                ? `bg-dark bg-gradient bg-opacity-75 text-light`
                                                : ``
                                            }
                                            p-2 position-relative
                                        `}
                                >
                                  <Image
                                    fluid
                                    src={
                                      `https://www.evetech.co.za/` +
                                      laptop.imageurl
                                    }
                                    alt={laptop.name}
                                    className={`mx-auto`}
                                  />
                                  <h3
                                    className={`fw-2 fs-6 m-0 mt-1 text-center overflow-hidden`}
                                  >
                                    {laptop.name}
                                  </h3>
                                  <Stack
                                    gap={2}
                                    className={`${styles.BannerCard__Footer} justify-content-between pt-2 text-center`}
                                  >
                                    <p
                                      className={`m-0 d-flex flex-wrap align-items-center justify-content-center gap-1 lh-1`}
                                    >
                                      <span className="text-danger fw-3 fs-4">
                                        R{laptop.price}
                                      </span>
                                      <small>
                                        <small>Inc. VAT</small>
                                      </small>
                                    </p>

                                    <Link
                                      href={`/${_.join(
                                        _.filter(
                                          _.split(
                                            _.replace(
                                              _.toLower(laptop.url),
                                              new RegExp(/[^a-zA-Z0-9 ]/g),
                                              " "
                                            ),
                                            " "
                                          ),
                                          _.size
                                        ),
                                        "-"
                                      ).trim()}/laptops-for-sale/${
                                        laptop.npid
                                      }.aspx`}
                                    >
                                      <Button
                                        variant="info"
                                        size="sm"
                                        className={`lh-1`}
                                      >
                                        <small>More Info</small>
                                      </Button>
                                    </Link>
                                  </Stack>
                                  <Stack
                                    className={`${styles.Tags} position-absolute top-0 start-0 p-2`}
                                    gap={1}
                                  >
                                    {laptop.IsSpecial ? (
                                      <Badge className={"bg-danger text-break"}>
                                        <span
                                          className={`fw-1 w-100 d-flex align-items-center justify-content-center`}
                                        >
                                          <small>
                                            On <br></br> Special
                                          </small>
                                        </span>
                                      </Badge>
                                    ) : null}
                                    {laptop.isNew ? (
                                      <Badge>
                                        <span className="fw-2">NEW</span>
                                      </Badge>
                                    ) : null}
                                  </Stack>
                                  <Stack
                                    className="position-absolute top-0 end-0 p-2"
                                    gap={1}
                                  >
                                    {laptop.isOnDeal ? (
                                      <Badge bg="dark">
                                        <span className="fw-2 d-flex align-items-center justify-content-center">
                                          <small>On Deal</small>
                                        </span>
                                      </Badge>
                                    ) : null}
                                  </Stack>
                                </Card>
                              );
                            }
                          )}
                      </Slider>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          );
        })}
    </>
  );
};

export default LaptopSpecialList;
