import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { FaIconDynamic as Icon } from "@ui-layouts";
import {
  FaCloudUploadAlt,
  FaEdit,
  FaRedoAlt,
  FaWindowClose,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";

const AccountInfo = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<any>(false);
  const [showEdit, setShowEdit] = useState<any>(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [initInfo, setInitInfo] = useState<any>(false);
  const submitRef = useRef(null);
  const resetChangeButton: any = useRef();
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const cancelHandler = () => {
    setIsEdit(false);
    setShowEdit(true);
    resetChangeButton.current.click();
  };

  const editHandler = () => {
    setIsEdit(true);
    setShowEdit(false);
  };

  const cardClassesDark = `bg-black border-secondary border-opacity-75 bg-opacity-25`;
  const cardInputDark = () =>
    darkMode
      ? `
          bg-black border-secondary border-opacity-75 
          ${isEdit ? `text-light` : `text-secondary`}
        `
      : ``;
  const isLabelDark = () => (darkMode ? `text-light` : ``);

  useEffect(() => {
    if (!initInfo) {
      if (authCtx.isLoggedIn) {
        /* get token validate token */

        const getUserProfile = async () => {
          console.log;
          ("getUserProfile");
          const summary = await UserAPI.getUserProfile();
          if (summary !== undefined && summary.result !== undefined) {
            try {
              let userSumm = summary.result;
              setUserInfo(userSumm);
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
          console.log("summary", summary);
          console.log("setInit Info before", initInfo);
          setInitInfo(true);
          console.log("setInit Info after", initInfo);
        };

        getUserProfile();
      } else {
        router.push("/");
      }
    }
  }, []);

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);

    let profileData = {
      CustomerId: data.get("CustomerId"),
      FirstName: data.get("FirstName"),
      LastName: data.get("LastName"),
      Address: data.get("Address"),
      AddressId: data.get("AddressId"),
      Country: data.get("Country"),
      Suburb: data.get("Suburb"),
      State: data.get("State"),
      City: data.get("City"),
      PostCode: data.get("PostCode"),
      ShipContactPerson: data.get("ShipContactPerson"),
      Telephone: data.get("Telephone"),
      CompanyName: data.get("CompanyName"),
      VatNumber: data.get("VatNumber"),
      CompRegistrationNumber: data.get("CompRegistrationNumber"),
      ContactPerson: data.get("ContactPerson"),
      ContactNumber: data.get("ContactNumber"),
    };

    const upProfile = await UserAPI.updateProfile({
      profileData: profileData,
    });
    console.log("response :",upProfile);
    if (upProfile !== undefined && upProfile.result !== undefined) {
      let result = upProfile.result;

      if (result.result === 1) {
        setUserInfo(upProfile.userData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEdit(false);
        setShowEdit(true);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <>
      {initInfo && (
        <Form
          onSubmit={(event) => {
            submitForm(event);
          }}
        >
          <div
            className={`
              ${
                darkMode
                  ? `border-secondary border-opacity-50 text-light`
                  : `border-dark`
              }
              d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom pb-3
            `}
          >
            <h2 className="m-0">
              <Icon type="FaUserCircle" /> Account Info
            </h2>

            <Stack direction="horizontal" gap={1}>
              <Button
                variant="success"
                type="button"
                className={`m-2 py-2 googleBtn ${showEdit ? "" : "hide"}`}
                onClick={() => editHandler()}
              >
                <FaEdit /> Edit
              </Button>
              <Button
                variant="success"
                type="submit"
                className={`m-2 py-2 googleBtn ${!showEdit ? "" : "hide"}`}
              >
                <FaCloudUploadAlt /> Update
              </Button>
              <Button
                variant="danger"
                type="button"
                className={`m-2 py-2 googleBtn ${!showEdit ? "" : "hide"}`}
                onClick={() => {
                  cancelHandler();
                }}
              >
                <FaWindowClose /> Cancel
              </Button>
            </Stack>
          </div>

          <div className="d-grid gap-2 gap-sm-3 cols-sm-2 pt-2">
            <Card
              className={`
                ${darkMode ? cardClassesDark : ``}
                shadow overflow-hidden
              `}
            >
              <div className="px-3 py-2 p-sm-3 py-sm-2 bg-secondary text-light">
                Main Details
              </div>
              <div className="p-3 p-sm-3 pt-sm-2">
                <Stack gap={1}>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Customer ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="CustomerId"
                      id="txtCustomerId"
                      defaultValue={userInfo ? userInfo.CID : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="FirstName"
                      id="txtFirstName"
                      defaultValue={userInfo ? userInfo.FirstName : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="LastName"
                      id="txtLastName"
                      defaultValue={userInfo ? userInfo.LastName : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                </Stack>
              </div>
            </Card>

            <Card
              className={`
                ${darkMode ? cardClassesDark : ``}
                shadow overflow-hidden
              `}
            >
              <div className="px-3 py-2 p-sm-3 py-sm-2 bg-secondary text-light">
                Login Details
              </div>
              <div className="p-3 p-sm-3 pt-sm-2">
                <Stack gap={1}>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Email"
                      id="txtEmail"
                      defaultValue={userInfo ? userInfo.Email : ""}
                      disabled={true}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      id="txtPassword"
                      defaultValue={userInfo ? userInfo.Password : ""}
                      disabled={true}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                </Stack>
              </div>
            </Card>

            <Card
              className={`
                ${darkMode ? cardClassesDark : ``}
                shadow overflow-hidden
              `}
            >
              <div className="px-3 py-2 p-sm-3 py-sm-2 bg-secondary text-light">
                Primary Shipping Details
              </div>
              <div className="p-3 p-sm-3 pt-sm-2">
                <Stack gap={1}>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Address"
                      id="txtAddress"
                      defaultValue={userInfo ? userInfo.Address1 : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                    <Form.Control
                      type="hidden"
                      name="AddressId"
                      id="txtAddressId"
                      defaultValue={userInfo ? userInfo.addressId : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Country
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Country"
                      id="txtCountry"
                      defaultValue={userInfo ? userInfo.Country : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      State
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="State"
                      id="txtState"
                      defaultValue={userInfo ? userInfo.State : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="City"
                      id="txtCity"
                      defaultValue={userInfo ? userInfo.City : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Suburb
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Suburb"
                      id="txtSuburb"
                      defaultValue={userInfo ? userInfo.Suburb : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Post Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="PostCode"
                      id="txtPostCode"
                      defaultValue={userInfo ? userInfo.PostCode : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Contact Person
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="ShipContactPerson"
                      id="txtShipContactPerson"
                      defaultValue={userInfo ? userInfo.PersonName : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Telephone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Telephone"
                      id="txtTelePhone"
                      defaultValue={userInfo ? userInfo.Tel : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                </Stack>
              </div>
            </Card>

            <Card
              className={`
                  ${darkMode ? cardClassesDark : ``}
                  shadow overflow-hidden
              `}
            >
              <div className="px-3 py-2 p-sm-3 py-sm-2 bg-secondary text-light">
                Company Information
              </div>
              <div className="p-3 p-sm-3 pt-sm-2">
                <Stack gap={1}>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      CompanyName
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="CompanyName"
                      id="txtCompanyName"
                      defaultValue={userInfo ? userInfo.CompanyName : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Vat Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="VatNumber"
                      id="txtVatNumber"
                      defaultValue={userInfo ? userInfo.VATNumber : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Registration Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="CompRegistrationNumber"
                      id="txtRegistration"
                      defaultValue={userInfo ? userInfo.RegistrationNumber : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Contact Person
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="ContactPerson"
                      id="txtCompContactPerson"
                      defaultValue={userInfo ? userInfo.PallContactPerson : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${isLabelDark()} fw-2`}>
                      Contact Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="ContactNumber"
                      id="txtContactNumber"
                      defaultValue={userInfo ? userInfo.PallContactNumber : ""}
                      disabled={!isEdit}
                      className={`${cardInputDark()}`}
                    />
                  </Form.Group>
                </Stack>
              </div>
            </Card>

            <div className="span-full">
              <Button
                variant="success"
                className={`m-2 py-2 googleBtn ${showEdit ? "" : "hide"}`}
                onClick={() => editHandler()}
                type="reset"
              >
                <FaEdit /> Edit
              </Button>
              <Button
                variant="success"
                type="submit"
                className={`m-2 py-2 googleBtn ${!showEdit ? "" : "hide"}`}
              >
                <FaCloudUploadAlt /> Update
              </Button>
              <Button
                variant="danger"
                type="button"
                className={`m-2 py-2 googleBtn ${!showEdit ? "" : "hide"}`}
                onClick={() => cancelHandler()}
              >
                <FaWindowClose /> Cancel
              </Button>
              <Button
                type="button"
                ref={resetChangeButton}
                className={`m-2 py-2 googleBtn ${!showEdit ? "" : "hide"}`}
              >
                <FaRedoAlt /> Reset form
              </Button>
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

export default AccountInfo;
