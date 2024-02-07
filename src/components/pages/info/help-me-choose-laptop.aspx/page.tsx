"use client";
import React from "react";
import { Button, Image, ListGroup, Stack } from "react-bootstrap";
import Link from "next/link";
import styles from "@/styles/HelpMeChooseLaptops.module.scss";
import { Helmet } from "react-helmet";
import { ComponentsHeader } from "@/components/Home";
import { useTheme } from "@/store/ThemeContext";

const HelpMeChooseLaptop = () => {
  const { isDarkMode } = useTheme();

  const ListItem = (props: any) => {
    return (
      <ListGroup.Item
        className={`${
          isDarkMode ? `bg-dark text-light border-secondary` : ``
        } px-0`}
      >
        {props.children}
      </ListGroup.Item>
    );
  };

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Help me choose a Laptop
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/info/help-me-choose-laptop.aspx"
        />
        {/* <meta
          name="description"
          content="Include EFT, Internet Banking, Bank Deposit, Bank Transfer. Buy Cheap Gaming PC"
        /> */}
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Helmet>
      <ComponentsHeader />
      <main
        className={`${
          isDarkMode ? `evetechDark bg-dark text-light` : ``
        } px-2 py-5`}
      >
        <Stack gap={3}>
          <section className="text-center">
            <h1 className="text-primary">Which Laptop is right for you?</h1>
          </section>
          <section className="d-grid cols-sm-2 cols-lg-3 cols-xxl-5 gap-3">
            <div className="d-flex justify-content-center">
              <div>
                <div className="px-2">
                  <Stack gap={3}>
                    <div className="text-center">
                      <Image
                        src="https://www.evetech.co.za/repository/ProductImages/everyday-laptops.png"
                        alt="everyday laptops"
                      />
                    </div>
                    <h2 className="text-secondary">
                      <div className={`${styles.EveryDayLaptops__Heading}`}>
                        Everyday
                      </div>
                      <div className="fs-5">Laptops</div>
                    </h2>
                    <p className="m-0 fst-italic">
                      Surf, socialize & get things done{" "}
                    </p>
                    <ListGroup variant="flush">
                      <ListItem>Reliable and Affordable </ListItem>
                      <ListItem>
                        Great for Daily tasks and basic programs
                      </ListItem>
                    </ListGroup>
                  </Stack>
                </div>
                <div>
                  <Link
                    href="/notebooks/entry-level-laptops-and-notebooks-1.aspx"
                    title="Everyday Laptops"
                    className="m-2 mt-3 d-block"
                  >
                    <Button
                      size="lg"
                      className={`${styles.EveryDayLaptops__Button} rounded-pill`}
                    >
                      <span className="fs-6">View EveryDay Laptops</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <div className="px-2">
                  <Stack gap={3}>
                    <div className="text-center">
                      <Image
                        src="https://www.evetech.co.za/repository/ProductImages/entertainment-laptops.png"
                        alt="entertainment laptops"
                      />
                    </div>
                    <h2 className="text-secondary">
                      <div
                        className={`${styles.EntertainmentLaptops__Heading}`}
                      >
                        Entertainment
                      </div>
                      <div className="fs-5">Laptops</div>
                    </h2>
                    <p className="m-0 fst-italic">
                      Everything you need to play, edit, stream, share and surf
                    </p>
                    <ListGroup variant="flush">
                      <ListItem>High-quality display and audio</ListItem>
                      <ListItem>Optimized for all your multimedia</ListItem>
                    </ListGroup>
                  </Stack>
                </div>
                <div>
                  <Link
                    href="/notebooks/mainstream-laptops-and-notebooks-4.aspx"
                    title="Entertainment Laptops"
                    className="m-2 mt-3 d-block"
                  >
                    <Button
                      size="lg"
                      className={`${styles.EntertainmentLaptops__Button} rounded-pill`}
                    >
                      <span className="fs-6">View Entertainment Laptops</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <div className="px-2">
                  <Stack gap={3}>
                    <div className="text-center">
                      <Image
                        src="https://www.evetech.co.za/repository/ProductImages/proffesional-laptops.png"
                        alt="professional laptops"
                      />
                    </div>
                    <h2 className="text-secondary">
                      <div className={`${styles.ProfessionalLaptops__Heading}`}>
                        Professional
                      </div>
                      <div className="fs-5">Laptops</div>
                    </h2>
                    <p className="m-0 fst-italic">
                      Productivity and access for work and life
                    </p>
                    <ListGroup variant="flush">
                      <ListItem>High speed processor</ListItem>
                      <ListItem>Large Hard Drive</ListItem>
                      <ListItem>
                        Built for demanding business applications
                      </ListItem>
                    </ListGroup>
                  </Stack>
                </div>
                <div>
                  <Link
                    href="http://localhost:59720/notebooks/professional-laptops-and-notebooks-5.aspx"
                    title="Professional"
                    className="m-2 mt-3 d-block"
                  >
                    <Button
                      size="lg"
                      className={`${styles.ProfessionalLaptops__Button} rounded-pill`}
                    >
                      <span className="fs-6">View Professional Laptops</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <div className="px-2">
                  <Stack gap={3}>
                    <div className="text-center">
                      <Image
                        src="https://www.evetech.co.za/repository/ProductImages/gaming-laptops.png"
                        alt="gaming laptops"
                      />
                    </div>
                    <h2 className="text-secondary">
                      <div className={`${styles.GamingLaptops__Heading}`}>
                        Gaming
                      </div>{" "}
                      <div className="fs-5">Laptops</div>
                    </h2>
                    <p className="m-0 fst-italic">
                      Power and Graphics for extreme gaming
                    </p>
                    <ListGroup variant="flush">
                      <ListItem>Super Fast</ListItem>
                      <ListItem>Awesome graphics</ListItem>
                      <ListItem>Professional audio</ListItem>
                    </ListGroup>
                  </Stack>
                </div>
                <div>
                  <Link
                    href="http://localhost:59720/gaming-laptops.aspx"
                    title="Gaming Laptops"
                    className="m-2 mt-3 d-block"
                  >
                    <Button
                      size="lg"
                      className={`${styles.GamingLaptops__Button} rounded-pill`}
                    >
                      <span className="fs-6">View Gaming Laptops</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <div className="px-2">
                  <Stack gap={3}>
                    <div className="text-center">
                      <Image
                        src="https://www.evetech.co.za/repository/ProductImages/on-the-go-laptops.png"
                        alt="On the Go laptops"
                      />
                    </div>
                    <h2 className="text-secondary">
                      <div className={`${styles.OnTheGoLaptops__Heading}`}>
                        On the Go
                      </div>{" "}
                      <div className="fs-5">Laptops</div>
                    </h2>
                    <p className="m-0 fst-italic">
                      Ultimate portability and connectivity for life on the go
                    </p>
                    <ListGroup variant="flush">
                      <ListItem>Great battery life</ListItem>
                      <ListItem>Small, light weight and portable</ListItem>
                      <ListItem>High-speed wireless ready</ListItem>
                    </ListGroup>
                  </Stack>
                </div>
                <div>
                  <Link
                    href="http://localhost:59720/ultrabooks.aspx"
                    title="On the Go Laptops"
                    className="m-2 mt-3 d-block"
                  >
                    <Button
                      size="lg"
                      className={`${styles.OnTheGoLaptops__Button} rounded-pill`}
                    >
                      <span className="fs-6">View On the Go Laptops</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Stack>
      </main>
    </>
  );
};

export default HelpMeChooseLaptop;
