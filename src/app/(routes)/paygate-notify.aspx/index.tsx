import React from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Col } from "react-bootstrap";
import { useState } from "react";

const PaygateNotify = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);

  return (
    <>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <main className="pt-3 px-3 pt-lg-5 pb-5 bg-secondary bg-opacity-25">
        <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
          Paygate Notify
        </Col>
      </main>
    </>
  );
};

export default PaygateNotify;
