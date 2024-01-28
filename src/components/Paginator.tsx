"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";
import styles from "@/styles/Paginator.module.scss";

var _ = require("lodash");

const Paginator = (props: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  let totalPage: any = props.TotalPage;
  let active: any = props.ActivePage;
  let CSS: any = props.CSS;

  const [pagination, setPagination] = useState([]);
  let isSet = props.isReset;
  let pages = null;

  const next = () => {
    active = active + 1 <= totalPage ? active + 1 : totalPage;
    props.onSetActivePage(active);
  };

  const previous = () => {
    active = active - 1 < 0 ? 1 : active - 1;
    props.onSetActivePage(active);
  };

  const last = () => {
    active = totalPage;
    props.onSetActivePage(active);
  };

  const first = () => {
    active = 1;
    props.onSetActivePage(active);
  };

  const isLastPage = (currentPage: any) => {
    const lastPage = pagination.slice(-1);
    return currentPage === lastPage[0];
  };

  let firstThree = pagination.slice(0, 3);
  let prevActive = pagination.indexOf(active) - 1;
  let postActive = pagination.indexOf(active) + 2;
  let miniPaginate = pagination.slice(prevActive, postActive);

  const setActive = (page: any) => {
    active = page;
    props.onSetActivePage(active);
  };

  useEffect(() => {
    if (!isSet) {
      let pageArray: any = [];
      for (let page = 1; page <= totalPage; page++) {
        pageArray.push(page);
      }
      setPagination(pageArray);
      isSet = true;
    }
  }, [totalPage]);

  return (
    <>
      {totalPage !== undefined && totalPage !== null && totalPage > 1 ? (
        <nav aria-label={`Page navigation example`}>
          <ul
            className={`
              ${CSS}
              ${darkMode ? styles.DarkPagination : ``}
              pagination pagination-sm shadow
            `}
          >
            {active !== 1 ? (
              <li className="page-item">
                <Link
                  className="page-link"
                  href="#"
                  aria-label="First"
                  onClick={first}
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
            ) : null}
            {active !== 1 ? (
              <li className="page-item">
                <Link
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={previous}
                >
                  <span aria-hidden="true">&#x3c;</span>
                </Link>
              </li>
            ) : null}

            {active < 3
              ? firstThree.map((page) => {
                  return (
                    <li className="page-item" key={nanoid(5)}>
                      <button
                        className={
                          `page-link ` + (page === active ? `active` : ``)
                        }
                        onClick={() => setActive(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                })
              : null}

            {active > 2
              ? miniPaginate.map((page) => {
                  return (
                    <li className="page-item" key={nanoid(5)}>
                      <button
                        className={
                          `page-link ` + (page === active ? `active` : ``)
                        }
                        onClick={() => setActive(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                })
              : null}

            {!isLastPage(active) ? (
              <li className="page-item">
                <button className="page-link" title="Next" onClick={next}>
                  <span aria-hidden="true">&#x3e;</span>
                </button>
              </li>
            ) : null}

            {!isLastPage(active) ? (
              <li className="page-item">
                <Link
                  className="page-link"
                  href="#"
                  aria-label="Last"
                  onClick={last}
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </>
  );
};

export default Paginator;
