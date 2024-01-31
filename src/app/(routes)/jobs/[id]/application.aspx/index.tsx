import { ComponentsHeader } from "@/components/Home";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { CmsAPI, JobsAPI } from "@/custom/utils/actions";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { createRef, useEffect, useState } from "react";
import { Col, Stack, Form, Card, Button, Table, Image } from "react-bootstrap";
import styles from "@/styles/JobApplication.module.scss";
import NavButtons from "@/components/JobApplication/NavButtons";
import {
  FaAsterisk,
  FaCheck,
  FaEdit,
  FaImage,
  FaInfo,
  FaMinus,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import AddNewLangs from "@/components/JobApplication/languages/AddNewLangs";
import { nanoid } from "nanoid";
import _ from "lodash";
import AddItem from "@/components/JobApplication/AddItem";
import EditItem from "@/components/JobApplication/EditItem";
import Swal from "sweetalert2";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";
import darkFormStyles from "@/styles/DarkForm.module.scss";

const Home = () => {
  const params = useParams();
  const [JobID, setJobID] = useState<any>("");
  const [position, setPosition] = useState<any>("");
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);

  const [formSection, setFormSection] = useState<any>("Personal");
  const [photoFile, setPhotoFile] = useState<any>();
  const [idFile, setIdFile] = useState<any>();
  const [cvFile, setCvFile] = useState<any>();
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("0");
  const [gender, setGender] = useState<any>("");
  const [cities, setCities] = useState<any[]>([]);
  const [province, setProvince] = useState<any>("");
  const [cityOption, setCityOption] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [suburb, setSuburb] = useState<any>("");
  const [postalCode, setPostalCode] = useState<any>("");
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState<any>(0);
  const [confirm, setConfirm] = useState<any>(false);
  const [jobApplicationId, setJobApplicationId] = useState<any>();
  const photoDoc: any = createRef();
  const idDoc: any = createRef();
  const cvDoc: any = createRef();
  const [langsValid, setLangsValid] = useState<any>(false);
  const [showAddForm, setShowAddForm] = useState<any>(false);

  // Jobs States
  const jobList = new Set([]);
  const [list, setList] = React.useState<any>(jobList);
  const [company, setCompany] = React.useState<any>("");
  const [job, setJob] = React.useState<any>("");
  const [description, setDescription] = React.useState<any>("");
  const [updateState, setUpdateState] = useState<any>(-1);
  const [languages, setLanguages] = useState<any>("");

  const isMD = useMediaQuery("(min-width: 768px)");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    let JID: any = params?.id;
    if (JID !== undefined && JID.length > 0) {
      setJobID(JID);
    }
  }, [params]);

  const fetchData = async (JobID: any) => {
    const newData = await JobsAPI.getJob({ JobID });

    if (newData && newData.result !== null && newData.result.length > 0) {
      setPosition(newData.result[0].position);
    }
  };

  useEffect(() => {
    if (JobID !== null && JobID !== undefined && JobID.length > 0) {
      fetchData(JobID);
    }
  }, [JobID]);

  const checkJobBefore = async (JobID: any, emailid: any) => {
    const newData = await JobsAPI.checkJobBefore({
      jobId: JobID,
      emailid: emailid,
    });

    if (newData) {
      const result = newData.result[0].Total;
      setHasAlreadyApplied(result);
    }
  };

  function containsSpecialChars(str: any) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  function hasNumber(str: any) {
    return /\d/.test(str);
  }

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isName = (name: any) => {
    if (
      name.length > 0 &&
      containsSpecialChars(name) === false &&
      hasNumber(name) === false
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isPostalCodeRight = () => {
    if (postalCode.length > 0 && containsSpecialChars(postalCode) === false) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {}, [photoFile]);
  useEffect(() => {}, [name]);
  useEffect(() => {}, [province]);
  useEffect(() => {}, [cityOption]);
  useEffect(() => {}, [idFile]);
  useEffect(() => {}, [cvFile]);
  useEffect(() => {}, [company]);
  useEffect(() => {}, [job]);
  useEffect(() => {}, [description]);
  useEffect(() => {}, [languages]);

  let filteredCities = _.filter(cities, { State: province });

  function handleID(event: any) {
    const FileObject = event.target.files[0];
    setIdFile(FileObject);
  }

  function handleCV(event: any) {
    const FileObject = event.target.files[0];
    setCvFile(FileObject);
  }

  useEffect(() => {
    const getCities = async () => {
      const summary = await CmsAPI.getCities();
      let userSumm = summary?.result;
      if (userSumm) setCities(userSumm);
    };

    getCities();
  }, []);

  function handleChange(event: any) {
    if (event.target.name === "company") {
      setCompany(event.target.value);
    }
    if (event.target.name === "job") {
      setJob(event.target.value);
    }
    if (event.target.name === "description") {
      setDescription(event.target.value);
    }
  }

  function handleAdd() {
    const newJobList: any = Array.from(list).concat({
      id: nanoid(7),
      company,
      job,
      description,
    });
    setList(newJobList);
    setCompany("");
    setJob("");
    setDescription("");
  }

  const handleEdit = (id: any) => {
    setUpdateState(id);
  };

  const deleteJob = (id: any) => {
    const newList = list.filter((li) => li.id !== id);
    setList(newList);
  };

  const handleUpdate = () => {
    setUpdateState(-1);
  };

  useEffect(() => {}, [list]);

  const checkReadPrivacy = () => {
    setConfirm((current) => !current);
  };

  const formPosition = (section: any) => {
    switch (section) {
      case "Personal":
        return styles.Personal;
      case "Address":
        return styles.Address;
      case "Work":
        return styles.Work;
      case "Docs":
        return styles.Docs;
      case "Confirm":
        return styles.Confirm;
      default:
        return styles.Personal;
    }
  };

  const isFileRightSize = (file: any) => {
    if (file !== undefined) {
      if (file.size < 2000000) {
        return true;
      } else {
        return false;
      }
    }
  };

  const isPhotoImage = (photoFile: any) => {
    if (photoFile !== undefined) {
      if (photoFile.type === "image/jpeg" || photoFile.type === "image/png") {
        return true;
      } else {
        return false;
      }
    }
  };

  const isDocRightType = (doc: any) => {
    if (doc !== undefined) {
      if (
        doc.type === "image/jpeg" ||
        doc.type === "image/png" ||
        doc.type === "application/pdf" ||
        doc.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        doc.type === "application/msword"
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const isDocsFilled = () => {
    if (
      isPhotoImage(photoFile) === true &&
      isFileRightSize(photoFile) === true &&
      isFileRightSize(idFile) === true &&
      isFileRightSize(cvFile) === true &&
      isDocRightType(idFile) === true &&
      isDocRightType(cvFile) === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isPersonalFilled = () => {
    if (
      isName(name) === true &&
      validateEmail(email) &&
      phoneNumber.length === 10 &&
      gender !== "Gender" &&
      gender !== "" &&
      langsValid
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isAddressInfoFilled = () => {
    return (
      address.length > 0 &&
      province !== "" &&
      cityOption !== "" &&
      isName(suburb) &&
      isPostalCodeRight()
    );
  };

  const handleUpdateLang = (obj: any) => {
    let newLangsArray: any = [];
    if (obj.length > 0) {
      obj.forEach(function (item: any) {
        newLangsArray.push(item.lang);
      });
      setLanguages(newLangsArray);
    }
  };

  const validateLangs = (obj: any) => {
    if (obj.length > 0) {
      setLangsValid(true);
    } else {
      setLangsValid(false);
    }
  };

  const NavButtonsComp = () => {
    return (
      <>
        <NavButtons
          formSection={formSection}
          isPersonalFilled={isPersonalFilled}
          setFormSection={setFormSection}
          isAddressInfoFilled={isAddressInfoFilled}
          isDocsFilled={isDocsFilled}
          checkJobBefore={checkJobBefore}
          jpid={JobID}
          email={email}
        />
      </>
    );
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setCityOption("");
    setSuburb("");
    setPostalCode("");
    setProvince("");
    setGender("");
    setFormSection("Personal");
    checkReadPrivacy();
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.set("photoDocName", photoFile);
    formData.set("idDocName", idFile);
    formData.set("cvDocName", cvFile);

    let workHistory: { company: any; jobTitle: any; jobDescription: any }[] =
      [];
    list.forEach(function (item: any) {
      workHistory.push({
        company: item.company,
        jobTitle: item.job,
        jobDescription: item.description,
      });
    });

    formData.set("jobid", JobID);
    formData.set("name", name);
    formData.set("emailid", email);
    formData.set("contactNo", phoneNumber);
    formData.set("confirmation", confirm);
    formData.set("address", address);
    formData.set("city", cityOption);
    formData.set("suburb", suburb);
    formData.set("postalcode", postalCode);
    formData.set("state", province);
    formData.set("gender", gender);
    formData.set("workHistory", JSON.stringify(workHistory));
    formData.set("resume", `jobs/data/${cvFile.name}`);
    formData.set("identityDoc", `jobs/data/${idFile.name}`);
    formData.set("photo", photoFile.name);
    formData.set("languages", languages.toString());

    const apply = await JobsAPI.jobApply();

    if (apply.result === 1) {
      Swal.fire({
        icon: "success",
        title: "Thank you",
        text: "Job application sent!",
      });
      clearForm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Form Error",
        text: "Please check form details",
      });
    }
  };

  function handlePhoto(event: any) {
    const FileObject = event.target.files[0];
    setPhotoFile(FileObject);
  }

  const checkAppliedFirst = () => {
    return new Promise<void>((resolve) => {
      checkJobBefore(JobID, email);
      resolve();
    });
  };

  const submitApply = async () => {
    await checkAppliedFirst();
    if (hasAlreadyApplied > 0) {
      Swal.fire({
        icon: "error",
        title: "Already Applied",
        text: "You have already applied for this position",
      });
    } else {
      submitForm();
    }
  };

  useEffect(() => {}, [langsValid]);

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          {`Application Form - ${position}`}
        </title>
      </Head>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <main
        className={`
          pt-3
          ${darkMode ? `bg-dark text-light` : ``}
        `}
      >
        <Stack gap={3}>
          <section className="text-center px-3 pt-lg-2">
            <h1 className="text-danger">Job Application form</h1>
            <p className="fst-italic">Applying for {position}</p>
          </section>
          <section className="bg-secondary bg-opacity-50 w-100 py-3">
            <Col xs={12} md={{ span: 10, offset: 1 }} className="my-3 ">
              <div className="position-relative z-index-1 w-100 d-grid gap-3 d-md-block">
                {isMD && <NavButtonsComp />}
                <Form className="d-grid gap-3 pe-3 position-relative z-index-1 order-1">
                  <div className="overflow-hidden">
                    <div
                      className={`
                        ${styles.Form} 
                        ${darkMode ? `${darkFormStyles.main} text-light` : ``}
                        ${formPosition(formSection)} 
                        d-flex gap-3 px-3
                    `}
                    >
                      {/* Personal Section */}

                      <Card
                        className={`
                          ${darkMode ? `bg-black text-light` : ``} 
                          bg-gradient shadow w-100
                        `}
                      >
                        <Card.Header
                          className={`${styles.Form__Header} d-flex align-items-center`}
                        >
                          <h2 className="m-0">
                            1:{" "}
                            <span className="text-secondary">
                              Personal Info
                            </span>
                          </h2>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-grid gap-3 cols-sm-2">
                            <Form.Group controlId="Name">
                              <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`
                                    ${
                                      darkMode
                                        ? `bg-black border-secondary text-light`
                                        : ``
                                    }
                                    `}
                              />
                              <Form.Text
                                className={
                                  isName(name) === true
                                    ? "text-success"
                                    : `${darkMode ? `text-light` : ``}`
                                }
                              >
                                {isName(name) === false ? (
                                  <>Enter a valid name: </>
                                ) : null}

                                {isName(name) === true ? (
                                  <>
                                    <FaCheck /> Name is Valid{" "}
                                  </>
                                ) : null}

                                {name.length === 0 ? (
                                  <span className="text-danger">Required </span>
                                ) : (
                                  ""
                                )}
                                {containsSpecialChars(name) ? (
                                  <span className="text-danger">
                                    - <FaTimes /> No Special Characters{" "}
                                  </span>
                                ) : null}
                                {hasNumber(name) ? (
                                  <span className="text-danger">
                                    - <FaTimes /> No Numbers
                                  </span>
                                ) : null}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="Email">
                              <Form.Control
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`
                                  ${
                                    darkMode
                                      ? `bg-black border-secondary text-light`
                                      : ``
                                  }
                                `}
                              />
                              <Form.Text>
                                {validateEmail(email) ? (
                                  <span className="text-success">
                                    <FaCheck /> Email Valid
                                  </span>
                                ) : (
                                  <span
                                    className={darkMode ? `text-light` : ``}
                                  >
                                    Enter a valid email address:{" "}
                                  </span>
                                )}
                                {email.length === 0 ? (
                                  <span className="text-danger">Required </span>
                                ) : null}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="PhoneNumber">
                              <Form.Control
                                type="text"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={`
                                  ${
                                    darkMode
                                      ? `bg-black border-secondary text-light`
                                      : ``
                                  }
                                `}
                              />
                              <Form.Text>
                                {phoneNumber.length !== 10 ? (
                                  <span
                                    className={darkMode ? `text-light` : ``}
                                  >
                                    Enter a phone number:{" "}
                                    <span className="text-danger">
                                      Required
                                    </span>
                                  </span>
                                ) : (
                                  <span className="text-success">
                                    <FaCheck /> Phone Number Valid
                                  </span>
                                )}
                                {phoneNumber.length === 1 ? (
                                  <span className="text-danger">Required </span>
                                ) : null}
                                {isNaN(Number(phoneNumber)) === true ? (
                                  <span className="text-danger">
                                    <FaTimes /> Only numbers
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group>
                              <Form.Select
                                aria-label="Gender"
                                onChange={(e) => setGender(e.target.value)}
                                className={`
                                  ${
                                    darkMode
                                      ? `border-secondary bg-black text-light`
                                      : ``
                                  }
                                `}
                              >
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Not Relavant">
                                  Not Relevant
                                </option>
                              </Form.Select>
                              <Form.Text>
                                {gender === "Gender" || gender === "" ? (
                                  <span
                                    className={darkMode ? `text-light` : ``}
                                  >
                                    Select a gender:{" "}
                                    <span className="text-danger">
                                      Required
                                    </span>{" "}
                                  </span>
                                ) : (
                                  <>
                                    <span className="text-success">
                                      <FaCheck /> Gender Valid
                                    </span>
                                  </>
                                )}
                              </Form.Text>
                            </Form.Group>
                            <AddNewLangs
                              validateLangs={validateLangs}
                              handleUpdateLang={handleUpdateLang}
                            />
                          </div>
                          {!isMD && <NavButtonsComp />}
                        </Card.Body>
                      </Card>
                      {/* /Personal Section */}

                      {/* Address Section */}
                      <Card
                        className={`
                          shadow w-100
                          ${darkMode ? `bg-black bg-gradient text-light` : ``}
                        `}
                      >
                        <Card.Header
                          className={`${styles.Form__Header} d-flex align-items-center`}
                        >
                          <h2 className="m-0">
                            2:{" "}
                            <span className="text-secondary">Address Info</span>
                          </h2>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-grid gap-3 cols-sm-2">
                            <Form.Group
                              controlId="Address"
                              className="span-full"
                            >
                              <Form.Control
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={
                                  darkMode
                                    ? `bg-black border-secondary text-light`
                                    : ``
                                }
                              />
                              <Form.Text
                                className={darkMode ? `text-light` : ``}
                              >
                                {address.length === 0 ? (
                                  <span>
                                    Please fill in Address{" "}
                                    <span className="text-danger">
                                      <FaAsterisk /> Required
                                    </span>
                                  </span>
                                ) : (
                                  <span className="text-success">
                                    <FaCheck /> Address filled
                                  </span>
                                )}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group>
                              <Form.Select
                                aria-label="state"
                                value={province}
                                onChange={(e) => {
                                  setProvince(e.target.value);
                                }}
                                className={`
                                  ${
                                    darkMode
                                      ? `bg-black border-secondary text-light`
                                      : ``
                                  }
                                `}
                              >
                                <option value="">Choose Province</option>
                                <option value="EASTERN CAPE">
                                  EASTERN CAPE
                                </option>
                                <option value="GAUTENG">GAUTENG</option>
                                <option value="KWAZULU-NATAL">
                                  KWAZULU-NATAL
                                </option>
                                <option value="MPUMALANGA">MPUMALANGA</option>
                                <option value="NORTHERN CAPE">
                                  NORTHERN CAPE
                                </option>
                                <option value="LIMPOPO">LIMPOPO</option>
                                <option value="NORTH WEST">NORTH WEST</option>
                                <option value="WESTERN CAPE">
                                  WESTERN CAPE
                                </option>
                              </Form.Select>
                              <Form.Text
                                className={darkMode ? `text-light` : ``}
                              >
                                {province === "" ? (
                                  <span>
                                    Please choose a Province{" "}
                                    <span className="text-danger">
                                      <FaAsterisk /> Required
                                    </span>
                                  </span>
                                ) : (
                                  <span className="text-success">
                                    <FaCheck /> Province Selected
                                  </span>
                                )}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group>
                              <Form.Select
                                aria-label="CityOption"
                                value={cityOption}
                                onChange={(e) => setCityOption(e.target.value)}
                                className={`${
                                  darkMode
                                    ? `bg-black text-light border-secondary`
                                    : ``
                                }`}
                              >
                                <option value="">Choose City</option>
                                {filteredCities.map((city: any) => {
                                  return (
                                    <option key={nanoid(5)}>{city.City}</option>
                                  );
                                })}
                              </Form.Select>
                              <Form.Text
                                className={darkMode ? `text-light` : ``}
                              >
                                {cityOption === "" ? (
                                  <span>
                                    Please choose a City{" "}
                                    <span className="text-danger">
                                      <FaAsterisk /> Required
                                    </span>
                                  </span>
                                ) : (
                                  <span className="text-success">
                                    <FaCheck /> City Selected
                                  </span>
                                )}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="Suburb">
                              <Form.Control
                                type="text"
                                placeholder="Suburb"
                                value={suburb}
                                onChange={(e) => setSuburb(e.target.value)}
                                className={`${
                                  darkMode
                                    ? `bg-black text-light border-secondary`
                                    : ``
                                }`}
                              />
                              <Form.Text
                                className={darkMode ? `text-light` : ``}
                              >
                                {suburb.length === 0 ? (
                                  <span>
                                    Please type Suburb{" "}
                                    <span className="text-danger">
                                      <FaAsterisk /> Required{" "}
                                    </span>
                                  </span>
                                ) : null}
                                {containsSpecialChars(suburb) ? (
                                  <span className="text-danger">
                                    <FaTimes /> Can&apos;t have special
                                    characters{" "}
                                  </span>
                                ) : null}
                                {hasNumber(suburb) ? (
                                  <span className="text-danger">
                                    <FaTimes /> Can&apos;t have numbers{" "}
                                  </span>
                                ) : null}
                                {isName(suburb) === true ? (
                                  <span className="text-success">
                                    <FaCheck /> Suburb is Filled{" "}
                                  </span>
                                ) : null}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="PostalCode">
                              <Form.Control
                                type="number"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className={`${
                                  darkMode
                                    ? `bg-black text-light border-secondary`
                                    : ``
                                }`}
                              />
                              <Form.Text
                                className={darkMode ? `text-light` : ``}
                              >
                                {postalCode.length === 0 ? (
                                  <span>
                                    Please type Suburb{" "}
                                    <span className="text-danger">
                                      <FaAsterisk /> Required{" "}
                                    </span>
                                  </span>
                                ) : null}
                                {containsSpecialChars(postalCode) ? (
                                  <span className="text-danger">
                                    <FaTimes /> Can&apos;t have special
                                    characters{" "}
                                  </span>
                                ) : null}
                                {isPostalCodeRight() ? (
                                  <span className="text-success">
                                    <FaCheck /> Postal Code is Filled{" "}
                                  </span>
                                ) : null}
                              </Form.Text>
                            </Form.Group>
                            {!isMD && <NavButtonsComp />}
                          </div>
                        </Card.Body>
                      </Card>
                      {/* /Address Section */}

                      {/* Work Info Section */}
                      <Card
                        className={`
                          ${darkMode ? `bg-black text-light bg-gradient` : ``}
                          shadow w-100
                        `}
                      >
                        <Card.Header className="pe-2 ps-3 py-1">
                          <div
                            className={`d-flex justify-content-between align-items-center`}
                          >
                            <h2 className="m-0">
                              3: <span className="text-secondary">Work</span>
                            </h2>
                            {!showAddForm ? (
                              <Button
                                className="googleBtn m-2"
                                onClick={() => setShowAddForm(true)}
                              >
                                <FaPlus /> Add Position
                              </Button>
                            ) : (
                              <Button
                                className="googleBtn m-2"
                                onClick={() => setShowAddForm(false)}
                              >
                                <small>
                                  <FaMinus /> Hide{" "}
                                  <span
                                    className={`
                                      fw-2 p-1 px-3 bg-dark rounded-pill bg-opacity-25
                                    `}
                                  >
                                    Add Position
                                  </span>
                                </small>
                              </Button>
                            )}
                          </div>
                        </Card.Header>
                        <Card.Body className="position-relative">
                          <div>
                            <div
                              className={`${styles.Work__Content} overflow-auto Scrollbar-01`}
                            >
                              <AddItem
                                company={company}
                                job={job}
                                description={description}
                                onChange={handleChange}
                                onAdd={handleAdd}
                                showAddForm={showAddForm}
                                setShowAddForm={setShowAddForm}
                              />

                              <h3 className="fs-4">Work Positions</h3>

                              <small>
                                <Table
                                  striped
                                  bordered
                                  hover
                                  className={darkMode ? `table-dark` : ``}
                                >
                                  {isMD && (
                                    <thead
                                      className={`
                                        ${darkMode ? `text-light` : `text-dark`}
                                      `}
                                    >
                                      <tr>
                                        <th className="fw-2">Company</th>
                                        <th className="fw-2">Position</th>
                                        <th className="fw-2">Description</th>
                                      </tr>
                                    </thead>
                                  )}

                                  <tbody>
                                    {Array.from(list).map((item: any, index) =>
                                      updateState === item.id ? (
                                        <EditItem
                                          key={index}
                                          list={list}
                                          setList={setList}
                                          item={item}
                                          handleUpdate={handleUpdate}
                                        />
                                      ) : (
                                        <tr key={index}>
                                          {!isMD && (
                                            <td
                                              className={`
                                                d-grid gap-2 cols-sm-10 align-items-start
                                                ${
                                                  darkMode
                                                    ? `text-light`
                                                    : `text-dark`
                                                }
                                              `}
                                            >
                                              <div className="span-sm-9">
                                                <p className="m-0">
                                                  <span className="fw-2">
                                                    Company:{" "}
                                                  </span>
                                                  <span>{item.company}</span>
                                                </p>
                                                <p className="m-0">
                                                  <span className="fw-2">
                                                    Position:{" "}
                                                  </span>
                                                  <span>{item.job}</span>
                                                </p>
                                                <p className="m-0">
                                                  <span className="fw-2">
                                                    Description:{" "}
                                                  </span>
                                                  <span>
                                                    {item.description}
                                                  </span>
                                                </p>
                                              </div>

                                              <div className="d-flex gap-2">
                                                <Button
                                                  className="d-flex align-items-center"
                                                  onClick={() =>
                                                    handleEdit(item.id)
                                                  }
                                                >
                                                  <FaEdit />
                                                </Button>
                                                <Button
                                                  className="d-flex align-items-center"
                                                  variant="danger"
                                                  onClick={() =>
                                                    deleteJob(item.id)
                                                  }
                                                >
                                                  <FaTrash />
                                                </Button>
                                              </div>
                                            </td>
                                          )}
                                          {isMD && (
                                            <>
                                              <td
                                                className={`${
                                                  darkMode ? `text-light` : ``
                                                }`}
                                              >
                                                {item.company}
                                              </td>
                                              <td
                                                className={`${
                                                  darkMode ? `text-light` : ``
                                                }`}
                                              >
                                                {item.job}
                                              </td>
                                              <td
                                                className={`${
                                                  darkMode ? `text-light` : ``
                                                }`}
                                              >
                                                {item.description}
                                              </td>
                                              <td>
                                                <span className="d-flex gap-2">
                                                  <Button
                                                    className="d-flex align-items-center"
                                                    onClick={() =>
                                                      handleEdit(item.id)
                                                    }
                                                  >
                                                    <FaEdit />
                                                  </Button>
                                                  <Button
                                                    className="d-flex align-items-center"
                                                    variant="danger"
                                                    onClick={() =>
                                                      deleteJob(item.id)
                                                    }
                                                  >
                                                    <FaTrash />
                                                  </Button>
                                                </span>
                                              </td>
                                            </>
                                          )}
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </Table>
                              </small>

                              {list.size === 0 ? (
                                <section
                                  className={`
                                    ${darkMode ? `border-secondary` : ``}  
                                    d-flex justify-content-center align-items-center w-100 flex-column border border-2 rounded p-2
                                  `}
                                >
                                  <p className="m-0">No Job Positions Added</p>
                                </section>
                              ) : null}
                            </div>
                            {!isMD && <NavButtonsComp />}
                          </div>
                        </Card.Body>
                      </Card>
                      {/* /Work Info Section */}

                      {/* Documents Section */}
                      <Card
                        className={`${
                          darkMode ? `bg-black bg-gradient text-light` : ``
                        } shadow w-100`}
                      >
                        <Card.Header
                          className={`${styles.Form__Header} d-flex align-items-center`}
                        >
                          <h2 className="m-0">
                            4: <span className="text-secondary">Documents</span>
                          </h2>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-grid gap-2 cols-sm-2 cols-md-4 justify-items-center">
                            <div className="span-full">
                              <div className="d-flex flex-wrap cols-sm-2 gap-3 align-items-center justify-content-center">
                                <div
                                  className={`${styles.Docs__PhotoPreview} bg-dark border border-secondary d-flex justify-content-center align-items-center rounded-circle overflow-hidden position-relative`}
                                >
                                  <FaImage className="text-light fs-2" />
                                  <Image
                                    src={
                                      photoFile !== undefined
                                        ? URL.createObjectURL(photoFile)
                                        : ""
                                    }
                                    alt=""
                                    className={`position-absolute w-100 h-100 object-fit-cover`}
                                  />
                                </div>
                                <div>
                                  <div>
                                    <h3 className="m-0">Photo</h3>
                                    <div>
                                      <Form.Text
                                        className={darkMode ? `text-light` : ``}
                                      >
                                        <span
                                          className={
                                            isFileRightSize(photoFile)
                                              ? "text-success"
                                              : photoFile !== undefined
                                              ? "text-danger"
                                              : ""
                                          }
                                        >
                                          {isFileRightSize(photoFile) ? (
                                            <FaCheck />
                                          ) : photoFile !== undefined ? (
                                            <FaTimes />
                                          ) : (
                                            ""
                                          )}{" "}
                                          Less than 2MB.
                                        </span>
                                        <span
                                          className={
                                            isPhotoImage(photoFile)
                                              ? "text-success"
                                              : photoFile !== undefined
                                              ? "text-danger"
                                              : ""
                                          }
                                        >
                                          {" "}
                                          {isPhotoImage(phoneNumber) ? (
                                            <FaCheck />
                                          ) : photoFile !== undefined ? (
                                            <FaTimes />
                                          ) : (
                                            ""
                                          )}{" "}
                                          Allowed file types : jpg, png
                                        </span>
                                      </Form.Text>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center gap-3 pe-2">
                                    <Form.Group
                                      controlId="formPhoto"
                                      className="mb-3"
                                    >
                                      <Form.Control
                                        type="file"
                                        onChange={handlePhoto}
                                        ref={photoDoc}
                                        name="photoDocName"
                                        className={`${
                                          darkMode
                                            ? `bg-dark text-light bg-gradient border-secondary`
                                            : ``
                                        } mt-3`}
                                      />
                                    </Form.Group>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Form.Group
                              controlId="UploadID"
                              className="span-md-2"
                            >
                              <div>
                                <h3 className="m-0">ID</h3>
                                <div>
                                  <Form.Text
                                    className={darkMode ? `text-light` : ``}
                                  >
                                    <span
                                      className={
                                        isFileRightSize(idFile)
                                          ? "text-success"
                                          : idFile !== undefined
                                          ? "text-danger"
                                          : ""
                                      }
                                    >
                                      {isFileRightSize(idFile) ? (
                                        <FaCheck />
                                      ) : idFile !== undefined ? (
                                        <FaTimes />
                                      ) : (
                                        ""
                                      )}{" "}
                                      Less than 2MB.{" "}
                                    </span>
                                    <span
                                      className={
                                        isDocRightType(idFile)
                                          ? "text-success"
                                          : idFile !== undefined
                                          ? "text-danger"
                                          : ""
                                      }
                                    >
                                      {isDocRightType(idFile) ? (
                                        <FaCheck />
                                      ) : idFile !== undefined ? (
                                        <FaTimes />
                                      ) : (
                                        ""
                                      )}{" "}
                                      Allowed file types : doc, docx, pdf, jpg,
                                      png
                                    </span>
                                  </Form.Text>
                                </div>
                              </div>

                              <Form.Group controlId="formID" className="mb-3">
                                <Form.Control
                                  type="file"
                                  onChange={handleID}
                                  ref={idDoc}
                                  name="idDocName"
                                  className={`${
                                    darkMode
                                      ? `bg-dark text-light bg-gradient border-secondary`
                                      : ``
                                  } mt-3`}
                                />
                              </Form.Group>
                            </Form.Group>
                            <Form.Group
                              controlId="UploadCV"
                              className="span-md-2"
                            >
                              <div className="px-2">
                                <h3 className="m-0">CV</h3>
                                <div>
                                  <Form.Text
                                    className={darkMode ? `text-light` : ``}
                                  >
                                    <span
                                      className={
                                        isFileRightSize(cvFile)
                                          ? "text-success"
                                          : cvFile !== undefined
                                          ? "text-danger"
                                          : ""
                                      }
                                    >
                                      {isFileRightSize(cvFile) ? (
                                        <FaCheck />
                                      ) : cvFile !== undefined ? (
                                        <FaTimes />
                                      ) : (
                                        ""
                                      )}{" "}
                                      Less than 2MB.
                                    </span>{" "}
                                    <span
                                      className={
                                        isDocRightType(cvFile)
                                          ? "text-success"
                                          : cvFile !== undefined
                                          ? "text-danger"
                                          : ""
                                      }
                                    >
                                      {isDocRightType(cvFile) ? (
                                        <FaCheck />
                                      ) : cvFile !== undefined ? (
                                        <FaTimes />
                                      ) : (
                                        ""
                                      )}{" "}
                                      Allowed file types : doc, docx, pdf, image
                                    </span>
                                  </Form.Text>
                                </div>
                              </div>

                              <Form.Group controlId="formCV" className="mb-3">
                                <Form.Control
                                  type="file"
                                  onChange={handleCV}
                                  ref={cvDoc}
                                  name="cvDocName"
                                  className={`${
                                    darkMode
                                      ? `bg-dark text-light bg-gradient border-secondary`
                                      : ``
                                  } mt-3`}
                                />
                              </Form.Group>
                            </Form.Group>
                          </div>
                          {!isMD && <NavButtonsComp />}
                        </Card.Body>
                      </Card>
                      {/* /Documents Section */}

                      {/* Approval Section */}
                      <Card
                        className={`${
                          darkMode ? `bg-black bg-gradient text-light` : ``
                        } shadow w-100`}
                      >
                        <Card.Header
                          className={`${styles.Form__Header} d-flex align-items-center`}
                        >
                          <h2 className="m-0">
                            5: <span className="text-secondary">Confirm</span>
                          </h2>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-grid gap-3">
                            <div
                              className={`${
                                darkMode ? `bg-secondary` : `bg-dark`
                              } px-3 py-2 bg-opacity-10 rounded`}
                            >
                              <Form.Check
                                onChange={checkReadPrivacy}
                                type="checkbox"
                                id="readPrivacyPolicy"
                                label={`I have read the Privacy Notice below and consent the processing of my data as part of my job application.`}
                              />
                            </div>
                            <div className="d-flex flex-wrap gap-3 w-100 align-items-center">
                              <div>
                                {!confirm ? (
                                  <p>
                                    <FaInfo className="text-primary" /> Please
                                    confirm Privacy Policy to Submit your form
                                  </p>
                                ) : (
                                  <Button
                                    onClick={submitApply}
                                    className="googleBtn m-2"
                                    variant="success"
                                  >
                                    Submit
                                  </Button>
                                )}

                                <Link
                                  href="/privacy-policy/x/818.aspx"
                                  target="_blank"
                                >
                                  <Button
                                    className="googleBtn m-2"
                                    variant="warning"
                                  >
                                    Privacy Poilicy
                                  </Button>
                                </Link>
                              </div>
                            </div>
                            {!isMD && <NavButtonsComp />}
                          </div>
                        </Card.Body>
                      </Card>
                      {/* /Approval Section */}
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </section>
        </Stack>
      </main>
    </>
  );
};

export default Home;
