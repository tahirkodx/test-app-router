import React from "react";
import Card from "react-bootstrap/Card";
import styles from "@/styles/User.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaIconDynamic as Icon } from "@ui-layouts";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import ViewRequest from "@/components/Main/Controls/User/ViewRequest";
import UserAPI from "@/custom/utils/actions/user";
import { sum } from "lodash";
import { useTheme } from "@/store/ThemeContext";
import Heading from "../Heading";

const Warranty = () => {
  const authCtx = useContext<any>(AuthContext);
  const router = useRouter();
  const [rmaList, setRmaList] = useState<any>([]);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      /* get token validate token */

      const rmaSummary = async () => {
        const summary = await UserAPI.getRMAFormList({ cid: authCtx.user.CID });
        if (summary !== undefined && summary.result !== undefined) {
          try {
            let formList = summary.result;
            setRmaList(formList);
          } catch (e) {
            if (
              summary.message !== undefined &&
              summary.message === "Not authenticated."
            ) {
              if (authCtx.token === undefined) authCtx.onLogout();
              /* Show Login */
              /* once extend remove below code */
              authCtx.onLogout();
            }
          }
        }
      };

      rmaSummary();
    } else {
      router.push("/");
    }
  }, []);

  const getStatus = (status: any) => {
    switch (status) {
      case 1:
        return "Collection Arranged";
      case 2:
        return "Job Assigned";
      case 3:
        return "RMA Completed";
      default:
        return "Submited";
    }
  };

  return (
    <>
      <div
        className={`
          d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom pb-3
          ${darkMode ? `border-secondary border-opacity-50` : `border-dark`}
        `}
      >
        <Heading level={2} className="m-0">
          <Icon
            type="FaUndoAlt"
            className={`${darkMode ? `text-light` : ``}`}
          />{" "}
          Return Requests
        </Heading>
      </div>
      <Card
        className={`
          shadow overflow-hidden
          ${darkMode ? `bg-black bg-opacity-25` : ``}
        `}
      >
        {/* rmaList */}
        {rmaList.map((Request: any, index: any) => {
          return (
            <div
              key={index}
              className={`
                ${styles.Requests__Row} 
                ${
                  darkMode
                    ? `border-secondary border-opacity-50 text-light`
                    : ``
                }
                d-grid border-bottom cols-md-10 lh-1 mb-2 mb-md-0
              `}
            >
              <div className="d-grid cols-10 d-md-block span-md-1">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Form No.</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <small>{Request.FormNo}</small>
                </div>
              </div>
              <div className="d-grid cols-10 d-md-block span-md-3">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Title</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <small>{Request.Title}</small>
                </div>
              </div>
              <div className="d-grid cols-10 d-md-block span-md-1">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Invoice No.</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <small>{Request.InvoiceNo}</small>
                </div>
              </div>
              <div className="d-grid cols-10 d-md-block span-md-1">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Contact</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <small>{Request.ContactPerson}</small>
                </div>
              </div>
              <div className="d-grid cols-10 d-md-block span-md-1">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Status</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <small>{getStatus(Request.Status)}</small>
                </div>
              </div>
              <div className="d-grid cols-10 d-md-block span-md-2">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Submit On</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <small>{new Date(Request.CreatedAt).toUTCString()}</small>
                </div>
              </div>
              <div className="d-grid cols-10 d-md-block span-md-1">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Link</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <ViewRequest id={Request.FormId} />
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
};

export default Warranty;
