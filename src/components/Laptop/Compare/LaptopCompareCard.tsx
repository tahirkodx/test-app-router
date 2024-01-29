"use client";
import FancyPrice from "@/components/FancyPrice";
import Heading from "@/components/Heading";
import Link from "next/link";
import { Badge, Image, Button } from "react-bootstrap";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import styles from "@/styles/Laptop/ComparePage.module.scss";
import {
  highlightText,
  isTextLinkDark,
  wasText,
  wasTextDark,
} from "@/components/Auth/LoginModal";

const LaptopCompareCard = (props: any) => {
  // const { commonState } = useContext(CommonContext);
  // const darkMode = commonState.darkMode;
  const darkMode = false;

  return (
    <div className={`${styles.Product} position-relative text-center`}>
      <div
        className={`${styles.ProductContent} d-flex flex-wrap justify-content-center gap-1 gap-md-2`}
      >
        <div className="bg-white rounded w-100 p-2">
          <div className="w-100">
            <Image
              src={`https://www.evetech.co.za/${props.BrandImage}`}
              alt={props.Brand}
              className={styles.ProductBrand}
            />
          </div>
          <div
            className={`${styles.ProductImage} d-flex justify-content-center align-items-center w-100`}
          >
            <Image fluid src={props.ProductImage} alt={props.ProductName} />
          </div>
        </div>
        <Heading level={2} className="fw-2 fs-6 m-0 w-100">
          {props.ProductName}
        </Heading>
        <div
          className={`${styles.ProductPrices} d-flex flex-wrap justify-content-center align-items-center w-100`}
        >
          <div className="fw-2 fs-6">
            <FancyPrice price={props.Price} />
          </div>
          <div>
            <small
              className={`
                ${wasTextDark(darkMode)}
                ${wasText}
              `}
            >
              <span>Was</span> R {props.OldPrice}
            </small>
          </div>
          <div>
            <small
              style={{ color: highlightText }}
              className={` 
                text-wrap
              `}
            >
              <span></span>Save R {props.OldPrice - props.Price}
            </small>
          </div>
        </div>
        <div>
          <Button variant="success" size="sm">
            <small>
              <FaShoppingCart /> Add to Cart
            </small>
          </Button>
        </div>
        <div>
          <div style={{ color: highlightText }}>
            <small>
              {props.ShippingCost === 0 ? "FREE Delivery!" : props.ShippingCost}
            </small>
          </div>
        </div>
        <div>
          <Badge
            bg={
              props.StockStatus === "In Stock With Evetech"
                ? "success"
                : "danger"
            }
            className="rounded-pill"
          >
            <div className="fw-1">{props.StockStatus}</div>
          </Badge>
        </div>
        <div className="w-100">
          {props.ReviewCount === 0 ? (
            <Link href="" className={`${isTextLinkDark(darkMode)}`}>
              <small>Be the first to review</small>
            </Link>
          ) : (
            "Great Product!"
          )}
        </div>
      </div>
      <Button
        variant="danger"
        size="sm"
        className="position-absolute top-0 end-0 d-flex align-items-center"
        onClick={() => props.onRemoveCompare(props.ProductId)}
      >
        <FaTimes />
      </Button>
    </div>
  );
};

export default LaptopCompareCard;
