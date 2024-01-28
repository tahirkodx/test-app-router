"use client";
import moment from "moment";
import { nanoid } from "nanoid";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Modal, Row, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import CustomeSpinner from "@/components/CustomeSpinner";
import styles from "@/styles/SalesHistoryModal.module.scss";
import { PalladiumAPI } from "@/custom/utils/actions";

const _ = require("lodash");
const SalesHistoryModal = (props:any) => {
  const [type, setType] = useState(props.type);
  const [partNumber, setPartNumber] = useState(props.part);
  const [partData, setPartData] = useState<any[]>([]);
  const [histData, setHistData] = useState<any>({});
  const columns = [
    {
      name: "No.#",
      selector: (row:any) => row.no,
      sortable: true,
      width: "80px",
    },
    {
      name: "Document #",
      selector: (row:any) => row.docno,
      sortable: true,
      width: "140px",
    },
    {
      name: "Order No.",
      selector: (row:any) => row.Reference,
      sortable: true,
      width: "140px",
    },
    {
      name: "Customer",
      selector: (row:any) => row.cname,
      sortable: true,
      width: "140px",
    },
    {
      name: "Qty",
      selector: (row:any) => row.Qty,
      sortable: true,
      width: "80px",
    },
    {
      name: "Transaction Date",
      selector: (row:any) => row.tdate,
      sortable: true,
    },
    {
      name: "Customer Code",
      selector: (row:any) => row.ccode,
      sortable: true,
      width: "140px",
    },
    {
      name: "Agent",
      selector: (row:any) => row.Agent,
      sortable: true,
      width: "140px",
    },
  ];

  useEffect(() => {
    const getPalladiumData = async () => {
      const pallProdData = await PalladiumAPI.getSalesHistoryDetail({ 
        PartNumber: partNumber 
      }); 

      if(pallProdData !== undefined && pallProdData !== null && pallProdData.result !== null && pallProdData.result !== undefined)
      {
        let pallDataN = pallProdData.result;
        let i = 1;  
        _.map(pallDataN, (data) => {
          data.no = i++;
          data.tdate = moment(data.tdate).format("dddd, MMM Do, YYYY");
        });
        setPartData((prevData) => {
          prevData = pallDataN;
          return prevData;
        });
      }
    };

    const getSalesHistory = async () => {
      const pallProdData = await PalladiumAPI.getSalesHistory({ 
        PartNumber: partNumber 
      }); 

      if(pallProdData !== undefined && pallProdData !== null && pallProdData.result !== null && pallProdData.result !== undefined)
      {
        let pallDataN = pallProdData.result[0];
        setHistData((prevData) => {
          prevData = pallDataN;
          return prevData;
        });
      }
    };

    if (partNumber !== undefined && partNumber.length > 0) {
      getPalladiumData();
      getSalesHistory();
    }
  }, []);

  useEffect(() => {}, [partNumber]);

  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.SalesHistoryModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sales History ({partData.length}) Orders
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!histData ? <CustomeSpinner variant="primary" /> : null}
          {histData !== undefined && histData.LastTill !== undefined && (
            <div className="d-flex flex-wrap gap-2">
              <span className="d-flex rounded-pill overflow-hidden border f-13">
                <span className="p-1 px-2 bg-danger text-light bg-gradient">
                  7 Days
                </span>
                <span className="p-1 px-2 bg-dark text-light">
                  <small>
                    {histData.Last7Days !== null ? histData.Last7Days : 0}
                  </small>
                </span>
              </span>

              <span className="d-flex rounded-pill overflow-hidden border f-13">
                <span className="p-1 px-2 bg-primary text-light bg-gradient">
                  15 Days
                </span>
                <span className="p-1 px-2 bg-dark text-light">
                  <small>
                    {histData.Last15Days !== null ? histData.Last15Days : 0}
                  </small>
                </span>
              </span>

              <span className="d-flex rounded-pill overflow-hidden border f-13">
                <span className="p-1 px-2 bg-success text-light bg-gradient">
                  30 Days
                </span>
                <span className="p-1 px-2 bg-dark text-light">
                  <small>
                    {histData.Last30Days !== null ? histData.Last30Days : 0}
                  </small>
                </span>
              </span>

              <span className="d-flex rounded-pill overflow-hidden border f-13">
                <span className="p-1 px-2 bg-warning text-dark bg-gradient">
                  60 Days
                </span>
                <span className="p-1 px-2 bg-dark text-light">
                  <small>
                    {histData.Last60Days !== null ? histData.Last60Days : 0}
                  </small>
                </span>
              </span>

              <span className="d-flex rounded-pill overflow-hidden border f-13">
                <span className="p-1 px-2 bg-info text-dark bg-gradient">
                  90 Days
                </span>
                <span className="p-1 px-2 bg-dark text-light">
                  <small>
                    {histData.Last90Days !== null ? histData.Last90Days : 0}
                  </small>
                </span>
              </span>

              <span className="d-flex rounded-pill overflow-hidden border ms-auto f-13">
                <span className="p-1 px-2 bg-dark text-light bg-gradient fw-3">
                  Total
                </span>
                <span className="p-1 px-2 bg-dark text-light">
                  <small>
                    {histData.LastTill !== null ? histData.LastTill : 0}
                  </small>
                </span>
              </span>
            </div>
          )}
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
    </>
  );
};

export default SalesHistoryModal;
