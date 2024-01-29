import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AuthContext from "@/store/auth-context";
import AddItem from "@/components/Main/Controls/User/AddItem";
import ItemList from "@/components/Main/Controls/User/ItemList";
import { useRouter } from "next/navigation";
import { Helmet } from "react-helmet";
import { EserverAPI } from "@/custom/utils/actions";
import Heading from "../Heading";
import { useTheme } from "@/store/ThemeContext";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import darkModalStyles from "@/styles/DarkModal.module.scss";

const Swal = require("sweetalert2");

function filterInvalidJSONChars(input: any) {
  // Replace invalid characters with an empty string
  return input.replace(/[\\]/g, "").replace(/['"/]/g, "");
}

const _ = require("lodash");
const RMAForm = ({ clickRequests }: any) => {
  const authCtx = useContext<any>(AuthContext);
  const [items, setItems] = useState<any>([]);
  const [invoiceExist, setInvoiceExist] = useState<any>("");
  const [defaultForm, setDefaultForm] = useState<any>([]);
  const [addressVal, setAddressVal] = useState<any>("");
  const [cityVal, setCityVal] = useState<any>("");
  const [provVal, setProvVal] = useState<any>("");
  const [postCodeVal, setPostCodeVal] = useState<any>("");
  const [shipAddVal, setShipAddVal] = useState<any>("");
  const [shipCityVal, setShipCityVal] = useState<any>("");
  const [shipProvVal, setShipProvVal] = useState<any>("");
  const [shipPostVal, setShipPostVal] = useState<any>("");
  const [isSameAddress, setIsSameAddress] = useState<any>(false);
  const [sameAdd, setSameAdd] = useState<any>(false);
  const [title, setTitle] = useState<any>("");
  const [nameVal, setNameVal] = useState<any>("");
  const [invoiceNo, setInvoiceNo] = useState<any>("");
  const [emailVal, setEmailVal] = useState<any>("");
  const [pinVal, setPinVal] = useState<any>("");
  const [commentsVal, setCommentsVal] = useState<any>("");

  const sameAsAddress = (event: any) => {
    if (event.target.checked) {
      setShipAddVal(addressVal);
      setShipCityVal(cityVal);
      setShipProvVal(provVal);
      setShipPostVal(postCodeVal);
      setSameAdd(true);
    } else {
      setShipAddVal("");
      setShipCityVal("");
      setShipProvVal("");
      setShipPostVal("");
      setSameAdd(false);
    }

    setIsSameAddress((current: any) => !current);
  };

  const btnReset = useRef<any>(null);
  const router = useRouter();

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data: any = new FormData(event.target);
    const form: any = event.currentTarget;

    let title = data.get("Title");
    let name = data.get("Client_Name");
    let invoice = data.get("Invoice_Order_No");
    let address = data.get("Address");
    let city = data.get("City");
    let prov = data.get("Province");
    let postCode = data.get("Postal_Code");
    let shipAdd = data.get("Ship_Address");
    let shipCity = data.get("Ship_City");
    let shipProv = data.get("Ship_Province");
    let shipPost = data.get("Ship_Postal_Code");
    let email = data.get("Email");
    let contact = data.get("Contact_Person");
    let phone = data.get("Phone_Number");
    let password = data.get("Password");
    let comments = data.get("Comments");

    console.log("title", title);

    if (
      ![
        title,
        name,
        invoice,
        address,
        city,
        prov,
        postCode,
        shipAdd,
        shipCity,
        shipProv,
        shipPost,
        email,
        contact,
        phone,
      ].some((str) => str.trim().length === 0) &&
      items.length > 0 &&
      invoiceExist
    ) {
      // Works
      const summary = await EserverAPI.addRMAForm({
        ClientId: authCtx.user.CID,
        Name: name,
        Address: address,
        Invoice_Order_Number: invoice,
        City: city,
        Province: prov,
        Postal_Code: postCode,
        Contact_Person: contact,
        Email: email,
        Password: password,
        Phone_Number: phone,
        Comments: comments,
        Title: title,
        userid: authCtx.user.id,
        ShipAddress: shipAdd,
        Ship_City: shipCity,
        Ship_Prov: shipProv,
        Ship_Postal_Code: shipPost,
        items: items,
      });

      if (
        summary !== undefined &&
        summary !== null &&
        summary.result !== undefined &&
        summary.result !== null &&
        summary.result.FormId !== undefined &&
        summary.result.FormId > 0
      ) {
        let addRMAForm = summary.result;
        Swal.fire("Added!", "Request Added successfully..", "success").then(
          (result: any) => {
            if (result.isConfirmed) {
              router.push(`/`);
              setTimeout(function () {
                router.push(`/user/view-rma-form/${addRMAForm.FormId}`);
              }, 50);
            }
          }
        );
        btnReset !== null && btnReset.current.onClick();
      } else {
        Swal.fire("Oops!", "Problem occured try again!", "error");
      }
    } else {
      if (items.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all required fields!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Add Items!",
        });
      }
    }
  };

  const findRecieptIDNo = async (ID: any) => {
    const newData = await EserverAPI.findRecieptIDNo({
      INV: ID,
      cid: authCtx.user.CID,
    });

    if (
      newData !== undefined &&
      newData !== null &&
      newData.result !== undefined &&
      newData.result !== null
    ) {
      let result = newData.result;

      if (result) {
        setInvoiceExist(true);
      } else {
        setInvoiceExist(false);
      }
    }
  };

  const AddItemHndl = (item: any) => {
    setItems((prevItems: any) => {
      return [...prevItems, item];
    });
  };

  const deleteItem = (item: any) => {
    setItems((prevItems: any) => {
      return _.filter(prevItems, (items: any) => {
        return items.id !== item.id;
      });
    });
  };

  const changeAddressVal = (event: any) => {
    const filter = filterInvalidJSONChars(event.target.value);
    if (sameAdd) {
      setAddressVal(filter);
      setShipAddVal(filter);
    } else {
      setAddressVal(filter);
    }
  };

  const changeCityVal = (event: any) => {
    const filter = filterInvalidJSONChars(event.target.value);
    if (sameAdd) {
      setCityVal(filter);
      setShipCityVal(filter);
    } else {
      setCityVal(filter);
    }
  };

  const changeProvVal = (event: any) => {
    const filter = filterInvalidJSONChars(event.target.value);
    if (sameAdd) {
      setProvVal(filter);
      setShipProvVal(filter);
    } else {
      setProvVal(filter);
    }
  };

  const changePostCodeVal = (event: any) => {
    const filter = filterInvalidJSONChars(event.target.value);
    if (sameAdd) {
      setPostCodeVal(filter);
      setShipPostVal(filter);
    } else {
      setPostCodeVal(filter);
    }
  };

  useEffect(() => {
    const findDefaultFormRMA = async (CID: any) => {
      const newData = await EserverAPI.findDefaultFormRMA({
        CID: CID,
      });
      if (
        newData !== undefined &&
        newData !== null &&
        newData.result !== undefined &&
        newData.result !== null
      ) {
        let defaultFormDetails = newData.result;
        setDefaultForm(defaultFormDetails);
      }
    };

    findDefaultFormRMA(authCtx.user.CID);
  }, []);

  useEffect(() => {
    setAddressVal(defaultForm.Address1);
    setCityVal(defaultForm.City);
    setProvVal(defaultForm.State);
    setPostCodeVal(defaultForm.postCode);
    setNameVal(authCtx.user.FirstName);
  }, [defaultForm.Address1]);

  function changeTitleState(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setTitle(filter);
  }

  function changeName(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setNameVal(filter);
  }

  function changeInvoiceNo(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setInvoiceNo(filter);
  }

  function changeShipAddVal(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setShipAddVal(filter);
  }

  function changeShipCityVal(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setShipCityVal(filter);
  }

  function changeShipProvVal(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setShipProvVal(filter);
  }

  function changeShipPostVal(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setShipProvVal(filter);
  }

  function changeEmailVal(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setEmailVal(filter);
  }

  function changePinVal(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setPinVal(filter);
  }

  function changeCommentsVal(event: any) {
    const filter = filterInvalidJSONChars(event.target.value);
    setCommentsVal(filter);
  }

  useEffect(() => {}, [invoiceExist]);

  const isDarkInput = () =>
    darkMode ? `bg-black text-light border-secondary border-opacity-75` : ``;

  const isDarkCard = () =>
    darkMode ? `bg-black bg-opacity-50 border-secondary border-opacity-50` : ``;

  const cardSectionClass =
    "p-2 p-sm-3 rounded border span-full d-grid gap-2 gap-md-3";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title itemProp="name" lang="en">
          Evetech RMA Form
        </title>
      </Helmet>

      <div
        className={`
          d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom pb-3
          ${darkMode ? `border-secondary border-opacity-50` : `border-dark`}
        `}
      >
        <Heading level={2} className="m-0">
          Evetech RMA Form
        </Heading>
        <Button variant="primary" onClick={clickRequests}>
          My RMA Requests
        </Button>
      </div>

      <Card
        className={`
          ${darkMode ? `bg-black bg-opacity-25` : ``}
          shadow overflow-hidden p-2 p-sm-3
        `}
      >
        <Form
          onSubmit={(event) => {
            submitForm(event);
          }}
          className={`
            d-grid gap-2 gap-md-3 cols-md-6
            ${darkMode ? `${darkFormStyles.main} text-light` : ``}
          `}
        >
          <Form.Group className="span-full" controlId="NewForm.Title">
            <Form.Label className="w-100">
              Title{" "}
              <small className="f-12 float-end mt-1">
                (Max. 250 Characters)
              </small>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="Title"
              value={title}
              onChange={changeTitleState}
              maxLength={250}
              onKeyDown={(e: any) => {
                if (e.target.value.length > 250) {
                  e.target.value = e.target.value.substring(0, 250);
                }
              }}
              className={`${isDarkInput()}`}
            ></Form.Control>
          </Form.Group>

          {defaultForm !== undefined && (
            <Form.Group className="span-md-3" controlId="NewForm.ClientName">
              <Form.Label className="w-100">
                Client Name{" "}
                <small className="f-12 float-end mt-1">
                  (Max. 150 Characters)
                </small>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Client Name"
                name="Client_Name"
                value={nameVal}
                onChange={changeName}
                maxLength={150}
                onKeyDown={(e: any) => {
                  if (e.target.value.length > 150) {
                    e.target.value = e.target.value.substring(0, 150);
                  }
                }}
                className={`${isDarkInput()}`}
              ></Form.Control>
            </Form.Group>
          )}

          <Form.Group className="span-md-3" controlId="NewForm.InvoiceNo">
            <Form.Label>
              Invoice/Order No{" "}
              {invoiceExist !== "" ? (
                <span
                  className={`${invoiceExist ? "text-success" : "text-danger"}`}
                >
                  {invoiceExist ? <FaCheckCircle /> : <FaTimesCircle />}{" "}
                  {invoiceExist ? "Invoice Found" : "Invoice Not Found"}
                </span>
              ) : null}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Invoice/Order No"
              name="Invoice_Order_No"
              onBlur={(event) => {
                findRecieptIDNo(event.target.value);
              }}
              value={invoiceNo}
              onChange={changeInvoiceNo}
              className={`${isDarkInput()}`}
            ></Form.Control>
          </Form.Group>

          {/* Your Address */}
          {defaultForm !== undefined && (
            <section
              className={`
              ${isDarkCard()}
              ${cardSectionClass}
              cols-md-3
            `}
            >
              <Form.Label className="span-full m-0">
                <span className="fw-2 fs-5">
                  Your Address (Product Collection Address)
                </span>
              </Form.Label>
              <Form.Group
                className="span-full"
                controlId="NewForm.Collection.Address"
                // defaultVal
              >
                <Form.Label className="w-100">
                  Your Address{" "}
                  <small className="f-12 float-end mt-1">
                    (Max. 250 Characters)
                  </small>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Address"
                  name="Address"
                  value={addressVal}
                  onChange={changeAddressVal}
                  maxLength={250}
                  onKeyDown={(e: any) => {
                    if (e.target.value.length > 250) {
                      e.target.value = e.target.value.substring(0, 250);
                    }
                  }}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="NewForm.Collection.City">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="City"
                  value={cityVal}
                  onChange={changeCityVal}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="NewForm.Collection.Province">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Province"
                  name="Province"
                  value={provVal}
                  onChange={changeProvVal}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="NewForm.Collection.PostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Postal Code"
                  name="Postal_Code"
                  value={postCodeVal}
                  onChange={changePostCodeVal}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>
            </section>
          )}

          {/* Shipping Address */}
          <section
            className={`
              ${isDarkCard()}
              ${cardSectionClass} 
              cols-md-3
            `}
          >
            <Form.Label className="span-full m-0 d-flex justify-content-between flex-wrap">
              <span className="fw-2 fs-5">
                Shipping Address (Product Shipping Address)
              </span>
              <span className="bg-warning text-dark px-2 py-1 rounded">
                <Form.Check
                  type="checkbox"
                  label="Same as Your address"
                  className="fw-2"
                  value={isSameAddress}
                  onChange={sameAsAddress}
                ></Form.Check>
              </span>
            </Form.Label>

            <div
              className={`${
                sameAdd
                  ? "d-none"
                  : "d-grid cols-2 cols-md-3 gap-2 gap-md-3 span-full"
              }`}
            >
              <Form.Group
                className="span-full"
                controlId="NewForm.Shipping.Address"
              >
                <Form.Label className="w-100">
                  Shipping Address{" "}
                  <small className="f-12 float-end mt-1">
                    (Max. 250 Characters)
                  </small>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Shipping Address"
                  name="Ship_Address"
                  value={shipAddVal}
                  onChange={changeShipAddVal}
                  maxLength={250}
                  onKeyDown={(e: any) => {
                    if (e.target.value.length > 250) {
                      e.target.value = e.target.value.substring(0, 250);
                    }
                  }}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="NewForm.Shipping.City">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="Ship_City"
                  value={shipCityVal}
                  onChange={changeShipCityVal}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="NewForm.Shipping.Province">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Province"
                  name="Ship_Province"
                  value={shipProvVal}
                  onChange={changeShipProvVal}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="NewForm.Shipping.PostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Postal Code"
                  name="Ship_Postal_Code"
                  value={shipPostVal}
                  onChange={changeShipPostVal}
                  className={`${isDarkInput()}`}
                ></Form.Control>
              </Form.Group>
            </div>
          </section>

          <Form.Group className="span-md-2" controlId="NewForm.Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="Email"
              value={emailVal}
              onChange={changeEmailVal}
              className={`${isDarkInput()}`}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="span-md-2" controlId="NewForm.ContactPerson">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact Person"
              name="Contact_Person"
              defaultValue={authCtx.user.FirstName}
              className={`${isDarkInput()}`}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="span-md-2" controlId="NewForm.PhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="Phone_Number"
              defaultValue={authCtx.user.Tel}
              className={`${isDarkInput()}`}
            ></Form.Control>
          </Form.Group>

          {/* Item Info */}
          <AddItem
            onAddItem={AddItemHndl}
            filterInvalidJSONChars={filterInvalidJSONChars}
            className={`
              ${isDarkCard()}
              ${cardSectionClass} 
              cols-md-2
            `}
            inputClasses={`${isDarkInput()}`}
          />
          <ItemList
            Items={items}
            onDeleteItem={deleteItem}
            darkMode={darkMode}
          />

          {/* Extra Info */}
          <section
            className={`
              ${isDarkCard()}
              ${cardSectionClass} 
              cols-md-2
            `}
          >
            <Form.Label className="span-full m-0">
              <span className="fw-2 fs-5">Extra info</span>
            </Form.Label>

            <Form.Group controlId="NewForm.Password">
              <Form.Label>Password / PIN</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="Password"
                value={pinVal}
                onChange={changePinVal}
                className={`${isDarkInput()}`}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="NewForm.Comments">
              <Form.Label className="w-100">
                Comments / Special instructions{" "}
                <small className="f-12 float-end mt-1">
                  (Max. 350 Characters)
                </small>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Comments"
                rows={3}
                name="Comments"
                value={commentsVal}
                onChange={changeCommentsVal}
                maxLength={350}
                onKeyDown={(e: any) => {
                  if (e.target.value.length > 350) {
                    e.target.value = e.target.value.substring(0, 350);
                  }
                }}
                className={`${isDarkInput()}`}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="NewForm.Disclaimer" className="span-full">
              <Form.Label>Disclaimer</Form.Label>
              <Form.Control
                as="textarea"
                value="Please note we will not be held liable for any loss of data warranties can take up to 21 working days with the service center Any goods not collected within 90days will be given for E-recycling Evetech will not be held liable for any warranty void items."
                rows={3}
                disabled
                className={`${isDarkInput()}`}
              ></Form.Control>
            </Form.Group>

            <Form.Check
              type="checkbox"
              className="span-full"
              label="I, hereby confirm that all the information above is correct, and acknowledge that any incorrect information provided will delay the ERMA process. I also agree to the terms and conditions stipulated by evetech."
              id="Agree_Terms_RMA"
              name="Agree_Terms_RMA"
            />
          </section>

          <Form.Group className="span-full d-flex flex-wrap gap-2">
            <Button variant="success" type="submit">
              Submit RMA Form
            </Button>
            <Button variant="success" type="reset" ref={btnReset}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default RMAForm;
