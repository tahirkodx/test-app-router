import React from "react";
import { useContext } from "react";
import {
  FaAndroid,
  FaApple,
  FaDesktop,
  FaHistory,
  FaMobile,
  FaMobileAlt,
  FaOpera,
  FaChrome,
  FaEdge,
  FaInternetExplorer,
  FaSafari,
  FaFirefox,
  FaLinux,
  FaWindows,
  FaClock,
} from "react-icons/fa";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge, Card, Image, ListGroup } from "react-bootstrap";
import styles from "@/styles/User.module.scss";
import { useEffect } from "react";
import moment from "moment";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";

const RecentActivity = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [Activities, setActivities] = useState([]);
  const [initInfo, setInitInfo] = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const _ = require("lodash");

  const getUserRecentActivities = async () => {
    const activityData = await UserAPI.getUserActivity();
    console.log("activityData", activityData);
    if (activityData !== undefined && activityData.result !== undefined) {
      try {
        let userActivities = activityData.result;
        if (userActivities) setActivities(userActivities);
      } catch (e) {
        if (
          activityData.message !== undefined &&
          activityData.message === "Not authenticated."
        ) {
          if (authCtx.token === undefined) authCtx.onLogout();
          /* Show Login */
          /* once extend remove below code */
          authCtx.onLogout();
        }
      }
    }
  };

  useEffect(() => {
    if (!initInfo) {
      getUserRecentActivities();
      setInitInfo(true);
    }
  }, []);

  let mobileAct = _.filter(Activities, { isMobile: 1 });

  let pcAct = _.filter(Activities, { isDesktop: 1 });

  let macAct = _.filter(Activities, { isMac: 1 });

  const getSimpleTime = (time: any) => {
    let result = moment(time).subtract(2, "hours").format("LT");
    return result;
  };

  const getSimpleDate = (date: any) => {
    let result = moment(date).format("L");
    return result;
  };

  const browserIcon = (activity: any) => {
    return (
      <>
        {activity.isOpera ? (
          <Image
            src="https://www.evetech.co.za/repository/ProductImages/icons8-opera-48.png"
            alt="opera"
            style={{ height: "16px" }}
          />
        ) : null}
        {activity.isEdge ? (
          <Image
            src="https://www.evetech.co.za/repository/ProductImages/icons8-edge-48.png"
            alt="edge"
            style={{ height: "16px" }}
          />
        ) : null}
        {activity.isIE ? (
          <Image
            src="https://www.evetech.co.za/repository/ProductImages/icons8-internet-explorer-48.png"
            alt="internet explorer"
            style={{ height: "16px" }}
          />
        ) : null}
        {activity.isSafari ? (
          <Image
            src="https://www.evetech.co.za/repository/ProductImages/icons8-safari-48.png"
            alt="safari"
            style={{ height: "16px" }}
          />
        ) : null}
        {activity.isFirefox ? (
          <Image
            src="https://www.evetech.co.za/repository/ProductImages/icons8-firefox-48.png"
            alt="firefox"
            style={{ height: "16px" }}
          />
        ) : null}
        {activity.isChrome ? (
          <Image
            src="https://www.evetech.co.za/repository/ProductImages/icons8-chrome-48.png"
            alt="chrome"
            style={{ height: "16px" }}
          />
        ) : null}
      </>
    );
  };

  const isCardDark = () =>
    darkMode ? `bg-black bg-opacity-25 border-secondary border-opacity-25` : ``;

  const isPillDark = () =>
    darkMode ? `text-light border-secondary border-opacity-50` : `text-dark`;

  const imageClasses = `p-2 rounded bg-white mb-2`;

  const imageMax = `200px`;

  return (
    <>
      <div
        className={`
          d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom pb-3
          ${
            darkMode
              ? `border-secondary border-opacity-50 text-light`
              : `border-dark`
          }
        `}
      >
        <h2 className="m-0">
          <FaHistory type="FaHistory" /> My Activities
        </h2>
      </div>

      <div className="d-grid gap-3">
        {pcAct !== undefined && pcAct.length > 0 ? (
          <Card
            className={`
              p-2 p-xl-3 shadow
              ${isCardDark()}
            `}
          >
            <div className="d-grid cols-xl-10 gap-2 gap-xl-3">
              <section className="text-center position-relative span-md-3">
                <div className="position-sticky">
                  <Image
                    src="https://www.evetech.co.za/repository/ProductImages/green-desktop.jpg"
                    alt="green desktop"
                    style={{ maxWidth: imageMax }}
                    className={`${imageClasses}`}
                  />
                  <Heading level={3}>
                    {pcAct.length} {pcAct.length > 1 ? "sessions" : "session"}{" "}
                    on PC
                  </Heading>
                </div>
              </section>
              <section className="span-xl-7">
                <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2">
                  {pcAct.map((activity, index) => {
                    return (
                      <Badge
                        bg={darkMode ? `dark` : `light`}
                        className={`${isPillDark()} border rounded-5`}
                        key={index}
                      >
                        <small className="fw-1">
                          <div className="d-flex gap-1 flex-wrap align-items-center">
                            {browserIcon(activity)}

                            {activity.isWindows ? (
                              <Image
                                src="https://www.evetech.co.za/repository/ProductImages/windows-48.png"
                                alt="windows"
                                style={{ height: "16px" }}
                              />
                            ) : null}
                            {activity.isLinux ? (
                              <Image
                                src="https://www.evetech.co.za/repository/ProductImages/linux-48.png"
                                alt="linux"
                                style={{ height: "16px" }}
                              />
                            ) : null}

                            <span>
                              -{" "}
                              <span className="fw-3">
                                <FaClock />{" "}
                              </span>
                              {getSimpleDate(activity.createdAt)} -{" "}
                              {getSimpleTime(activity.createdAt)}
                            </span>
                          </div>
                        </small>
                      </Badge>
                    );
                  })}
                </div>
              </section>
            </div>
          </Card>
        ) : null}

        {mobileAct !== undefined && mobileAct.length > 0 ? (
          <Card
            className={`
              p-2 p-md-3 shadow
              ${isCardDark()}
            `}
          >
            <div className="d-grid cols-md-10">
              <section className="text-center position-relative span-md-3">
                <div className="position-sticky">
                  <Image
                    src="https://www.evetech.co.za/repository/ProductImages/green-mobile.jpg"
                    alt="green desktop"
                    style={{ maxWidth: imageMax }}
                    className={`${imageClasses}`}
                  />
                  <Heading level={3}>
                    {mobileAct.length}{" "}
                    {mobileAct.length > 1 ? "sessions" : "session"} on Mobile
                  </Heading>
                </div>
              </section>
              <section className="span-md-7">
                <div className="d-flex flex-wrap gap-2">
                  {mobileAct.map((activity, index) => {
                    return (
                      <Badge
                        bg={darkMode ? `dark` : `light`}
                        className={`${isPillDark()} border rounded-5`}
                        key={index}
                      >
                        <small className="fw-1">
                          <div className="d-flex gap-1 flex-wrap align-items-center">
                            {browserIcon(activity)}

                            {activity.isAndroid ? (
                              <Image
                                src="https://www.evetech.co.za/repository/ProductImages/android-48.png"
                                alt="windows"
                                style={{ height: "16px" }}
                              />
                            ) : null}
                            {activity.isiPhone ? (
                              <Image
                                src="https://www.evetech.co.za/repository/ProductImages/apple-48.png"
                                alt="windows"
                                style={{ height: "16px" }}
                              />
                            ) : null}

                            <span>
                              -{" "}
                              <span className="fw-3">
                                <FaClock />{" "}
                              </span>
                              {getSimpleDate(activity.createdAt)} -{" "}
                              {getSimpleTime(activity.createdAt)}
                            </span>
                          </div>
                        </small>
                      </Badge>
                    );
                  })}
                </div>
              </section>
            </div>
          </Card>
        ) : null}

        {macAct !== undefined && macAct.length > 0 ? (
          <Card
            className={`
              p-2 p-md-3 shadow
              ${isCardDark()}
            `}
          >
            <div className="d-grid cols-md-10">
              <section className="text-center position-relative span-md-3">
                <div className="position-sticky">
                  <Image
                    src="https://www.evetech.co.za/repository/ProductImages/green-pc.jpg"
                    alt="green pc"
                    style={{ maxWidth: imageMax }}
                    className={`${imageClasses}`}
                  />
                  <Heading level={3}>
                    {macAct.length} {macAct.length > 1 ? "sessions" : "session"}{" "}
                    on Mac
                  </Heading>
                </div>
              </section>
              <section className="span-md-7">
                <div className="d-flex flex-wrap gap-2">
                  {macAct.map((activity, index) => {
                    return (
                      <Badge
                        bg={darkMode ? `dark` : `light`}
                        className={`${isPillDark()} border rounded-5`}
                        key={index}
                      >
                        <small className="fw-1">
                          <div className="d-flex gap-1 flex-wrap align-items-center">
                            {browserIcon(activity)}

                            <span>
                              -{" "}
                              <span className="fw-3">
                                <FaClock />{" "}
                              </span>
                              {getSimpleDate(activity.createdAt)} -{" "}
                              {getSimpleTime(activity.createdAt)}
                            </span>
                          </div>
                        </small>
                      </Badge>
                    );
                  })}
                </div>
              </section>
            </div>
          </Card>
        ) : null}
      </div>
    </>
  );
};

export default RecentActivity;
