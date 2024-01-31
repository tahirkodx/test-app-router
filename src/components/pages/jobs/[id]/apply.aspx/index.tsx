import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/JobsApply.module.scss";
import { JobsAPI } from "@/custom/utils/actions";
import Head from "next/head";
import { ComponentsHeader } from "@/components/Home";
import { Button, Col, Image } from "react-bootstrap";
import Link from "next/link";
import parse from "html-react-parser";
import { useTheme } from "@/store/ThemeContext";

const Home = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [backImage, setBackImage] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [department, setDepartment] = useState("");
  const [noVacancy, setNoVacancy] = useState("");
  const [requirements, setRequirements] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const params = useParams();
  const [JobID, setJobID] = useState("");

  useEffect(() => {
    let JID: any = params?.id;
    if (JID !== undefined && JID.length > 0) {
      setJobID(JID);
    }
  }, [params]);

  const fetchData = async (JobID: any) => {
    const newData = await JobsAPI.getJob({ JobID });

    if (newData && newData.result !== null && newData.result.length > 0) {
      setBackImage(newData.result[0].backImage);
      setPosition(newData.result[0].position);
      setDescription(newData.result[0].description);
      setJobType(newData.result[0].jobType);
      setDepartment(newData.result[0].department);
      setNoVacancy(newData.result[0].noVacancy);
      setRequirements(newData.result[0].requirements);
    }
  };

  useEffect(() => {
    if (JobID !== null && JobID !== undefined && JobID.length > 0) {
      fetchData(JobID);
    }
  }, [JobID]);

  return (
    <>
      {position !== undefined && position.length > 0 ? (
        <>
          <Head>
            <title itemProp="name" lang="en">
              {`Apply for ${position} position`}
            </title>

            {/* <meta
              name="description"
              content={`All candidates must: ${
                jobApplyData.requirements !== undefined &&
                parse(jobApplyData.requirements)
              }`}
            /> */}
            {/* <meta name="keywords" content={category.keyword} /> */}
          </Head>
          <ComponentsHeader showpagetopmsg={showPageTopMsg} />

          <main
            className={`
              ${darkMode ? `bg-dark text-white` : ``}
              pt-3 pt-lg-5 pb-5
            `}
          >
            <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
              <div className="d-grid gap-3 cols-xxl-2 gap-xxl-5">
                <div
                  className={`
                      ${darkMode ? `border-secondary border-opacity-75` : ``}
                      overflow-hidden rounded border position-relative
                    `}
                >
                  <Image
                    src={backImage}
                    alt={position}
                    className={`${styles.HeroImage} w-100`}
                  />
                  <div
                    className={`
                        p-3 bg-dark bg-opacity-75 text-light position-absolute bottom-0 left-0 w-100
                      `}
                  >
                    <h2>{position}</h2>
                  </div>
                </div>
                <div>
                  <div className="p-2">
                    <h1 className="text-secondary">
                      Apply for {position} position
                    </h1>
                    <h2>Were looking for someone who can join our team</h2>
                    <div>{parse(description)}</div>
                    <div className="d-grid cols-2 cols-sm-4 gap-3">
                      <div className="border-end border-opacity-75 border-info pe-3">
                        <h3 className="fs-5">Position:</h3>
                        <p>{position}</p>
                      </div>
                      <div className="border-end border-opacity-75 border-info pe-3">
                        <h3 className="fs-5">Job Type:</h3>
                        <p>{jobType}</p>
                      </div>
                      <div className="border-end border-opacity-75 border-info pe-3">
                        <h3 className="fs-5">Department:</h3>
                        <p>{department}</p>
                      </div>
                      <div>
                        <h3 className="fs-5">No. of Vacancy:</h3>
                        <p>{noVacancy}</p>
                      </div>
                    </div>

                    <div>
                      <h2>All candidates must:</h2>
                      {parse(requirements)}
                    </div>
                  </div>

                  {JobID !== null && JobID !== undefined && JobID.length > 0 ? (
                    <Link
                      href={`/jobs/${JobID}/application.aspx`}
                      title={`Application for ${position}`}
                    >
                      <Button className="googleBtn m-2">Continue</Button>
                    </Link>
                  ) : null}

                  <Link href="/jobs.aspx" title="Back to Jobs">
                    <Button variant="danger" className="googleBtn m-2">
                      Back to Jobs
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </main>
        </>
      ) : null}
    </>
  );
};

export default Home;
