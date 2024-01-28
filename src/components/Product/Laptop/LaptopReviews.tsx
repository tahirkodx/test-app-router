import Heading from "@/components/Heading";
import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const LaptopReviews = (props: any) => {
  /* const ProductID = props.ProductId; */
  const reviews = props.Reviews;
  let reviewData = null;
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  if (reviews) {
    reviewData = reviews.map((review: any, ind: any) => {
      return (
        <Card key={ind}>
          <Card.Header>
            <Row className="d-flex gap-1">
              <Col md={6} lg={6}>
                {review.ClientName}
                <br />
                {review.AddedDate}
              </Col>
              <Col md={6} lg={6} className="text-right"></Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Card.Text>{review.Pros}</Card.Text>
            </Row>
          </Card.Body>
        </Card>
      );
    });
  }

  return (
    <div
      className={`
        ${darkMode ? `bg-black text-white` : ``}
        px-3 py-2 card
      `}
    >
      <Heading level={2} className={`fs-3 m-0`}>
        {props.Heading}
      </Heading>
      <hr></hr>
      <span
        className={`
          ${darkMode ? `text-white` : ``}
        `}
      >
        {reviewData}
      </span>
    </div>
  );
};

export default LaptopReviews;
