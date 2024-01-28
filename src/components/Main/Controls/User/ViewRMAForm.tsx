"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import styles from "@/styles/User.module.scss";
import { FaPrint } from "react-icons/fa";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { useRef } from "react";
import { forwardRef } from "react";
import AuthContext from "@/store/auth-context";
import { useContext } from "react";
import { EserverAPI } from "@/custom/utils/actions";

const ViewRMAForm = () => {
  const params: any = useParams();
  const authCtx = useContext<any>(AuthContext);
  const ref = useRef<any>();

  const [formData, setFormData] = useState<any>({});
  const [formDetail, setFormDetail] = useState<any>([]);

  let RMAID = 0;
  RMAID = params.formId;

  const findRMAByID = async (ID: any) => {
    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;

    const summary = await EserverAPI.findRMAByID({ formId: ID, cid: authCtx.user.CID });
    if(summary !== undefined && summary !== null && summary.result !== undefined && summary.result !== null){
      let rmaData = summary.result;
      if (rmaData !== undefined && rmaData.length > 0) {
        setFormData(rmaData[0]);
      }
    }
  };

  const findRMAItemsByID = async (ID: any) => {
    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
    const formDetails = await EserverAPI.findRMAItemsByID({ formId: ID, cid: authCtx.user.CID });
    if(formDetails !== undefined && formDetails !== null && formDetails.result !== undefined && formDetails.result !== null){
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
        return "Submitted";
    }
  };

  const ComponentToPrint = forwardRef((props: any, ref: any) => {
    return (
      <div ref={ref} id="ref" style={{ width: "9.8in", height: "13in" }}>
        <div className="p-3 text-center w-100 h-100 d-flex align-items-center">
          <Col md={{ span: 8, offset: 2 }}>
            <Image
              src="https://www.evetech.co.za/repository/ProductImages/evetech-logo-v11.jpg"
              alt="Evetech logo"
            />
            <section
              className="my-5 mx-3 rounded fs-2 p-3 py-5"
              style={{ border: "2px solid grey" }}
            >
              <h2>RMA No</h2>
              <p className="m-0">{formData !== undefined && formData.FormNo}</p>
            </section>
            <section>
              <h2>Physical Address</h2>
              <h3>Evetech Pty Ltd.</h3>
              <p>
                Limeroc Business Park, Holland Road (R114), Knoppieslaagte,
                Centurion 0157, Gauteng, South Africa{" "}
              </p>
            </section>
          </Col>
        </div>
      </div>
    );
  });

  ComponentToPrint.displayName = "ComponentToPrint";

  useEffect(() => {
    findRMAByID(RMAID);
    findRMAItemsByID(RMAID);
  }, [RMAID]);

  return (
    <>
      <div className="d-flex fle-wrap gap-2 justify-content-between">
        <h1 className="fs-2 m-0">Return Merchandise Authorization Form</h1>
        <span className="position-relative">
          <Button variant="success">
            <FaPrint /> Print
          </Button>
          <ReactToPrint
            content={() => ref.current}
            pageStyle="@page { size: 9.8in 13in }"
          >
            <PrintContextConsumer>
              {({ handlePrint }) => (
                <div
                  className="position-absolute w-100 h-100 top-0"
                  onClick={handlePrint}
                ></div>
              )}
            </PrintContextConsumer>
          </ReactToPrint>
        </span>
      </div>

      <Form className="d-grid gap-2 gap-md-3 cols-md-2">
        <section className="p-2 rounded border span-full d-grid gap-2">
          <Form.Group className="" controlId="ViewForm.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formData !== undefined && formData.Title}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group className="" controlId="ViewForm.ClientName">
            <Form.Label>Client Name</Form.Label>
            <Form.Control
              type="text"
              value={formData !== undefined && formData.ClientName}
              disabled
            ></Form.Control>
          </Form.Group>
          <Row>
            <Form.Group className="col-sm" controlId="ViewForm.RMANo">
              <Form.Label>RMA No</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.FormNo}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group className="col-sm" controlId="ViewForm.InvoiceNo">
              <Form.Label>Invoice/Order No</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.InvoiceNo}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group className="col-sm" controlId="ViewForm.Status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={getStatus(formData !== undefined && formData.Status)}
                disabled
              ></Form.Control>
            </Form.Group>
          </Row>
        </section>
        <section className="p-2 rounded border span-full d-grid gap-2">
          <Form.Label>
            <span className="fw-2 fs-5">
              Your Address (Product Collection Address)
            </span>
          </Form.Label>
          <Form.Group className="" controlId="ViewForm.Collection.Address">
            <Form.Label>Your Address</Form.Label>
            <Form.Control
              type="text"
              value={formData !== undefined && formData.Address}
              disabled
            ></Form.Control>
          </Form.Group>
          <Row className="gap-2">
            <Form.Group className="col-sm" controlId="ViewForm.Collection.City">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.City}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group
              className="col-sm"
              controlId="ViewForm.Collection.Province"
            >
              <Form.Label>Province</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.Province}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group
              className="col-sm"
              controlId="ViewForm.Collection.PostalCode"
            >
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.PostalCode}
                disabled
              ></Form.Control>
            </Form.Group>
          </Row>
        </section>
        <section className="p-2 rounded border span-full">
          <Row className="gap-2">
            <Form.Group className="col-sm" controlId="ViewForm.Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.Email}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group className="col-sm" controlId="ViewForm.ContactPerson">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.ContactPerson}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group className="col-sm" controlId="ViewForm.PhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.Phone}
                disabled
              ></Form.Control>
            </Form.Group>
          </Row>
        </section>
        <section className="p-2 rounded border span-full ">
          <Form.Label>
            <span className="fw-2 fs-5">
              Shipping Address (Product Delivery Address)
            </span>
          </Form.Label>
          <Form.Group className="" controlId="ViewForm.Shipping.Address">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              type="text"
              value={formData !== undefined && formData.ShipAddress}
              disabled
            ></Form.Control>
          </Form.Group>
          <Row className="gap-2">
            <Form.Group className="col-sm" controlId="ViewForm.Shipping.City">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.ShipCity}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group
              className="col-sm"
              controlId="ViewForm.Shipping.Province"
            >
              <Form.Label>Province</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.ShipProvince}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group
              className="col-sm"
              controlId="ViewForm.Shipping.PostalCode"
            >
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                value={formData !== undefined && formData.ShipPostalCode}
                disabled
              ></Form.Control>
            </Form.Group>
          </Row>
        </section>
        <section className="p-2 rounded border span-full">
          <Form.Label>
            <span className="fw-2 fs-5">Item Info</span>
          </Form.Label>
          <div className="d-grid gap-1">
            {formDetail &&
              formDetail !== undefined &&
              formDetail.length > 0 &&
              formDetail.map((Item: any, index: any) => {
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
                        <small>{Item.FaultDescription}</small>
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
        <section className="p-2 rounded border span-full d-grid gap-2">
          <Form.Label>
            <span className="fw-2 fs-5">Extra Info</span>
          </Form.Label>
          <Form.Group className="" controlId="ViewForm.Password">
            <Form.Label>Password / PIN</Form.Label>
            <Form.Control
              type="password"
              value={formData !== undefined && formData.Password}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group className="" controlId="ViewForm.Comments">
            <Form.Label>Comments / Special instructions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData !== undefined && formData.Comments}
              disabled
            ></Form.Control>
          </Form.Group>
        </section>
      </Form>
      <div className="d-none">
        <ComponentToPrint ref={ref} />
      </div>
    </>
  );
};

export default ViewRMAForm;
