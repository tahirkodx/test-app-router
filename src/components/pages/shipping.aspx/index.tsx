import { ComponentsHeader } from "@/components/Home";
import Head from "next/head";
import React, { useState } from "react";
import { Col, Image, Stack } from "react-bootstrap";
import styles from "@/styles/ShippingAndReturn.module.scss";
import { useTheme } from "@/store/ThemeContext";

const Home = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Shipping & Returns Custom built Computers
        </title>
        <link rel="canonical" href="https://www.evetech.co.za/shipping.aspx" />
        <meta
          name="description"
          content="Buy cheap computers & discount gaming PCs in South Africa"
        />
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Head>

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <section>
        <Image
          src="https://www.evetech.co.za/repository/ProductImages/shipping-returns.jpg"
          alt="Shipping and Returns"
          className={`${styles.Shipping__HeroImage} w-100`}
        />
      </section>

      <main
        className={`
          px-2 pt-3 pt-lg-5 pb-5
          ${darkMode ? `evetechDark bg-dark text-light` : ``}
        `}
      >
        <Col
          xs={12}
          md={{ span: 10, offset: 1 }}
          xxl={{ span: 6, offset: 3 }}
          className="p-3 p-md-0"
        >
          <Stack gap={3}>
            <section className="text-center">
              <h1 className="text-danger">Shipping & Returns</h1>
            </section>
            <div className="d-grid gap-3">
              <section>
                <h2 className="text-secondary text-center">Shipping Policy:</h2>
                <div className="d-grid cols-lg-2 gap-3">
                  <div
                    className={`
                      border p-3 rounded shadow
                      ${
                        darkMode
                          ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                          : ``
                      }
                    `}
                  >
                    <h3>Component Lead time (Excluding Delivery):</h3>
                    <p>
                      2-3 Business Days.(Peripherals, Monitors, Individual
                      components e.g. HDD, Motherboard, GPU etc and chairs)
                    </p>
                  </div>
                  <div
                    className={`
                      border p-3 rounded shadow
                      ${
                        darkMode
                          ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                          : ``
                      }
                    `}
                  >
                    <h3>Laptop/NUC Lead Time (Excluding Delivery):</h3>
                    <p>
                      2-4 Business days.(Depending on the configuration
                      purchased upgrades might be required on the SSD and RAM)
                    </p>
                  </div>
                  <div
                    className={`
                      border p-3 rounded shadow
                      ${
                        darkMode
                          ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                          : ``
                      }
                    `}
                  >
                    <h3>Desktop Computers Lead Time (Excluding Delivery):</h3>
                    <p>
                      5-6 Business days.(As we offer a large amount of
                      customization all desktops are built from scratch)
                    </p>
                  </div>
                  <div
                    className={`
                      border p-3 rounded shadow
                      ${
                        darkMode
                          ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                          : ``
                      }
                    `}
                  >
                    <h3>Delivery:</h3>
                    <p>
                      3-5 Business days(This is dependent on Courier Lead times
                      provided to us, this is applicable to change) We advise
                      you to please ensure that you have emailed the proof of
                      payment to pay@evetech.co.za to warrant the process runs
                      smoothly.
                    </p>
                  </div>
                  <div className="span-full border p-3 rounded shadow">
                    <h3>General</h3>
                    <p>
                      We only ship to residential or work addresses. Please note
                      that there is an optional shipping insurance of all
                      products at a rate of 1% of the value of the ordered item.
                      We strongly suggest customers use this option when
                      purchasing expensive items for peace of mind. Once an
                      order is processed, the customer will receive a tracking
                      number along with notification of which courier has been
                      used via email. This email will have all necessary details
                      to track the parcel, however, if more is needed,
                      sales@evetech.co.za can be contacted.
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-secondary">Returns Policy:</h2>
                <p>
                  All items bought from Evetech have a 1 year warranty unless
                  otherwise stated. If an item is bought from Evetech and
                  arrives DOA (dead on arrival) we will refund the customer the
                  full amount or swap the item out for another. We require
                  customers to contact us within 48 hours of receiving the
                  item/s for this policy to be in effect. In this case, we will
                  require all merchandise and packaging such as cables, manuals,
                  CD’s and brochures etc that came with the product to be sent
                  back with the product purchased. If there are any items
                  missing, we may refuse a refund until the said items are
                  returned to our premises. For items like monitors and laptops,
                  the warranty is held by the authorized service center and
                  therefore we will refer the product and/or client to this
                  service center. If an item fails within 7 days of purchase, we
                  will refund the customer the full amount or swap the item out
                  for another, as stated above. There will however, be a 10%
                  handling and restocking fee applicable on these items. We do
                  not refund any software that has been opened or tampered with.
                  All items being shipped back to Evetech must please be well
                  packaged and clearly marked with the ERMA on the outside of
                  the box and not on the original packaging. We recommend
                  insuring the item/s.
                </p>
              </section>
            </div>
          </Stack>
        </Col>
      </main>
    </>
  );
};

export default Home;
