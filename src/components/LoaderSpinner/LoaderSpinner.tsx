import React from "react";
import styles from "@/styles/LoadingSpinner.module.css";
import { FaSpinner } from "react-icons/fa";

const LoaderSpinner = () => {
  return (
    <div className="rounded mx-auto w-100 h-100">
      <div
        className={`bg-secondary bg-opacity-10 p-5 text-center rounded shadow-2 h-100 d-flex align-items-center justify-content-center`}
      >
        <FaSpinner className={`${styles.Spinner} fs-1`} />
      </div>
    </div>
  );
};

export default LoaderSpinner;
