import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaCopy, FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import styles from "@/styles/product/EditProductOverlay.module.scss";
import Swal from "sweetalert2";
import CopyToClipboard from "react-copy-to-clipboard";
import Link from "next/link";



const EditProductOverlay = (props:any) => {
    const productId = props.productId;
    const [ptype,setPtype] = useState<any>(props.pType !== undefined ? props.pType : 2);
    const [editMode, setEditMode] = useState(false);
  
    return (
      <div className="position-fixed w-100 h-100 top-0 start-0 z-index-5 pe-none">
        {editMode ? (
          <div
            className="position-absolute w-100 h-100 top-0 start-0 bg-light bg-opacity-75 pe-auto"
            onClick={() => setEditMode(false)}
          ></div>
        ) : null}
        <div className="position-absolute w-100 h-100 top-0 start-0 p-5 d-flex justify-content-end align-items-end fs-1 text-light ">
          <div className={`${styles.Buttons} d-grid gap-3 pe-auto`}>
            {editMode ? (
              <>
                <CopyToClipboard text={productId} onCopy={() => {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "PID Copied Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });}}>
                  <Button
                    variant="success"
                    className="fs-5 p-3 mx-2 lh-1 rounded-circle shadow bg-gradient"
                  >
                    <FaCopy className="m-0" />
                  </Button>
                </CopyToClipboard>
                <Link
                  className="fs-5 p-3 mx-2 lh-1 rounded-circle shadow bg-gradient btn btn-success"
                  href={ptype === 1 ? `http://admin.evetech.co.za/admin/editproduct.aspx?pid=${productId}` : ptype===2 ? `http://admin.evetech.co.za/admin/managecomponents.aspx?action=edit&pid=${productId}` : ptype===3 ? `http://admin.evetech.co.za/NewAdmin/ManageProduct.aspx?type=1&action=edit&pid=${productId}` : ''}
                  target="_blank" rel="noreferrer"
                >
                  <FaEdit className="m-0" />
                </Link>
              </>
            ) : null}
  
            <Button
              className={`${styles.RainbowBackground} fs-2 p-3 lh-1 rounded-circle shadow border-0`}
              onClick={
                editMode ? () => setEditMode(false) : () => setEditMode(true)
              }
            >
              {editMode ? (
                <FaMinus className="m-0" />
              ) : (
                <FaPlus className="m-0" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditProductOverlay;
  