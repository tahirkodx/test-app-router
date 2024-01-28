"use client";
import _ from "lodash";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React from "react";
import {
  Button,
  Container,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaExchangeAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import styles from "@/styles/Compare.module.scss";

const Compare = (props: any) => {
  const products = props.Products;
  const router = useRouter();
  // const { commonState } = useContext(CommonContext);
  // const darkMode = commonState.darkMode;

  const compareProduct = () => {
    if (products !== undefined && products.length > 1)
      router.push(
        "/compare/" +
          _.join(
            products.map((prod, ind) => {
              return prod.npid;
            }),
            ","
          )
      );
    else
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please select atleast 2 or more products for compare.",
        showConfirmButton: false,
        timer: 1500,
      });
  };

  return (
    <div
      className={`
        ${styles.Compare} 
        bg-dark text-light w-100 px-3 py-2`}
    >
      <Container>
        <div className={`d-grid gap-2 cols-6 align-items-center`}>
          <div className={`span-full d-flex gap-2 span-md-2`}>
            <h2 className={`fs-6 mb-0 text-warning`}>Compare Feature</h2>
            <p className={`${styles.CompareText} m-0`}>
              Please select up to 4 items to compare then click the
              &ldquo;Compare&ldquo; Button
            </p>
          </div>
          <div
            className={`${styles.CompareItems} span-4 d-grid cols-4 gap-2 span-md-3`}
          >
            {[...Array(4)].map((a, i) => {
              let prod = null;
              try {
                prod = products[i];
              } catch (e) {}

              let prodData =
                prod !== null && prod !== undefined ? (
                  <div className={`rounded`} key={nanoid(4)}>
                    <div className={`hide`}>{i + 1}</div>
                    <Image
                      src={`https://www.evetech.co.za/` + prod.imageurl}
                      alt={prod.name}
                    />
                  </div>
                ) : (
                  <div className={`rounded`} key={nanoid(4)}>
                    <div className={``}>{i + 1}</div>
                  </div>
                );

              return prod !== null && prod !== undefined ? (
                <OverlayTrigger
                  /* variant ="info" */
                  placement="top"
                  overlay={
                    <Tooltip className={`${styles.CompareTooltip}`}>
                      {" "}
                      {prod.url}
                    </Tooltip>
                  }
                  key={nanoid(4)}
                >
                  {prodData}
                </OverlayTrigger>
              ) : (
                prodData
              );
            })}
          </div>
          <div className={`span-2 span-md-1 d-grid`}>
            <Button
              variant="warning"
              className={`w-100 h-100 lh-1`}
              onClick={compareProduct}
            >
              <FaExchangeAlt /> Compare
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Compare;
