import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

function ContactDetails() {
  return (
    <>
      {/* <div>
        <FiMapPin />
        <p>
          <span>Evetech Pty Ltd. </span>
          <span>
            Limeroc Business Park, Holland Road (R114), Knoppieslaagte,
            Centurion 0157, Gauteng, South Africa
          </span>
        </p>
      </div> */}
      <Container fluid className="p-0 m-0" style={{ maxWidth: "250px" }}>
        <Row className={`align-items-center`}>
          <Col xs={2}>
            <FiPhone />
          </Col>
          <Col xs={10}>
            <p className={`m-0 fsz-1`}>(010) 786 0044</p>
          </Col>

          <Col xs={2}>
            <FiPhone />
          </Col>
          <Col xs={10}>
            <p className={`m-0 fsz-1`}>(012) 653 0033</p>
          </Col>

          <Col xs={2}>
            <FiMail />
          </Col>
          <Col xs={10}>
            <p className={`m-0 fsz-1`}>sales@evetech.co.za</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactDetails;
