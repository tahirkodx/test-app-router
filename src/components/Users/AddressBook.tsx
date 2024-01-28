import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "@/styles/User.module.scss";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";
import { FaIconDynamic as Icon } from "@ui-layouts";
import { Col, Row } from "react-bootstrap";
import AddressModal from "@/components/Modals/AddressModal";
import { nanoid } from "nanoid";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";
import Heading from "../Heading";

const _ = require("lodash");
const formStateData = {
  id: 0,
  UserID: 0,
  PersonName: "",
  Address1: "",
  Address2: "",
  Suburb: "",
  PostCode: "",
  City: "",
  State: "",
  Country: "",
  IsPrimary: 0,
  AddedDate: "",
  Status: 0,
  ModifiedDate: "",
};
const AddressBook = () => {
  const authCtx = useContext<any>(AuthContext);
  const navigate = useRouter();
  const [address, setAddress] = useState<any>([]);
  const [addAddress, setAddAddress] = useState(false);
  const [formState, setFormState] = useState(formStateData);
  const [addId, setAddId] = useState(0);
  const router = useRouter();

  const Swal = require("sweetalert2");

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const openAddAddress = () => {
    setAddAddress(true);
  };
  const closeAddAddress = () => {
    setAddAddress(false);
  };

  const getUserAddresses = async () => {
    const summary = await UserAPI.getUserAddresses();

    try {
      let stateSumm = summary.result;

      setAddress(stateSumm);
    } catch (e) {
      setAddress([]);
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
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      getUserAddresses();
    } else {
      router.push("/");
    }
  }, []);

  const removeAddress = async (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't delete this address!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        const deleteSummary = await UserAPI.deleteAddress({
          userid: authCtx.user.id,
          addressId: id,
        });
        // const deleteSummary = await fetch(`/api/user/deleteAddress`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: "Bearer " + authCtx.token,
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        //   },
        //   body: JSON.stringify({
        //     userid: authCtx.user.id,
        //     addressId: id,
        //   }),
        // }).then((res) => res.json());
        let deleted = deleteSummary.result;
        if (deleted) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Address Removed",
            showConfirmButton: false,
            timer: 1500,
          });
          setAddress((prevAdd: any) => {
            return _.filter(prevAdd, (add: any) => {
              return add.id !== id;
            });
          });
        } else {
          Swal.fire("Oops!", "Problem occured try again!", "error");
        }
      }
    });
  };

  const getAddress = async (id: any) => {
    const getAddress = async (id: any) => {
      const summary = await UserAPI.getAddressById({
        userid: authCtx.user.id,
        addressId: id,
      });
      //   const summary = await fetch(`/api/user/getAddressById`, {
      //     method: "POST",
      //     headers: {
      //       Authorization: "Bearer " + authCtx.token,
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //     body: JSON.stringify({
      //       ,
      //     }),
      //   }).then((res) => res.json());

      try {
        let address = summary.result[0];
        setFormState(address);
        /* modal will react according to set state */
        setAddId(id);
        openAddAddress();
      } catch (e) {
        if (
          summary.message !== undefined &&
          summary.message === "Not authenticated."
        ) {
          authCtx.onLogout();
        } else {
          Swal.fire("Oops!", "Problem occured try again!", "error");
        }
      }
    };

    getAddress(id);
  };

  const resetFormState = () => {
    setFormState(formStateData);
    setAddId(0);
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
          <Icon type="FaBook" /> Address Book
        </Heading>
        <Button
          variant="success"
          type="submit"
          onClick={() => {
            setAddId(0);
            setFormState(formStateData);
            openAddAddress();
          }}
        >
          <FaPlus /> Add Address
        </Button>
      </div>
      <div className="d-grid gap-2 gap-sm-3 cols-2 cols-sm-3">
        {address.map((Book: any, index: any) => {
          return (
            <Card
              key={index + `` + nanoid(4)}
              className={`
                ${
                  Book.IsPrimary === 1
                    ? "span-full span-md-1"
                    : `${darkMode ? `text-light` : ``}`
                } 
                ${darkMode ? `bg-black border-secondary border-opacity-75` : ``}
                overflow-hidden shadow cursor-pointer
              `}
            >
              <div
                className={`
                  ${
                    !(Book.IsPrimary === 0)
                      ? `${styles.AddressBook__Heading} text-dark`
                      : `${darkMode ? `bg-dark` : ``}`
                  } 
                  ${darkMode ? `border-secondary border-opacity-50` : ``}
                  p-2 p-sm-3 py-sm-2 border-bottom
                `}
              >
                <Stack
                  direction="horizontal"
                  gap={1}
                  className="justify-content-between align-content-between lh-1"
                >
                  <span>
                    <span className="fw-2">{Book.PersonName} </span>
                    {Book.IsPrimary === 1 ? (
                      <>
                        <small className="text-danger">
                          (<span className="fst-italic">Primary Address</span>)
                        </small>
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                  <Stack gap={1} direction="horizontal">
                    <Button
                      size="sm"
                      className="text-primary shadow"
                      variant=""
                      onClick={() => {
                        getAddress(Book.id);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      className="text-danger shadow"
                      variant=""
                      onClick={() => removeAddress(Book.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Stack>
                </Stack>
              </div>
              <div
                className={`${
                  darkMode ? `text-light` : ``
                } p-2 p-sm-3 pt-sm-2 lh-1`}
              >
                <small className="d-grid gap-1 cols-10">
                  <div className="span-full">
                    {Book.Address1}
                    {Book.Address2}
                  </div>
                  <div className="span-full span-sm-5">
                    <b className="fw-3">Suburb:</b> {Book.Suburb}
                  </div>
                  <div className="span-full span-sm-5">
                    <b className="fw-3">PostCode:</b> {Book.PostCode}
                  </div>
                  <div className="span-full span-sm-5">
                    <b className="fw-3">City:</b> {Book.City}
                  </div>
                  <div className="span-full span-sm-5">
                    <b className="fw-3">State: </b> {Book.State}
                  </div>
                  <div className="span-full span-sm-5">
                    <b className="fw-3">Country: </b> {Book.Country}
                  </div>
                </small>
              </div>
            </Card>
          );
        })}
      </div>

      <AddressModal
        isOpen={addAddress}
        formStateData={formState}
        closeAddAddress={closeAddAddress}
        resetFormState={resetFormState}
        getAddress={getUserAddresses}
        formState={formStateData}
        id={addId}
      />
    </>
  );
};
export default AddressBook;
