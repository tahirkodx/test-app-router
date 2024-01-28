import React from "react";
import { Form } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RegValLabel = (props) => {
  return (
    <Form.Label
      className={`${
        props.mainValue.length > 0 ? `justify-content-between` : ``
      } d-flex w-100 gap-2`}
    >
      <span>{props.label}</span>
      <div>
        <small>
          <div
            className={`
                d-flex gap-1 align-items-center
                ${props.validator ? `text-success` : `text-danger`}
            `}
          >
            {props.mainValue.length > 0 ? (
              props.validator ? (
                <span
                  className={`${
                    props.hideValidateText !== undefined &&
                    props.hideValidateText
                      ? `d-none`
                      : ``
                  }`}
                >
                  <FaCheckCircle /> Valid
                </span>
              ) : (
                <span
                  className={`${
                    props.hideValidateText !== undefined &&
                    props.hideValidateText
                      ? `d-none`
                      : ``
                  }`}
                >
                  <FaTimesCircle /> Invalid
                </span>
              )
            ) : (
              <span
                className={`${
                  props.notImportant !== undefined && props.notImportant
                    ? `d-none`
                    : ``
                }`}
              >
                *
              </span>
            )}
          </div>
        </small>
      </div>
    </Form.Label>
  );
};

export default RegValLabel;
