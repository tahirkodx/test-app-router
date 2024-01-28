"use client";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/auth-context";
import { Alert, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
const _ = require("lodash");

const PalladiumSmallTable = (props: any) => {
  const authCtx = useContext(AuthContext);
  const [pallData, setPallData] = useState(props.pData);

  const currencyFormat = (num) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  useEffect(() => {}, [pallData, authCtx]);

  const tooltip = (tooltip) => <Tooltip id="tooltip">{tooltip}</Tooltip>;

  return (
    <>
      <div className="bg-secondary bg-gradient bg-opacity-50 p-2 mt-3 rounded">
        {!_.isEmpty(pallData) &&
          pallData !== null &&
          pallData.PartNumber !== undefined && (
            <>
              <section className="mt-2">
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
                          <small>Qty</small>
                        </small>
                      </th>
                      {authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835" &&
                        pallData.LastPurchasePrice !== undefined && (
                          <th className="fw-3">
                            <small>
                              <small>Cost</small>
                            </small>
                          </th>
                        )}
                      {authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835" &&
                        pallData.making !== undefined && (
                          <th className="fw-3">
                            <small>
                              <small>Mak</small>
                            </small>
                          </th>
                        )}
                      {authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835" &&
                        pallData.makingPer !== undefined && (
                          <th className="fw-3">
                            <small>
                              <small>%</small>
                            </small>
                          </th>
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <small>
                          <small>{parseInt(pallData.SumOnHand)}</small>
                        </small>
                      </td>
                      {authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835" &&
                        pallData.LastPurchasePrice !== undefined && (
                          <td>
                            {pallData.priceToolTip !== undefined ? (
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip(pallData.priceToolTip)}
                              >
                                <small>
                                  <small>
                                    {currencyFormat(pallData.LastPurchasePrice)}
                                  </small>
                                </small>
                              </OverlayTrigger>
                            ) : (
                              <small>
                                <small>
                                  {currencyFormat(pallData.LastPurchasePrice)}
                                </small>
                              </small>
                            )}
                          </td>
                        )}
                      {authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835" &&
                        pallData.making !== undefined && (
                          <td>
                            <small>
                              <small>{pallData.making}</small>
                            </small>
                          </td>
                        )}
                      {authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835" &&
                        pallData.makingPer !== undefined && (
                          <td>
                            <small>
                              <small>{pallData.makingPer}</small>
                            </small>
                          </td>
                        )}
                    </tr>
                  </tbody>
                </Table>
              </section>
            </>
          )}

        {_.isEmpty(pallData) && (
          <Alert variant={"danger"}>
            <h3>!!! Product Not Connected with Palladium.</h3>
          </Alert>
        )}
      </div>
    </>
  );
};

export default PalladiumSmallTable;
