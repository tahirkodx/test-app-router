"use client";
import React, { useContext } from "react";
import {
  Alert,
  Button,
  OverlayTrigger,
  Stack,
  Table,
  Tooltip,
} from "react-bootstrap";
import SalesHistoryModal from "@/components/Modals/SalesHistoryModal";
import PurchaseHistoryModal from "@/components/Modals/PurchaseHistoryModal";
import AdjustmentsModal from "@/components/Modals/AdjustmentsModal";
import { useState } from "react";
import { useEffect } from "react";
import CustomeSpinner from "@/components/CustomeSpinner";
import { nanoid } from "nanoid";
import AuthContext from "@/store/auth-context";
import { PalladiumAPI } from "@/custom/utils/actions";


const _ = require("lodash");
const PalladiumTable = (props:any) => {
  const authCtx = useContext<any>(AuthContext);
  const [salesShow, setSalesShow] = useState(false);
  const [purchaseShow, setPurchaseShow] = useState(false);
  const [adjustShow, setAdjustShow] = useState(false);
  const [webId, setWebId] = useState(props.webId);
  const [pallData, setPallData] = useState<any>({});
  const [cPirce, setCPrice] = useState(props.cPrice);
  const [initSet, setInitSet] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (webId > 0) {
      const getPalladiumData = async () => {
        const pallProdData = await PalladiumAPI.getProductInfo({
          WebId: webId,
        });
       
        if (pallProdData !== undefined && pallProdData !==null && pallProdData.result !== undefined && pallProdData.result !== null && pallProdData.result.length > 0) {
          let pallRecord = pallProdData.result;
          let pallDataN = pallRecord[0];
          if (
            pallDataN !== undefined &&
            pallDataN.LastPurchasePrice !== undefined &&
            parseFloat(pallDataN.LastPurchasePrice) > 0
          ) {
            let making = 0;
            let makingPer = 0;
            let sumOnHandVal = 0;
            let avgPrice = 0;
            let price = 0;
            let priceInc = 0;
            let priceAvgInc = 0;
            let priceInc7per = 0;
            let priceAvgInc7per = 0;

            try {
              price = parseFloat(pallDataN.LastPurchasePrice);
            } catch (e) {}
            try {
              sumOnHandVal = parseFloat(pallDataN.SumOnHandValue);
            } catch (e) {}
            let sumOnHand = 0;
            try {
              sumOnHand = parseFloat(pallDataN.SumOnHand);
            } catch (e) {}

            if (sumOnHand > 0 && sumOnHandVal > 0)
              avgPrice = sumOnHandVal / sumOnHand;

            pallDataN.AvgPrice = avgPrice.toFixed(2);
            priceInc = Math.round((price * 15) / 100 + price);
            priceAvgInc = Math.round((avgPrice * 15) / 100 + avgPrice);

            priceInc7per = Math.round(
              (((price * 7) / 100 + price) * 15) / 100 +
                ((price * 7) / 100 + price)
            );
            priceAvgInc7per = Math.round(
              (((avgPrice * 7) / 100 + avgPrice) * 15) / 100 +
                ((avgPrice * 7) / 100 + avgPrice)
            );

            let priceToolTip = `Inc Vat: ${priceInc.toFixed(
              2
            )} - With 7%: ${priceInc7per.toFixed(2)}`;
            let priceAvgToolTip = `Inc Vat: ${priceAvgInc.toFixed(
              2
            )} - With 7%: ${priceAvgInc7per.toFixed(2)}`;

            pallDataN.priceToolTip = priceToolTip;
            pallDataN.priceAvgToolTip = priceAvgToolTip;

            let supplierExvatPrice = price;
            let currentExVatPrice = 0;

            if (cPirce > 0)
              currentExVatPrice = (parseFloat(cPirce) / 115) * 100;

            let diff = 0;
            if (currentExVatPrice > 0 && supplierExvatPrice > 0) {
              diff =
                (currentExVatPrice - supplierExvatPrice) / supplierExvatPrice;
            }

            let diffinRand = currentExVatPrice - supplierExvatPrice;

            making = diffinRand;

            diff = diff * 100;

            makingPer = diff;

            pallDataN.making = making.toFixed(2);
            pallDataN.makingPer = makingPer.toFixed(2) + "%";
          }

          setPallData((prevData) => {
            prevData = pallDataN;
            return prevData;
          });
        }

        setInitSet(true);
      };

      getPalladiumData();
    }
  }, [webId]);

  useEffect(() => {}, [pallData]);

  const currencyFormat = (num:any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const tooltip = (tooltip:any) => <Tooltip id="tooltip">{tooltip}</Tooltip>;

  const toggleReadMore = () => {
    setReadMore((current) => !current);
  };

  return (
    <div className="bg-secondary bg-gradient bg-opacity-50 p-2 mt-3 rounded">
      {_.isEmpty(pallData) && !initSet && <CustomeSpinner variant="primary" />}
      {!_.isEmpty(pallData) &&
        pallData !== null &&
        initSet &&
        pallData.PartNumber !== undefined && (
          <>
            {pallData.LastPurchasePrice !== undefined && (
              <section>
                <Stack direction="horizontal" gap={2}>
                  {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" &&
                      <Button
                        variant="light"
                        className="shadow text-primary border"
                        size="sm"
                        onClick={() => setSalesShow(true)}
                      >
                        <small>Sales History</small>
                      </Button>
                  }
                  {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && salesShow && (
                    <SalesHistoryModal
                      show={salesShow}
                      onHide={() => setSalesShow(false)}
                      type={1}
                      part={pallData.PartNumber}
                    />
                  )}
                  {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" &&
                    <Button
                      variant="light"
                      className="shadow text-primary border"
                      size="sm"
                      onClick={() => setPurchaseShow(true)}
                    >
                      <small>Purchase History</small>
                    </Button>
                  }
                  {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && purchaseShow && (
                    <PurchaseHistoryModal
                      show={purchaseShow}
                      onHide={() => setPurchaseShow(false)}
                      type={2}
                      part={pallData.PartNumber}
                    />
                  )}
                  {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && 
                    <>
                        <Button
                        variant="light"
                        className="shadow text-primary border"
                        size="sm"
                        onClick={() => setAdjustShow(true)}
                      >
                        <small>Adjustments</small>
                      </Button>
                      <AdjustmentsModal
                        show={adjustShow}
                        onHide={() => setAdjustShow(false)}
                      />
                    </>
                  }
                </Stack>
              </section>
            )}
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
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && pallData.LastPurchasePrice !== undefined && (
                      <th className="fw-3">
                        <small>
                          <small>Last Price</small>
                        </small>
                      </th>
                    )}
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && pallData.AvgPrice !== undefined && (
                      <th className="fw-3">
                        <small>
                          <small>Average Cost</small>
                        </small>
                      </th>
                    )}
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && pallData.making !== undefined && (
                      <th className="fw-3">
                        <small>
                          <small>Making</small>
                        </small>
                      </th>
                    )}
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && pallData.makingPer !== undefined && (
                      <th className="fw-3">
                        <small>
                          <small>Making %</small>
                        </small>
                      </th>
                    )}
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
                        <small>{pallData.webid}</small>
                      </small>
                    </td>
                    <td>
                      <small>
                        <small>{pallData.PartNumber}</small>
                      </small>
                    </td>
                    <td>
                      <small>
                        <small>
                          <div
                            style={{ height: !readMore ? "1em" : "" }}
                            className={`overflow-hidden`}
                          >
                            {pallData.PartDescription}
                          </div>
                          <div
                            className="text-primary mt-1 cursor-pointer"
                            onClick={toggleReadMore}
                          >
                            Read {!readMore ? "More" : "Less"}
                          </div>
                        </small>
                      </small>
                    </td>
                    <td>
                      <small>
                        <small>{pallData.SumOnHand}</small>
                      </small>
                    </td>
                    <td>
                      <small>
                        <small>{pallData.WarehouseSummary}</small>
                      </small>
                    </td>
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" && pallData.LastPurchasePrice !== undefined && (
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
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" &&  pallData.AvgPrice !== undefined && (
                      <td>
                        {pallData.priceToolTip !== undefined ? (
                          <OverlayTrigger
                            placement="top"
                            overlay={tooltip(pallData.priceAvgToolTip)}
                          >
                            <small>
                              <small>{currencyFormat(pallData.AvgPrice)}</small>
                            </small>
                          </OverlayTrigger>
                        ) : (
                          <small>
                            <small>{currencyFormat(pallData.AvgPrice)}</small>
                          </small>
                        )}
                      </td>
                    )}
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" &&  pallData.making !== undefined && (
                      <td>
                        <small>
                          <small>{pallData.making}</small>
                        </small>
                      </td>
                    )}
                    {authCtx !== undefined && authCtx.user !== undefined && authCtx.user.CID === "DE402835" &&  pallData.makingPer !== undefined && (
                      <td>
                        <small>
                          <small>{pallData.makingPer}</small>
                        </small>
                      </td>
                    )}
                    <td>
                      <small>
                        <small>{pallData.cat}</small>
                      </small>
                    </td>
                    <td>
                      <small>
                        <small>{pallData.status}</small>
                      </small>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </section>
          </>
        )}

      {_.isEmpty(pallData) && initSet && (
        <Alert variant={"danger"}>
          <h3>!!! Product Not Connected with Palladium.</h3>
        </Alert>
      )}
    </div>
  );
};

export default PalladiumTable;