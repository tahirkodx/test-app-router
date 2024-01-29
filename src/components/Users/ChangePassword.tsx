import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { FaIconDynamic as Icon } from "@ui-layouts";
import Swal from "sweetalert2";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import { InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";
import darkFormStyles from "@/styles/DarkForm.module.scss";

const ChangePassword = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [initInfo, setInitInfo] = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const isDarkInput = () =>
    darkMode ? `bg-black text-light border-secondary border-opacity-75` : ``;

  const isDarkEye = () =>
    darkMode
      ? `bg-dark bg-gradient text-light border border-secondary border-opacity-50`
      : ``;

  const isLabelDark = () => (darkMode ? `text-light` : ``);

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const form = event.currentTarget;

    let pass = data.get("txtCurrentPass");
    let newPass: any = data.get("txtNewPass");
    let confPass: any = data.get("txtConfirmPass");
    if (newPass.trim() === confPass.trim()) {
      const summary = await UserAPI.changePassword({
        currentPassword: pass,
        newPassword: newPass,
      });
      if (summary !== undefined && summary.result !== undefined) {
        let changePass = summary.result;
        if (changePass.affectedRows !== undefined && changePass.affectedRows) {
          Swal.fire("Updated!", "Password updated successfully..", "success");
          authCtx.onLogout();
        } else {
          Swal.fire("Oops!", "Problem occured try again!", "error");
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New Password and Confirm Password must be same!",
      });
    }
  };

  return (
    <>
      <div
        className={`
          d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom pb-3
          ${darkMode ? ` border-secondary border-opacity-50` : ``}
        `}
      >
        <Heading level={2} className="m-0">
          <Icon type="FaUserLock" /> Change Password
        </Heading>
      </div>
      <Card
        className={`
          p-3 shadow
          ${darkMode ? `${darkFormStyles.main} bg-black bg-opacity-25` : ``}
        `}
      >
        <Form
          validated={validated}
          onSubmit={(event) => {
            submitForm(event);
          }}
        >
          <Stack gap={2}>
            <Form.Group>
              <Form.Label className={`${isLabelDark()} fw-2`}>
                Current Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showCurrent ? `text` : `password`}
                  placeholder="Enter your current password"
                  name="txtCurrentPass"
                  required
                  className={`${isDarkInput()}`}
                />
                {!showCurrent && (
                  <InputGroup.Text
                    /* variant="secondary" */
                    onClick={() => setShowCurrent(true)}
                    className={`${isDarkEye()}`}
                  >
                    <FaEye />
                  </InputGroup.Text>
                )}
                {showCurrent && (
                  <InputGroup.Text
                    /* variant="secondary" */
                    onClick={() => setShowCurrent(false)}
                    className={`${isDarkEye()}`}
                  >
                    <FaEyeSlash />
                  </InputGroup.Text>
                )}
              </InputGroup>

              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className={`${isLabelDark()} fw-2`}>
                New Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNew ? `text` : `password`}
                  placeholder="Enter your new password"
                  name="txtNewPass"
                  required
                  className={`${isDarkInput()}`}
                />
                {!showNew && (
                  <InputGroup.Text
                    /*  variant="secondary" */
                    onClick={() => setShowNew(true)}
                    className={`${isDarkEye()}`}
                  >
                    <FaEye />
                  </InputGroup.Text>
                )}
                {showNew && (
                  <InputGroup.Text
                    /*  variant="secondary" */
                    onClick={() => setShowNew(false)}
                    className={`${isDarkEye()}`}
                  >
                    <FaEyeSlash />
                  </InputGroup.Text>
                )}
              </InputGroup>

              <Form.Control.Feedback type="invalid">
                Please provide a valid new password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className={`${isLabelDark()} fw-2`}>
                Confirm Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirm ? `text` : `password`}
                  placeholder="Confirm your new password"
                  name="txtConfirmPass"
                  required
                  className={`${isDarkInput()}`}
                />
                {!showConfirm && (
                  <InputGroup.Text
                    /*  variant="secondary" */
                    onClick={() => setShowConfirm(true)}
                    className={`${isDarkEye()}`}
                  >
                    <FaEye />
                  </InputGroup.Text>
                )}
                {showConfirm && (
                  <InputGroup.Text
                    /*  variant="secondary" */
                    onClick={() => setShowConfirm(false)}
                    className={`${isDarkEye()}`}
                  >
                    <FaEyeSlash />
                  </InputGroup.Text>
                )}
              </InputGroup>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Please re-enter your new password.
            </Form.Control.Feedback>
            <div className="d-flex gap-1">
              <Button variant="success" type="submit">
                Change Password
              </Button>
              <Button variant="danger" type="submit">
                Reset
              </Button>
            </div>
          </Stack>
        </Form>
      </Card>
    </>
  );
};

export default ChangePassword;
