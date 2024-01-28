"use client";
import styles from "@/styles/NoticeBoard.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

import React, { useState } from "react";
import Link from "next/link";

function NoticeBoard() {
  const [show, setShow] = useState(false);
  const isBig = useMediaQuery("(min-width: 1200px)");
  const [showTopMessage, setShowTopMessage] = useState(false);

  return (
    <>
      {showTopMessage && (
        <div className={`${styles.Main} p-2 py-1`}>
          <p
            className={`${styles.Paragraph} ${
              isBig ? null : show ? null : `${styles.Closed}`
            }`}
          >
            {isBig ? null : show ? (
              <FaArrowCircleUp
                className={`${styles.Icon} me-1`}
                onClick={() => setShow(!show)}
              />
            ) : (
              <FaArrowCircleDown
                className={`${styles.Icon} me-1`}
                onClick={() => setShow(!show)}
              />
            )}
            <small>
              Spring has arrived and it&apos;s time to start cleaning out the old
              components, there&apos;s never been a better time to upgrade your
              setup!
              <Link className={`${styles.Link}`} href="/link" title="FAQ Section">
                FAQ Section
              </Link>
              <Link
                className={`${styles.Link}`}
                href="/link"
                title="Covid 19 Information"
              >
                COVID-19 Info
              </Link>
            </small>
          </p>
        </div>
      )}
    </>
  );
}

export default NoticeBoard;
