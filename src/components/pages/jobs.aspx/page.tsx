"use client";
import { ComponentsHeader } from "@/components/Home";
import { JobsAPI } from "@/custom/utils/actions";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button, Col, Image, Stack } from "react-bootstrap";
import styles from "@/styles/Jobs.module.scss";
import { FaMap, FaRegBuilding, FaSuitcase } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";

const Jobs = () => {
  const [activeJobsData, setActiveJobsData] = useState([`JobsData`]);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const getActiveJobsData = async () => {
    const newData = await JobsAPI.getActiveJobs();
    if (newData) {
      setActiveJobsData(newData.result);
    }
  };

  useEffect(() => {
    getActiveJobsData();
  }, []);

  useEffect(() => {}, [activeJobsData]);

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Job Openings at Evetech
        </title>
        <link rel="canonical" href="https://www.evetech.co.za/jobs.aspx" />
        <meta
          name="description"
          content="Find new work oppertunities at Evetech today"
        />
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Head>

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <section>
        <Image
          src="https://www.evetech.co.za/repository/ProductImages/Evetech-is-hiring-pc.jpg"
          alt="Evetech is hiring"
          className={`${styles.HeroImage} w-100`}
        />
      </section>

      <main
        className={`
          pt-3 pt-lg-5 pb-5
          ${darkMode ? `bg-dark text-light` : ``}
        `}
      >
        <Stack gap={3}>
          <h1 className={`${styles.MainHeading} text-center pb-lg-3`}>
            Our Jobs Openings
          </h1>
          <section className="p-3 py-4 py-lg-5 px-md-0 bg-secondary bg-opacity-25">
            <Col xs={12} md={{ span: 10, offset: 1 }} className="py-1 p-0">
              <div className="d-grid cols-sm-2 cols-lg-4 gap-3 gap-xxl-5">
                {activeJobsData.map((Job: any, index) => {
                  return (
                    <div
                      key={index}
                      className={`
                        ${
                          darkMode
                            ? `bg-black border-secondary border-opacity-50`
                            : `bg-light`
                        }
                        border rounded shadow overflow-hidden
                      `}
                    >
                      <h2
                        className={`
                          fs-4 w-100 p-3 bg-secondary bg-opacity-10 bg-gradient m-0 border-bottom
                          ${
                            darkMode ? `border-secondary border-opacity-50` : ``
                          }
                        `}
                      >
                        {Job.position}
                      </h2>
                      <div className="p-3 pb-0">
                        <p>
                          <FaMap className={`${styles.Icon}`} /> {Job.location}
                        </p>
                        <div className="d-flex flex-wrap gap-3">
                          <p className="m-0">
                            <FaSuitcase className={`${styles.Icon}`} />{" "}
                            {Job.jobType}
                          </p>
                          <p className="m-0">
                            <FaRegBuilding className={`${styles.Icon}`} />{" "}
                            {Job.department}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/jobs/${Job.id}/apply.aspx`}
                        title={`Apply to ${Job.position} position`}
                      >
                        <Button className="googleBtn m-3">Apply</Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Col>
          </section>
          <section className="pt-lg-4">
            <Col
              xs={12}
              md={{ span: 10, offset: 1 }}
              xxl={{ span: 6, offset: 3 }}
              className="p-3 p-md-0"
            >
              <div className="d-grid cols-md-2 gap-3 align-items-center">
                <div>
                  <h2 className="text-primary">Join the team at Evetech!</h2>
                  <p>
                    We are looking for innovative, hard working, and talented
                    individuals to help drive an exciting new PC company. A
                    passion for PC hardware is required. Noobs need not apply.
                  </p>
                  <p>
                    Below, you can find a list of openings we currently have. If
                    you&apos;re interested, please follow the instruction
                    described in each opening.
                  </p>
                  <p className="m-0">
                    Please note that all openings are for our main office in
                    Centurion, Gauteng.
                  </p>
                </div>
                <div
                  className={`${styles.GoogleMap} border rounded overflow-hidden w-100`}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4462.709097027753!2d28.033082!3d-25.906997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956453e7af67eb%3A0x325b4bc90aec6164!2sEvetech!5e1!3m2!1sen!2sza!4v1687246303413!5m2!1sen!2sza"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EvetechMap"
                    className="w-100 h-100"
                  ></iframe>
                </div>
              </div>
            </Col>
          </section>
        </Stack>
      </main>
    </>
  );
};

export default Jobs;
