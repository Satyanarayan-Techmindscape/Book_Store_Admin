import { Fragment, useContext } from "react";

import designer from "../../assets/images/dashboard/Weet_Logo  250px.png";

import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Settings } from "react-feather";
import { Input, Table } from "reactstrap";
import { get, post } from "../../services/apiHandler";
import Image from "../common/image";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Header from "../common/header_components/header";
import { AuthContext } from "../../hooks/AuthContextProvider";

const Profile = () => {
  const context = useContext(AuthContext);

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    oldPassword: "",
    gpassword: "",
    cpassword: "",
  });

  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };

  const getdata = async () => {
    await get("admin/profile/get").then((res) => {
      console.log(res, "response");
      if (res.response) {
        console.log(res.response + "response");

        setInput(res.data.user);
      } else {
        console.log(
          "🚀 ~ file: loginTabset.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  useEffect(() => {
    getdata();
  }, []);
  const Submit = async () => {
    
    if (input.gpassword === undefined || input.gpassword === "undefined") {
      input.gpassword = "";
    }
    if (input.cpassword === undefined || input.cpassword === "undefined") {
      input.cpassword = "";
    }

    if (input.gpassword != input.cpassword) {
      toast.warning("Password And Confirm Password Not Match");
      return;
    }
    let payload_data = new FormData();
    let payload_data1 = new FormData();
    payload_data.append("avatar", input.avatar);
   
    payload_data.append("name", input.name);
    payload_data.append("email", input.email);
    payload_data.append("phone", input.phone);
    payload_data.append("password", input.gpassword);
    payload_data.append("oldPassword", input.oldPassword);

    await post("admin/profile/update", payload_data).then((res) => {
      if (res.data.success) {
        toast.success("Successfully Saved");
        getdata();
        context.setapicall(true);
      } else {
        toast.warning(res.data.message);
      }
    });
  };

  return (
    <Fragment>
      <Breadcrumb title="Profile" parent="Settings" />
      <Container fluid={true}>
        <Row>
          <Col xl="4">
            <Card>
              <CardBody>
                <div className="profile-details text-center">
                  <img
                    src={
                      input.avatar != null || undefined
                        ? "https://yrpitsolutions.com/Bookstore_API/" +
                          input.avatar
                        : "https://yrpitsolutions.com/Bookstore_API/images/logo.png"
                    }
                    alt=""
                    width={100}
                    height={100}
                    className=" rounded-circle blur-up lazyloaded"
                  />
                  <h5 className="f-w-600 f-16 mb-0">Weetkart</h5>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <div>
                  <Tabs>
                    <TabList className="nav nav-tabs tab-coupon">
                      <Tab className="nav-link">
                        <User className="me-2" />
                        Admin Profile
                      </Tab>
                      {/* <Tab className="nav-link">
						<Settings className="me-2" />
						Contact
					</Tab> */}
                    </TabList>

                    <TabPanel>
                      <div className="tab-pane fade show active">
                        <h5 className="f-w-600 f-16">Profile</h5>
                        <div className="table-responsive profile-table">
                          <Table
                            className="table-responsive"
                            style={{ borderCollapse: "none" }}
                          >
                            <div
                              className="form form-label-center"
                              style={{ borderCollapse: "none" }}
                            >
                              <tbody style={{ borderCollapse: "none" }}>
                                <tr>
                                  <td>
                                    {" "}
                                    <Input
                                      onChange={(e) =>
                                        setInputChange(
                                          e.target.files[0],
                                          "avatar"
                                        )
                                      }
                                      className="form-control"
                                      id="validationCustom02"
                                      type="file"
                                      name="category_img"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>Full Name:</td>
                                  <td>
                                    {" "}
                                    <div className="col-xl-8 col-sm-7">
                                      {" "}
                                      <Input
                                        value={input.name}
                                        onChange={(e) =>
                                          setInputChange(e.target.value, "name")
                                        }
                                        className="form-control"
                                        name="product_name"
                                        id="validationCustom01"
                                        type="text"
                                        required
                                      />
                                    </div>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Email:</td>
                                  <td>
                                    {" "}
                                    <div className="col-xl-8 col-sm-7">
                                      {" "}
                                      <Input
                                        value={input.email}
                                        onChange={(e) =>
                                          setInputChange(
                                            e.target.value,
                                            "email"
                                          )
                                        }
                                        className="form-control"
                                        name="product_name"
                                        id="validationCustom01"
                                        type="email"
                                        required
                                      />
                                    </div>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Mobile Number:</td>
                                  <td>
                                    {" "}
                                    <div className="col-xl-8 col-sm-7">
                                      {" "}
                                      <Input
                                        value={input.phone}
                                        onChange={(e) =>
                                          setInputChange(
                                            e.target.value,
                                            "phone"
                                          )
                                        }
                                        className="form-control"
                                        name="product_name"
                                        id="validationCustom01"
                                        type="number"
                                        required
                                      />
                                    </div>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Old Password:</td>
                                  <td>
                                    {" "}
                                    <div className="col-xl-8 col-sm-7">
                                      {" "}
                                      <Input
                                        onChange={(e) =>
                                          setInputChange(
                                            e.target.value,
                                            "oldPassword"
                                          )
                                        }
                                        className="form-control"
                                        name="product_name"
                                        id="validationCustom01"
                                        type="password"
                                        required
                                      />
                                    </div>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Password:</td>
                                  <td>
                                    {" "}
                                    <div className="col-xl-8 col-sm-7">
                                      {" "}
                                      <Input
                                        onChange={(e) =>
                                          setInputChange(
                                            e.target.value,
                                            "gpassword"
                                          )
                                        }
                                        className="form-control"
                                        name="product_name"
                                        id="validationCustom01"
                                        type="password"
                                        required
                                      />
                                    </div>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Confirm Password:</td>
                                  <td>
                                    {" "}
                                    <div className="col-xl-8 col-sm-7">
                                      {" "}
                                      <Input
                                        onChange={(e) =>
                                          setInputChange(
                                            e.target.value,
                                            "cpassword"
                                          )
                                        }
                                        className="form-control"
                                        name="product_name"
                                        id="validationCustom01"
                                        type="password"
                                        required
                                      />
                                    </div>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>
                                    {" "}
                                    <div className="col-xl-8 col-sm-7">
                                      <Button
                                        type="button"
                                        color="primary"
                                        onClick={() => Submit()}
                                      >
                                        Save
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </div>
                          </Table>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
