"use client";
import ComponentsByNvidiaGamingPC from "@/components/ComponentsByNvidiaGamingPC";
import Heading from "@/components/Heading";
import { ComponentsHeader } from "@/components/Home";
import Spinner from "@/components/Spinner";
import Text from "@/components/Text";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Image, Col, Container } from "react-bootstrap";
import styles from "@/styles/component/DynamicPage.module.scss";

const NVIDIAGForceGaming = () => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const [bgcolor, setBgcolor] = useState<any>("");
  const [gameData, setGameData] = useState<any[]>([]);
  const [initPageData, setInitPageData] = useState<any>(false);
  const [product, setProduct] = useState<any>([]);

  useEffect(() => {
    const getNvidiaGeforceGamingPCs = async () => {
      const pdatas = await ProductAPI.getNvidiaGeforceGamingPCs();
      if (
        pdatas !== null &&
        pdatas !== undefined &&
        pdatas.result !== null &&
        pdatas.result !== undefined
      ) {
        let productData = pdatas.result;

        console.log("productData", productData);

        if (productData !== undefined && productData.length > 0) {
          setProduct((prevProduct) => {
            prevProduct = productData;
            return prevProduct;
          });
        }
      }
      setInitPageData(true);
    };

    const getGameData = async () => {
      const gameDatas = await ProductAPI.getPcGameData();

      if (
        gameDatas !== null &&
        gameDatas !== undefined &&
        gameDatas.result !== null &&
        gameDatas.result !== undefined
      ) {
        let gamesData = gameDatas.result;
        setGameData(gamesData);
      }
    };

    getNvidiaGeforceGamingPCs();
    getGameData();
  }, []);

  useEffect(() => {}, [product]);

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          NVIDIA GeForce Gaming PCs
        </title>

        <meta
          name="description"
          content="Whether you are an avid gamer, a photo/video editor or just want the best for casual gaming. NVIDIA has something for you. GeForce Gaming PCs have started a revolution in the gaming world."
        />
      </Head>

      <div className={`${styles.DynamicPage} position-relative`}>
        <ComponentsHeader />
        <Container
          fluid
          style={{
            backgroundColor:
              bgcolor.trim().length > 0
                ? `${darkMode ? `#212529` : bgcolor}`
                : `${darkMode ? `#212529` : `white`}`,
          }}
          className={darkMode ? `evetechDark` : ``}
        >
          <Col lg={{ span: 10, offset: 1 }} className={`py-4`}>
            <section
              className={`bg-black p-2 py-sm-4 px-md-3 position-relative overflow-hidden text-center`}
            >
              <Image
                src="https://www.evetech.co.za/repository/ProductImages/nvidia-geforce-gaming-pcs-banner-962px-v2.jpg"
                alt="Nvidia Gaming PCs"
                className={`position-absolute top-50 start-50 translate-middle w-100 opacity-25`}
              />
              <Image
                src="https://www.evetech.co.za/repository/ProductImages/nvidia-geforce-gaming-pcs-banner-962px-v2.jpg"
                alt="Nvidia Gaming PCs"
                className={`rounded border border-light img-fluid position-relative`}
              />
            </section>
            <section
              className={`
                ${darkMode ? `bg-black` : `bg-dark`}
                p-3 bg-opacity-10
              `}
            >
              <Col lg={{ span: 10, offset: 1 }} className={`my-4`}>
                <Heading level={1} className={`text-center`}>
                  NVIDIA GeForce Gaming PCs
                </Heading>
                <Text>
                  If you are in search of the ultimate gaming PC that money can
                  buy, you need a GeForce Gaming PC. Whether you are an avid
                  gamer, a photo/video editor or just want the best for casual
                  gaming. NVIDIA has something for you. GeForce Gaming PCs have
                  started a revolution in the gaming world. Powered by some of
                  the best GPUs to have ever hit the gaming market. With the
                  incredible speeds and unrivaled performance, you can take your
                  potential to a whole new level. These gaming PCs are designed
                  to offer you the very best gaming experience on the planet.
                  Incredible speeds, combined with outstanding reliability and
                  innovative technology allowing the PCs to stay cool even under
                  the most intense gaming pressure. Get your hands on one of the
                  greatest gaming PCs that we have to offer and start your new
                  adventure right now. Packed with hardware that will blow your
                  mind, there is no challenge hard enough, no map-wide enough to
                  keep you from achieving greatness. NVIDIA GeForce Gaming PCs,
                  pure performance unleashed.
                </Text>
              </Col>
            </section>

            <div
              className={`
                ${styles.Pagination} 
                ${darkMode ? `bg-dark` : `bg-light`}
                d-flex justify-content-between align-items-center rounded-bottom p-2 border-bottom gap-2 position-sticky
              `}
            >
              <Heading level={2} className={`fs-6 m-0`}>
                NVIDIA GeForce Gaming PCs ({product.length})
              </Heading>
            </div>

            {!initPageData && (
              <div className="span-full mx-2 mx-sm-3 w-100 h-100">
                <Spinner isEve={false} className="h-100" />
              </div>
            )}

            {initPageData ? (
              <ComponentsByNvidiaGamingPC
                gameData={gameData}
                products={product}
              />
            ) : null}
          </Col>
        </Container>
      </div>
    </>
  );
};

export default NVIDIAGForceGaming;
