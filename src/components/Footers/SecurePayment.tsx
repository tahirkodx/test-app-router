import React from "react";
import SectionHeading from "./SectionHeading";
import Text from "../Text";
import { BiSolidCheckShield } from "react-icons/bi";
import { Button, Image } from "react-bootstrap";
import Link from "next/link";
import { FaCcMastercard, FaCcVisa, FaCheckDouble } from "react-icons/fa";

const SecurePayment = () => {
  return (
    <>
      <SectionHeading>Secure Payments</SectionHeading>
      <div className={`d-flex gap-2 flex-wrap mb-2`}>
        <div className={`d-flex gap-1 align-items-center`}>
          <Text className={`m-0 wght-5 fst-italic lh-1`}>
            <span className={`fs-2`}>
              <BiSolidCheckShield />
            </span>{" "}
            <span className={`fs-2`}>SSL</span>
          </Text>
          <small>
            <small>
              <Text className={`m-0 lh-1`}>
                Secure <br /> Payment
              </Text>
            </small>
          </small>
        </div>
        <Image
          src={`https://www.evetech.co.za/repository/ProductImages/verified-by-visa-white.png`}
          alt={`Verified by Visa`}
          width={75}
          className="object-fit-contain"
        />
        <Image
          src={`https://www.evetech.co.za/repository/ProductImages/mastercard-securecode-white.png`}
          alt={`Mastercode SecureCode`}
          width={85}
          className="object-fit-contain"
        />
        <FaCcVisa className={`fs-1`} />
        <FaCcMastercard className={`fs-1`} />
      </div>
    </>
  );
};

export default SecurePayment;
