"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import styles from "@/styles/PurchaseHistoryModal.module.scss";
import CustomeSpinner from "@/components/CustomeSpinner";
import { PalladiumAPI } from "@/custom/utils/actions";


const _ = require("lodash");
const PurchaseHistoryModal = (props:any) => {
  const [type, setType] = useState(props.type);
  const [partNumber, setPartNumber] = useState(props.part);
  const [partData, setPartData] = useState([]);
  const [pDocHistory, setPDocHistory] = useState([]);
  const [pDocNo, setPDocNo] = useState("");

  const [show, setShow] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name: "Document #",
      selector: (row:any) => (
        <span
          className="text-primary cursor-pointer"
          onClick={() => {
            setPDocNo(row.docno);
            handleShow();
          }}
        >
          {row.docno}
        </span>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Vendor",
      selector: (row:any) => row.VendorName,
      sortable: true,
      width: "160px",
    },
    {
      name: "Qty",
      selector: (row:any) => row.qty,
      sortable: true,
      width: "70px",
    },
    {
      name: "Price",
      selector: (row:any) => row.LastUnitCost,
      sortable: true,
      width: "80px",
    },
    {
      name: "Description",
      selector: (row:any) => <span title={row.des}>{row.des}</span>,
      sortable: true,
      width: "200px",
    },
    {
      name: "Transaction Date",
      selector: (row:any) => moment(row.tdate).format("dddd, MMM Do, YYYY"),
      sortable: true,
      width: "190px",
    },
    {
      name: "Location",
      selector: (row:any) => row.Location,
      sortable: true,
      width: "100px",
    },
    {
      name: "System Date",
      selector: (row:any) => moment(row.sdate).format("dddd, MMM Do, YYYY"),
      sortable: true,
    },
  ];

  const pDocCols = [
    {
      name: "Part Number",
      selector: (row:any) => row.PartNumber,
      sortable: true,
      width: "170px",
    },
    {
      name: "Item Description",
      selector: (row:any) => <span title={row.ItemDesc}>{row.ItemDesc}</span>,
      sortable: true,
      width: "260px",
    },
    {
      name: "Qty",
      selector: (row:any) => row.InvoiceQty,
      sortable: true,
      width: "80px",
    },
    {
      name: "Qty on Hand",
      selector: (row:any) => row.availQty,
      sortable: true,
      width: "120px",
    },
    {
      name: "Invoice Date",
      selector: (row:any) => moment(row.transDate).format("dddd, MMM Do, YYYY"),
      sortable: true,
      width: "180px",
    },
    {
      name: "Cost",
      selector: (row:any) => row.unitCost,
      sortable: true,
      width: "80px",
    },
    {
      name: "Referance",
      selector: (row:any) => row.VendorInv,
      sortable: true,
      width: "120px",
    },
    {
      name: "WebID",
      selector: (row:any) => row.webid,
      sortable: true,
      width: "90px",
    },
  ];

  useEffect(() => {
    const getPalladiumData = async () => {
      const pallProdData = await PalladiumAPI.getPurchaseHistoryDetail({
        PartNumber: partNumber,
      });
     
      if(pallProdData !== undefined && pallProdData !==null && pallProdData.result !==null && pallProdData.result !== undefined){
        let pallDataN = pallProdData.result;
        setPartData((prevData) => {
          prevData = pallDataN;
          return prevData;
        });
      }
    };

    if (partNumber !== undefined && partNumber.length > 0) {
      getPalladiumData();
    }
  }, []);

  useEffect(() => {}, [partNumber]);

  useEffect(() => {
    const getPDocHistory = async () => {

      const pDocData = await PalladiumAPI.getPurchaseInvoiceInfo({
        DocNo: pDocNo,
      }); 

      if(pDocData !== undefined && pDocData !==null && pDocData.result !==null && pDocData.result !== undefined){
        let pallDataN = pDocData.result;
        setPDocHistory((prevData) => {
          prevData = pallDataN;
          return prevData;
        });
      } 
   
    };

    if (pDocNo !== undefined && pDocNo.trim().length > 0) {
      getPDocHistory();
    }
  }, [pDocNo]);

  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Purchase History ({partData.length})
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <label className="label label-danger text-danger">
              {" "}
              <span className="fw-2">Total Purchase Qty :</span>{" "}
              {_.sum(
                _.map(partData, (part:any) => {
                  return part.qty;
                })
              )}
            </label>
          </Row>
          {!partData ? <CustomeSpinner variant="primary" /> : null}
          {partData !== undefined && partData.length > 0 && (
            <DataTable
              columns={columns}
              data={partData}
              pagination={true}
              striped={true}
              responsive={true}
              dense={true}
            />
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
        size="xl"
        centered
        className={styles.pDocModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{pDocNo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!pDocHistory ? <CustomeSpinner variant="primary" /> : null}
          {pDocHistory !== undefined && partData.length > 0 && (
            <DataTable
              columns={pDocCols}
              data={pDocHistory}
              pagination={true}
              striped={true}
              responsive={true}
              dense={true}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PurchaseHistoryModal;
