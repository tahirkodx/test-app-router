"use client";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaDochub, FaPrint, FaRegEye, FaTimes } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AuthContext from "@/store/auth-context";
import { Row } from "react-bootstrap";
import styles from "@/styles/User.module.scss";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { EserverAPI } from "@/custom/utils/actions";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import { useTheme } from "@/store/ThemeContext";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "@/components/Auth/LoginModal";

const _ = require("lodash");
const ViewRequest = (props: any) => {
  const authCtx = useContext<any>(AuthContext);
  const [showView, setShowView] = useState<any>(false);
  const [formData, setFormData] = useState<any>({});
  const [formDetail, setFormDetail] = useState<any>([]);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const getFormData = async (formId: any) => {
    let auth: any =
      JSON.parse(localStorage.getItem("user_auth") as string) || null;
    const summary = await EserverAPI.findRMAByID({
      formId: formId,
      cid: authCtx.user.CID,
    });
    if (
      summary !== undefined &&
      summary !== null &&
      summary.result !== undefined &&
      summary.result !== null
    ) {
      let rmaData = summary.result;
      if (rmaData !== undefined && rmaData.length > 0) {
        setFormData(rmaData[0]);
      }
    }

    const formDetails = await EserverAPI.findRMAItemsByID({
      formId: formId,
      cid: authCtx.user.CID,
    });
    if (
      formDetails !== undefined &&
      formDetails !== null &&
      formDetails.result !== undefined &&
      formDetails.result !== null
    ) {
      let formSummDetail = formDetails.result;
      setFormDetail(formSummDetail);
    }
  };

  const getStatus = (status: any) => {
    switch (status) {
      case 1:
        return "Collection Arranged";
      case 2:
        return "Job Assigned";
      case 3:
        return "RMA Completed";
      default:
        return "Submited";
    }
  };

  const ref = useRef<any>();

  const ComponentToPrint = forwardRef<any>((props: any, ref: any) => {
    return (
      <div
        ref={ref}
        id="ref"
        style={{ width: "8.3in", height: "11.7in" }}
        className="border rounded p-5 text-center d-flex justify-content-center align-items-center"
      >
        <div>
          <section className="p-5 border rounded">
            <div>
              <h1>RMA Number:</h1>
              <p className="fs-3">{props.formNo}</p>
            </div>
          </section>
          <section className="p-5">
            <h2>Physical Address</h2>

            <p className="m-0">
              <strong className="fw-3">Evetech Pty Ltd.</strong>
              <br />
              Limeroc Business Park,
              <br />
              Holland Road (R114),
              <br />
              Knoppieslaagte,
              <br />
              Centurion,
              <br />
              0157
            </p>
            <h2 className="mt-2">Email</h2>
            <p>support@evetech.co.za</p>
          </section>
        </div>
      </div>
    );
  });

  ComponentToPrint.displayName = "ComponentToPrint";

  const sectionClasses = `
    p-2 rounded border span-full
    ${darkMode ? `border-secondary border-opacity-75` : ``}
  `;

  return (
    <>
      <Button
        size="sm"
        variant="info"
        className="lh-1"
        onClick={() => {
          getFormData(props.id);
          setShowView(true);
        }}
      >
        <FaRegEye /> View
      </Button>
      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        size="lg"
        className={darkMode ? darkFormStyles.main : ``}
      >
        <Modal.Header
          closeButton
          className={`
            ${darkMode ? darkModalStyles.darkHeader : ``}
            ${isDarkHeaderFooter(darkMode)}
          `}
        >
          <Modal.Title>Return Merchandise Authorization Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${isBodyDark(darkMode)}`}>
          {formData !== undefined && !_.isEmpty(formData) && (
            <Form className="d-grid gap-2 gap-md-3 cols-md-2">
              <section className={`${sectionClasses} d-grid gap-2`}>
                <Form.Group className="" controlId="ViewForm.Title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      formData !== undefined &&
                      !_.isEmpty(formData) &&
                      formData.Title
                    }
                    disabled
                    className={isInputDark(darkMode)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="" controlId="ViewForm.ClientName">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ClientName}
                    disabled
                    className={isInputDark(darkMode)}
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Form.Group className="col-sm" controlId="ViewForm.RMANo">
                    <Form.Label>RMA No</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.FormNo}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="col-sm" controlId="ViewForm.InvoiceNo">
                    <Form.Label>Invoice/Order No</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.InvoiceNo}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="col-sm" controlId="ViewForm.Status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      value={getStatus(formData.Status)}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </section>
              <section className={`${sectionClasses} d-grid gap-2`}>
                <Form.Label>
                  <span className="fw-2 fs-5">
                    Your Address (Product Collection Address)
                  </span>
                </Form.Label>
                <Form.Group
                  className=""
                  controlId="ViewForm.Collection.Address"
                >
                  <Form.Label>Your Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.Address}
                    disabled
                    className={isInputDark(darkMode)}
                  ></Form.Control>
                </Form.Group>
                <Row className="gap-2">
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.Collection.City"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.City}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.Collection.Province"
                  >
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.Province}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.Collection.PostalCode"
                  >
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.PostalCode}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </section>
              <section className={`${sectionClasses}`}>
                <Row className="gap-2">
                  <Form.Group className="col-sm" controlId="ViewForm.Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.Email}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.ContactPerson"
                  >
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.ContactPerson}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.PhoneNumber"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.Phone}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </section>
              <section className={`${sectionClasses}`}>
                <Form.Label>
                  <span className="fw-2 fs-5">
                    Shipping Address (Product Delivery Address)
                  </span>
                </Form.Label>
                <Form.Group className="" controlId="ViewForm.Shipping.Address">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ShipAddress}
                    disabled
                    className={isInputDark(darkMode)}
                  ></Form.Control>
                </Form.Group>
                <Row className="gap-2">
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.Shipping.City"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.ShipCity}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.Shipping.Province"
                  >
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.ShipProvince}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="col-sm"
                    controlId="ViewForm.Shipping.PostalCode"
                  >
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.ShipPostalCode}
                      disabled
                      className={isInputDark(darkMode)}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </section>
              <section className={`${sectionClasses}`}>
                <Form.Label>
                  <span className="fw-2 fs-5">Item Info</span>
                </Form.Label>
                <div className="d-grid gap-1">
                  {formDetail.map((Item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.ItemRow} lh-1 d-grid w-100 cols-sm-12`}
                      >
                        <div
                          className={`${styles.ItemRow__Section} d-grid cols-10 w-100 h-100 span-sm-2 d-sm-block`}
                        >
                          <div
                            className={`${styles.ItemRow__Heading} span-3 border p-1 bg-dark text-light`}
                          >
                            <small>#</small>
                          </div>
                          <div className={`span-7 border p-1 h-100`}>
                            <small>{index + 1}</small>
                          </div>
                        </div>
                        <div
                          className={`${styles.ItemRow__Section} d-grid cols-10 w-100 h-100 span-sm-2 d-sm-block`}
                        >
                          <div
                            className={`${styles.ItemRow__Heading} span-3 border p-1 bg-dark text-light`}
                          >
                            <small>Quantity</small>
                          </div>
                          <div className={`span-7 border p-1 h-100`}>
                            <small>{Item.Quantity}</small>
                          </div>
                        </div>
                        <div
                          className={`${styles.ItemRow__Section} d-grid cols-10 w-100 h-100 span-sm-2 d-sm-block`}
                        >
                          <div
                            className={`${styles.ItemRow__Heading} span-3 border p-1 bg-dark text-light`}
                          >
                            <small>Item</small>
                          </div>
                          <div className={`span-7 border p-1 h-100`}>
                            <small>{Item.Item}</small>
                          </div>
                        </div>
                        <div
                          className={`${styles.ItemRow__Section} d-grid cols-10 w-100 h-100 span-sm-2 d-sm-block`}
                        >
                          <div
                            className={`${styles.ItemRow__Heading} span-3 border p-1 bg-dark text-light`}
                          >
                            <small>Fault</small>
                          </div>
                          <div className={`span-7 border p-1 h-100`}>
                            <small>{Item.Fauldivescription}</small>
                          </div>
                        </div>
                        <div
                          className={`${styles.ItemRow__Section} d-grid cols-10 w-100 h-100 span-sm-2 d-sm-block`}
                        >
                          <div
                            className={`${styles.ItemRow__Heading} span-3 border p-1 bg-dark text-light`}
                          >
                            <small>Serial</small>
                          </div>
                          <div className={`span-7 border p-1 h-100`}>
                            <small>{Item.SerialNo}</small>
                          </div>
                        </div>
                        <div
                          className={`${styles.ItemRow__Section} d-grid cols-10 w-100 h-100 span-sm-2 d-sm-block`}
                        >
                          <div
                            className={`${styles.ItemRow__Heading} span-3 border p-1 bg-dark text-light`}
                          >
                            <small>Reason</small>
                          </div>
                          <div className={`span-7 border p-1 h-100`}>
                            <small>{Item.ReasonCode}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section className={`${sectionClasses} d-grid gap-2`}>
                <Form.Label>
                  <span className="fw-2 fs-5">Extra Info</span>
                </Form.Label>
                <Form.Group className="" controlId="ViewForm.Password">
                  <Form.Label>Password / PIN</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.Password}
                    disabled
                    className={isInputDark(darkMode)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="" controlId="ViewForm.Comments">
                  <Form.Label>Comments / Special instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.Comments}
                    disabled
                    className={isInputDark(darkMode)}
                  ></Form.Control>
                </Form.Group>
              </section>
            </Form>
          )}

          {_.isEmpty(formData) && (
            <section className="p-2 rounded border span-full text-center">
              <FaDochub size={"80px"} />
              <br></br>
              <span className="text-danger p-3">
                <small> No Form Details Found! Try again.</small>
              </span>
            </section>
          )}
        </Modal.Body>
        <Modal.Footer
          className={`
            ${isDarkHeaderFooter(darkMode)}
          `}
        >
          <span className="position-relative cursor-pointer">
            <Button variant="success">
              <FaPrint /> Print
            </Button>
            <ReactToPrint
              content={() => ref.current}
              pageStyle="@page { size: 8.3in 11.7in }"
              /* className="cursor-pointer" */
            >
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <div
                    className="position-absolute w-100 h-100 top-0 start-0"
                    onClick={handlePrint}
                  ></div>
                )}
              </PrintContextConsumer>
            </ReactToPrint>
          </span>
          <Button variant="danger" onClick={() => setShowView(false)}>
            <FaTimes />
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="position-fixed top-0 start-0 d-none">
        <ComponentToPrint /* formNo={formData.FormNo} */ ref={ref} />
      </div>
    </>
  );
};

export default ViewRequest;
