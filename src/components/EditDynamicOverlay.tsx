import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import styles from "@/styles/EditProductOverlay.module.scss";

const EditDynamicOverlay = (props: any) => {
  const pageid = props.pageid;

  return (
    <div className="position-fixed w-100 h-100 top-0 start-0 z-index-5 pe-none">
      <div className="position-absolute w-100 h-100 top-0 start-0 p-5 d-flex justify-content-end align-items-end fs-1 text-light">
        <div className={`${styles.Buttons} d-grid gap-3 pe-auto`}>
          <a
            href={`https://admin.evetech.co.za/NewAdmin/managepage.aspx?mode=edit&id=${pageid}`}
            title="Edit Dynamic Page"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={`${styles.RainbowBackground} fs-2 p-3 lh-1 rounded-circle shadow border-0`}
            >
              <FaEdit className="m-0" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditDynamicOverlay;
