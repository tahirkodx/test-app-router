import { ComponentsHeader } from "@/components/Home";
import { HelpDesk } from "@/custom/utils/actions";
import Head from "next/head";
import React, { useState } from "react";
import { Button, Col, Form, Image, Stack } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "@/styles/Contact.module.scss";
import {
  FaBuilding,
  FaCheck,
  FaEnvelopeOpen,
  FaFax,
  FaInfoCircle,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import ContactForm from "@/components/Contact/ContactForm";
import { useTheme } from "@/store/ThemeContext";
import darkFormStyles from "@/styles/DarkForm.module.scss";

const Home = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [unsubEmail, setUnSubEmail] = useState("");
  const [unsubName, setUnSubName] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const clearUnSubForm = () => {
    setUnSubEmail("");
    setUnSubName("");
  };

  const UnSubscribe = async () => {
    let description = `
      <p>
        Request Recieved for Unsubscribe for mailer: <br>
        <strong>Name: </strong>${unsubName}<br>
        <strong>Email: </strong>${unsubEmail}
      </p>
    `;

    const ticketResp = await HelpDesk.createTicket({
      ticketData: {
        name: unsubName,
        email: unsubEmail,
        phone: "",
        subject: "Unsubscribe Request",
        description: description,
        status: 2,
        priority: 1,
        source: 2,
        type: "Sales",
        tags: ["Unsubscribe"],
      },
    });

    let ticket = ticketResp.result;
    if (ticket.id !== undefined) {
      Swal.fire({
        icon: "success",
        title: "Yeh!",
        text: `Your request has been submitted! [Ticket No. ${ticket.id}]`,
      });
      clearUnSubForm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your question is not submitted. Please try again",
      });
    }
  };

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Contact Evetech Custom built Computers - Buy cheap computers &
          discount gaming PCs
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
          pt-3 pt-lg-5 pb-5
          ${darkMode ? `evetechDark bg-black text-light` : ``}
        `}
      >
        <section>
          <Col
            xs={12}
            md={{ span: 10, offset: 1 }}
            xxl={{ span: 6, offset: 3 }}
            className="p-3 p-md-0"
          >
            <div className="d-grid gap-3 gap-lg-5 cols-md-2 align-items-center">
              <div className="text-center">
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/contact-evetech-helpdesk-880px.png"
                  alt="Contact Evetech Helpdesk"
                  className={`${styles.HeroImage} w-100`}
                />
              </div>
              <div className="my-md-5">
                <h1>
                  <span className={`${styles.MainHeading__Part1}`}>
                    Contact us
                  </span>
                  <br></br>
                  <span className={`${styles.MainHeading__Part2}`}>
                    here for you
                  </span>
                </h1>
                <p>
                  Here at Evetech we&apos;re always on hand to assist with your
                  queries whether its regarding our products, or if you simply
                  need some advice regarding a product or service we offer.
                </p>
                <p className="m-0">
                  Our highly specialised sales team are available to answer any
                  questions you may have so please feel free to reach out to us.
                </p>
              </div>
            </div>
          </Col>
        </section>
        <section
          className={`
            ${styles.BlueGradient} 
            py-5 px-3 text-center position-relative
          `}
        >
          <div
            className={`${
              darkMode
                ? `bg-black bg-opacity-50 position-absolute top-0 start-0 w-100 h-100`
                : `d-none`
            }`}
          ></div>
          <h2 className="text-light position-relative">Contact Evetech On</h2>
          <Col
            xs={12}
            md={{ span: 10, offset: 1 }}
            xxl={{ span: 6, offset: 3 }}
            className="p-3 p-md-0 position-relative"
          >
            <div className="d-grid gap-3 cols-md-3">
              <Stack gap={2}>
                <div>
                  <FaFax />
                </div>
                <div className="text-light">086 517 7724</div>
              </Stack>
              <Stack gap={2}>
                <div>
                  <FaPhone />
                </div>
                <div className="text-light">
                  <p className="m-0">010 786 0044</p>
                  <p className="m-0">012 653 0033</p>
                </div>
              </Stack>
              <Stack gap={2}>
                <div>
                  <FaEnvelopeOpen />
                </div>
                <div className="text-light">
                  <p className="m-0">SALES@EVETECH.CO.ZA</p>
                  <p className="m-0">SUPPORT@EVETECH.CO.ZA</p>
                </div>
              </Stack>
              <Stack gap={2} className="span-full">
                <div>
                  <FaBuilding />
                </div>
                <div className="text-light">
                  <p className="m-0">
                    EVETECH PTY LTD. LIMEROC BUSINESS PARK, HOLLAND ROAD (R114),
                    KNOPPIESLAAGTE, CENTURION, 0157, GAUTENG, SOUTH AFRICA
                  </p>
                </div>
              </Stack>
            </div>
          </Col>
        </section>
        <section className="py-5 px-3 text-center">
          <h2 className={`${styles.SubHeading}`}>Opening Times</h2>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            <p className="m-0">
              <span className="fw-3">Monday to Friday: </span>
              <span>9AM - 4PM</span>
            </p>
            <span className="text-secondary text-opacity-50">|</span>
            <p className="m-0">
              <span className="fw-3">Saterday: </span>
              <span>9AM - 12PM</span>
            </p>
            <span className="text-secondary text-opacity-50">|</span>
            <p className="m-0">(Closed Bank Holidays)</p>
          </div>
        </section>
        <section className="py-5 px-3 bg-opacity-25 bg-secondary text-center">
          <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
            <div className="d-grid gap-3 cols-lg-2">
              <div>
                <h2 className={`${styles.SubHeading}`}>Contact Form</h2>
                <p>
                  Please fill in the form below, entering as much detail as
                  possible (including product names and quantaties etc) and a
                  member of our sales team will get back to you as soon as
                  possible:
                </p>
                <Button
                  variant="primary"
                  className="googleBtn"
                  onClick={() => setModalShow(true)}
                >
                  Fill in Contact Form
                </Button>
              </div>
              <div>
                <h2 className={`${styles.SubHeading}`}>Unsubscribe</h2>
                <Form
                  className={`${
                    darkMode ? darkFormStyles.main : ``
                  } d-grid cols-sm-2 gap-3`}
                >
                  <Form.Group
                    className="mb-3 mb-sm-0 text-start"
                    controlId="unSubContactName"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter name here"
                      required
                      value={unsubName}
                      onChange={(event) => setUnSubName(event.target.value)}
                      className={`${
                        darkMode ? `bg-black text-light border-secondary` : ``
                      }`}
                    />
                    <Form.Text className={darkMode ? `text-light` : ``}>
                      {unsubName.length === 0 ? (
                        <span>
                          Name required <span className="text-danger">*</span>
                        </span>
                      ) : null}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 mb-sm-0 text-start"
                    controlId="unSubContactEmail"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Enter email here"
                      required
                      value={unsubEmail}
                      onChange={(event) => setUnSubEmail(event.target.value)}
                      className={`${
                        darkMode ? `bg-black text-light border-secondary` : ``
                      }`}
                    />
                    <Form.Text className={darkMode ? `text-light` : ``}>
                      {unsubEmail.length === 0 ? (
                        <span>
                          Email required <span className="text-danger">*</span>
                        </span>
                      ) : null}
                      {validateEmail(unsubEmail) ? (
                        <span className="text-success">
                          <FaCheck /> Email Address Valid
                        </span>
                      ) : null}
                      {!validateEmail(unsubEmail) && unsubEmail.length > 0 ? (
                        <span className="text-danger">
                          <FaTimes /> Email Address Not Valid
                        </span>
                      ) : null}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="span-full">
                    {validateEmail(unsubEmail) && unsubName.length > 0 ? (
                      <Button
                        variant="primary"
                        className="googleBtn"
                        onClick={UnSubscribe}
                      >
                        Submit Request
                      </Button>
                    ) : (
                      <span className="text-secondary">
                        <FaInfoCircle /> Please fill in all fields with valid
                        information
                      </span>
                    )}
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </section>
        <section
          className={`
            ${styles.BlueGradient} 
            py-5 px-3 text-center position-relative
          `}
        >
          <div
            className={`${
              darkMode
                ? `bg-black bg-opacity-50 position-absolute top-0 start-0 w-100 h-100`
                : `d-none`
            }`}
          ></div>
          <Col
            xs={12}
            md={{ span: 10, offset: 1 }}
            xxl={{ span: 6, offset: 3 }}
            className="p-3 p-md-0 position-relative"
          >
            <h2 className="text-light">Evetech on Google Maps</h2>
            <p className="text-light">
              We are located in Centurion the heart of pretoria and have plenty
              of free parking. You may find this map of our location useful.
            </p>
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
          </Col>
        </section>
      </main>

      <ContactForm show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Home;
