import React, { useContext, useMemo, useState } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "@/styles/Specials/Specials.module.scss";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import parse from "html-react-parser";
import useClickScroll from "@/custom/hooks/useClickScroll";
import { Helmet } from "react-helmet";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { FetchReactInfo } from "@/custom/utils/Helper";
import SectionLinks from "@/components/Specials/SectionLinks";
import SpecialTag from "@/components/Main/Controls/SpecialTag";
import { CmsAPI } from "@/custom/utils/actions";
import SpecialPC from "@/components/Specials/SpecialPC";
import CompSpecials from "@/components/Specials/CompSpecials";
import { useTheme } from "@/store/ThemeContext";
import HelperContext from "@/store/helper-context";

const _ = require("lodash");
const Specials = () => {
  const [topText, setTopText] = useState<any>();
  const [bottomText, setBottomText] = useState<any>();
  const { clickScroll } = useClickScroll();
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const [SpecialsDeals, setSpecialsDeals] = useState<any>([]);
  const [loader, setLoader] = useState<any>(true);
  const [helper, setHelper] = useState<any>([]);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const helperCtx = useContext(HelperContext);

  console.log("helperCtx", helperCtx);

  const fetchSpecialDeals = async () => {
    const data = await CmsAPI.getReactInfo({ id: 21 });

    if (data !== undefined && data !== null && data.result !== undefined) {
      setSpecialsDeals(data.result);
      setLoader(false);
    }
  };

  const getTopText = async () => {
    const tText = await CmsAPI.getInfoByColumn({
      no: 47,
    });

    if (
      tText !== undefined &&
      tText !== null &&
      tText.result !== undefined &&
      tText.result.length > 0
    ) {
      let text = tText.result[0];

      try {
        setTopText(text.columnData);
      } catch (e) {}
    }
  };

  const getBottomText = async () => {
    const bText = await CmsAPI.getInfoByColumn({ no: 48 });

    if (
      bText !== undefined &&
      bText !== null &&
      bText.result !== undefined &&
      bText.result.length > 0
    ) {
      let text = bText.result[0];

      // const bText = await fetch(`/api/config/getInfoByColumn`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     no: 48,
      //   }),
      // }).then((res) => res.json());
      //

      try {
        setBottomText(text.columnData);
      } catch (e) {}
    }
  };

  useEffect(() => {
    fetchSpecialDeals();
    getTopText();
    getBottomText();
  }, []);

  useEffect(() => {}, [SpecialsDeals]);

  const sectionLink = (link: any) => {
    clickScroll(link, 110);
  };

  const router = useRouter();
  const pathname = usePathname();
  const URLAddress = pathname;

  useEffect(() => {
    const checkURL = () => {
      if (URLAddress.includes("#")) {
        const anchorArea = URLAddress.split("#")[1];
        const goToArea: any = document.getElementById(`${anchorArea}`);
        goToArea.scrollIntoView(true);
      }
    };

    // setTimeout(250, checkURL());
    checkURL();
  }, [SpecialsDeals]);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Specials - Amazing PC Deals, Component and Upgrade Bundle Kits
        </title>
        <link rel="canonical" href="https://www.evetech.co.za/specials.aspx" />
        <meta
          name="description"
          content="We strive to offer the best pc & laptop deals in South Africa, covering a vast variety of pc & laptop specials. Take a look at our current pc component for sale on offer"
        />
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Helmet>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <Container
        fluid
        className={`${darkMode ? `evetechDark bg-dark` : ``} px-0 py-xxl-4`}
      >
        <div>
          <section className={`${styles.Youtube} overflow-hidden`}>
            <Col md={{ span: 10, offset: 1 }}>
              {topText ? parse(topText) : null}
            </Col>
          </section>
          <div className={`${styles.CompSpecialsLinkData}`}>
            {loader && <LoaderSpinner />}
            {SpecialsDeals !== undefined &&
              SpecialsDeals.length > 0 &&
              SpecialsDeals.map((Section: any) =>
                Section.type === "SectionLinks" ? (
                  <section
                    className={`
                      ${darkMode ? `bg-dark` : `bg-light`}
                      p-3 py-xxl-5
                    `}
                    key={nanoid(7)}
                  >
                    <Col md={{ span: 10, offset: 1 }}>
                      <div className="d-grid cols-sm-12 gap-2 gap-sm-3 gap-xxl-5 ">
                        {Section.content.map((Content: any) => {
                          return (
                            <div
                              onClick={() => sectionLink(Content.link)}
                              title={Content.title}
                              className={`${styles.HoverGrow} ${Content.classes} w-100 text-decoration-none cursor-pointer`}
                              key={nanoid(1)}
                            >
                              <Card className="shadow overflow-hidden text-center text-light bg-secondary fw-2 border-success">
                                <Image
                                  src={Content.image}
                                  alt={`` + Content.title}
                                  className="img-fluid"
                                />
                                <p className="m-0 p-2 pt-1">
                                  HERE {Content.title}
                                </p>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </section>
                ) : Section.type === "PageLinks" ? (
                  <section key={nanoid(8)} className="px-3">
                    <Col md={{ span: 10, offset: 1 }}>
                      <div className="d-grid cols-sm-12 gap-2 gap-sm-3 gap-xxl-5">
                        {Section.content.map((Content: any) => {
                          return (
                            <Link
                              href={Content.link}
                              title={Content.title}
                              key={nanoid(3)}
                              className={`${styles.HoverGrow} ${Content.classes} w-100 text-decoration-none rounded overflow-hidden `}
                            >
                              <Image
                                fluid
                                src={Content.image}
                                alt={Content.title}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </Col>
                  </section>
                ) : Section.type === "HTML" ? (
                  <section key={nanoid(9)} className="text-center my-5 px-3">
                    <Col md={{ span: 10, offset: 1 }}>
                      {parse(Section.content)}
                    </Col>
                  </section>
                ) : null
              )}
          </div>

          <Container fluid className="px-0">
            {/* Special Deals List */}
            <SectionLinks SpecialsDeals={SpecialsDeals} styles={styles} />
            {/* Special Deals List */}
            {/* Special Gaming PC  & Desktop  */}
            <SpecialPC styles={styles} />
            {/* <SpecialPcOld styles={styles} /> */}
            {/* Special Gaming PC  & Desktop */}
            {/* Special Components  */}
            {/* <OldCompSpecial styles={styles} /> */}
            <CompSpecials styles={styles} helperCtx={helperCtx} />

            {/* Special Components  */}
          </Container>
          <section className={`${styles.SpecialsFooter} w-100 px-3 pt-xxl-3`}>
            <div className="d-flex justify-content-center">
              {bottomText ? parse(bottomText) : null}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
};

export default Specials;
