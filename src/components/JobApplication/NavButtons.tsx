import React from "react";
import styles from "@/styles/JobApplication.module.scss";
import { Button } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const NavButtons = ({
  formSection,
  isPersonalFilled,
  setFormSection,
  isAddressInfoFilled,
  isDocsFilled,
  checkJobBefore,
  jpid,
  email,
}: any) => {
  return (
    <>
      <div
        className={`${styles.NavButtons} z-index-2 w-100 d-flex justify-content-between order-2 order-lg-1 span-full pe-none`}
      >
        {formSection === "Personal" && isPersonalFilled() === true ? (
          <Button
            className={`${styles.RightNavBtn} pe-auto googleBtn rounded-0 ms-auto`}
            onClick={() => {
              setFormSection("Address");
            }}
          >
            <FaAngleRight />
          </Button>
        ) : null}

        {formSection === "Address" ? (
          <>
            <Button
              className={`${styles.LeftNavBtn} pe-auto googleBtn rounded-0`}
              onClick={() => {
                setFormSection("Personal");
              }}
            >
              <FaAngleLeft />
            </Button>
            {isAddressInfoFilled() ? (
              <Button
                className={`${styles.RightNavBtn} pe-auto googleBtn rounded-0`}
                onClick={() => setFormSection("Work")}
              >
                <FaAngleRight />
              </Button>
            ) : null}
          </>
        ) : null}
        {formSection === "Work" ? (
          <>
            <Button
              className={`${styles.LeftNavBtn} pe-auto googleBtn rounded-0`}
              onClick={() => setFormSection("Address")}
            >
              <FaAngleLeft />
            </Button>
            <Button
              className={`${styles.RightNavBtn} pe-auto googleBtn rounded-0`}
              onClick={() => setFormSection("Docs")}
            >
              <FaAngleRight />
            </Button>
          </>
        ) : null}
        {formSection === "Docs" ? (
          <>
            <Button
              className={`${styles.LeftNavBtn} pe-auto googleBtn rounded-0`}
              onClick={() => setFormSection("Work")}
              title="Go to Work Positions"
            >
              <FaAngleLeft />
            </Button>
            {isDocsFilled() === true ? (
              <Button
                className={`${styles.RightNavBtn} pe-auto googleBtn rounded-0`}
                onClick={() => {
                  checkJobBefore(jpid, email);
                  setFormSection("Confirm");
                }}
                title="Go to Confirmation"
              >
                <FaAngleRight />
              </Button>
            ) : null}
          </>
        ) : null}
        {formSection === "Confirm" ? (
          <Button
            className={`${styles.LeftNavBtn} pe-auto googleBtn rounded-0`}
            onClick={() => setFormSection("Docs")}
          >
            <FaAngleLeft />
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default NavButtons;
