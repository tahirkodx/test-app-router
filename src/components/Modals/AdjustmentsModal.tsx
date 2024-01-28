import React from "react";
import { Modal, Table } from "react-bootstrap";

const AdjustmentsModal = (props:any) => {
    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Adjustments
            </Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Table
              striped
              bordered
              hover
              responsive
              size="sm"
              className="m-0 bg-light lh-1"
            >
              <thead className="bg-primary text-light">
                <tr>
                  <th className="fw-3">
                    <small>
                      <small>Web ID</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Part #</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Description</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Qty</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Warehouse Summary</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Last Price</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Average Cost</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Making</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Making %</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Category</small>
                    </small>
                  </th>
                  <th className="fw-3">
                    <small>
                      <small>Status</small>
                    </small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <small>
                      <small>1731</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>KF560C40BBK216</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>
                        Kingston Fury Beast 16GB (2 X 8GB) 6000 MT/s DDR5 Memory-
                        Black
                      </small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>19.00</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>DEFAULT: 19.00</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>$1.300.00</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>1300.00</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>481.74</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>37.06%</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>MEMORY &gt; Desktop DDR5</small>
                    </small>
                  </td>
                  <td>
                    <small>
                      <small>Active</small>
                    </small>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  
  export default AdjustmentsModal;