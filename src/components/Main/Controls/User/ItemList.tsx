import React from "react";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const _ = require("lodash");

const ItemList = (props: any) => {
  const isLG = useMediaQuery("(min-width: 992px)");
  const darkMode = props.darkMode;
  return (
    <Table striped className={`${darkMode ? `table-dark` : ``} span-full`}>
      {isLG ? (
        <thead>
          <tr>
            <th className="fw-3">#</th>
            <th className="fw-3">Item</th>
            <th className="fw-3">Quantity</th>
            <th className="fw-3">Serial Number</th>
            <th className="fw-3">Fault Description</th>
            <th className="fw-3">Reason Code</th>
            <th className="fw-3"></th>
          </tr>
        </thead>
      ) : null}

      <tbody>
        {_.map(props.Items, (item: any, ind: any) => {
          return (
            <tr>
              {isLG ? (
                <>
                  <td>
                    <small>{ind + 1}</small>
                  </td>
                  <td>
                    <small>{item.Item}</small>
                  </td>
                  <td>
                    <small>{item.Quantity}</small>
                  </td>
                  <td>
                    <small>{item.SerialNo}</small>
                  </td>
                  <td>
                    <small>{item.FaultDescription}</small>
                  </td>
                  <td>
                    <small>{item.ReasonCode}</small>
                  </td>
                  <td>
                    <small>
                      <button
                        className="btn btn-primary rounded-circle"
                        onClick={() => {
                          props.onDeleteItem(item);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </small>
                  </td>
                </>
              ) : (
                <td>
                  <small>
                    <div className="d-grid cols-2 cols-sm-10">
                      <span className="fw-3 span-sm-3">#</span>
                      <span className="span-sm-7">{ind + 1}</span>
                    </div>
                    <div className="d-grid cols-2 cols-sm-10">
                      <span className="fw-3 span-sm-3">Item</span>
                      <span className="span-sm-7">{item.Item}</span>
                    </div>
                    <div className="d-grid cols-2 cols-sm-10">
                      <span className="fw-3 span-sm-3">Quantity</span>
                      <span className="span-sm-7">{item.Quantity}</span>
                    </div>
                    <div className="d-grid cols-2 cols-sm-10">
                      <span className="fw-3 span-sm-3">Serial Number</span>
                      <span className="span-sm-7">{item.SerialNo}</span>
                    </div>
                    <div className="d-grid cols-2 cols-sm-10">
                      <span className="fw-3 span-sm-3">Fault Description</span>
                      <span className="span-sm-7">{item.FaultDescription}</span>
                    </div>
                    <div className="d-grid cols-2 cols-sm-10">
                      <span className="fw-3 span-sm-3">Reason Code</span>
                      <span className="span-sm-7">{item.ReasonCode}</span>
                    </div>
                  </small>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ItemList;
