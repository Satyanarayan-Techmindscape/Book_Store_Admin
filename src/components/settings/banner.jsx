import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
// import { data } from "../../../assets/data/category";
import Datatable from "../common/datatable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { post, get, remove, put } from "../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import data from "../../assets/data/taxes";
import axios from "axios";

const Banner = () => {
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  let [coupon, setcoupon] = useState(0);
  let [special, setspecial] = useState(0);
  const nav = useNavigate();

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const [input, setInput] = useState({
    category_name: "",
    file: "",
    id: "",
    type: "general",
  });

  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };
  const getData = async () => {
    setdata([]);
    setInput({
      category_name: "",
      file: "",
      id: "",
      type: "general",
    });
    await get("admin/banner").then((res) => {
      special = 0;
      coupon = 0;
      if (res.response) {
        let cat_data = res.data;
        // console.log(cat_data);

        let new_cat = cat_data.map((data) => {
          if (data.type == "coupon") {
            coupon += 1;
            setcoupon(coupon);
            // console.log(coupon);
          }
          if (data.type == "special") {
            setspecial(special + 1);
          }
          return {
            image: (
              <img
                alt=""
                src={
                  data.path == null
                    ? "https://fastly.picsum.photos/id/925/200/300.jpg?hmac=1mxh8L9qVukkpb-iUojF9keY4Eq6gL0Ip0-kRYFE4gg"
                    : "https://yrpitsolutions.com/Bookstore_API/" + data.path
                }
                style={{ width: 50, height: 50 }}
              />
            ),
            Title: data.title,
            SubTitle: data.sub_title,
            type:
              data.type === "general"
                ? "Main"
                : data.type === "special"
                ? "Secondary"
                : data.type === "coupon"
                ? "Promo"
                :  data.type === "primary"?
                "Primary":null,
            id: data.id,
            link: data.link,
            status:<div id="app-cover">
           
            <div class="row">
              <div class="toggle-button-cover">
                <div class="button-cover">
                  <div class="button b2" id="button-16">
                    <input type="checkbox" checked={!data.is_active} onChange={(e)=>{
                      data.is_active=e.target.checked;
                      updateCategory(data)}} class="checkbox" />
                    <div class="knobs"></div>
                    <div class="layer"></div>
                  </div>
                </div>
              </div>
             
             
            </div>
          </div>
          };
        });
        setdata(new_cat);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const addCategory = async () => {
    // const FormData = require("form-data");
    // let payload_data = new FormData();
    // payload_data.append("title", input.title);
    // payload_data.append("sub_title", input.sub_title);
    // payload_data.append("link", input.link);
    // payload_data.append("type", input.type);

    let input__ = document.querySelector("input[type=file]"),
      file__ = input__.files[0];
    console.log(file__);
    // payload_data.append("banner", input__.files[0]);
    // payload_data.append("extension", "");
    //if the file isn't a image nothing happens.
    //you are free to implement a fallback
    if (!file__) return;
    // if (!file__ || !file__.type.match(/image.*/) ) return;

    // await post("admin/banner/store", payload_data).then((res) => {
    //   if (res.data.success) {
    //     onCloseModal("VaryingMdo");
    //     getData();
    //     toast.success("added Category Successfully");
    //   } else {
    //     console.log(
    //       "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
    //       res.data.message
    //     );
    //   }
    // });
    const baseURL =
      "https://yrpitsolutions.com/Bookstore_API/admin/banner/store";
    const FormData = require("form-data");
    let payload_data = new FormData();
    payload_data.append("banner", input__.files[0]);
    payload_data.append("banner_mobile", input__.files[0]);
    payload_data.append("test", "sdafd");
    payload_data.append("title", input.title);
    payload_data.append("sub_title", input.sub_title);
    payload_data.append("link", input.link);
    payload_data.append("type", input.type);
    payload_data.append("is_active", 1);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL,
      headers: {
        Accept: "application/json",
      },
      data: payload_data,
    };

    await axios
      .request(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));

        if (res.data.success) {
          onCloseModal("VaryingMdo");
          getData();
          toast.success("added Category Successfully");
        } else {
          console.log(
            "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
            res.data.message
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateCategory = async (data) => {
    const baseURL =
      "https://yrpitsolutions.com/Bookstore_API/admin/banner/update/" + data.id;
    console.log("data " + data.image);
    let payload_data = new FormData();
    payload_data.append("title", data.title);
    payload_data.append("sub_title", data.sub_title);
    payload_data.append("link", data.link);
    payload_data.append("type", data.type);
    payload_data.append("banner", data.image);
    
    payload_data.append("banner_mobile", data.imagemob);
    payload_data.append("is_active", data.is_active==true?0:1);
    payload_data.append("extension", "jpg");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL,
      headers: {
        Accept: "application/json",
      },
      data: payload_data,
    };

    await axios
      .request(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        if (res.data.success) {
          getData();
          toast.success("Banner Updated Successfully");
        } else {
          console.log(
            "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
            res.data.message
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // await post("admin/banner/update/" + data.id, payload_data).then((res) => {
    //   if (res.data.success) {
    //     getData();
    //     toast.success("Banner Updated Successfully");
    //   } else {
    //     console.log(
    //       "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
    //       res.data.message
    //     );
    //   }
    // });
  };

  const deleteCategory = async (id) => {
    await remove("admin/banner/destroy/" + id, null).then((res) => {
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        getData();
        toast.success("Deleted Category Successfully");
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  return (
    <Fragment>
      <Breadcrumb title="" parent="Banner" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Banner</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    type="button"
                    color="primary"
                    onClick={onOpenModal}
                    data-toggle="modal"
                    data-original-title="test"
                    data-target="#exampleModal"
                  >
                    Add Banner
                  </Button>
                  &nbsp;
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Banner
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Title :
                          </Label>
                          <Input
                            type="text"
                            name="category_name"
                            onChange={(e) =>
                              setInputChange(e.target.value, "title")
                            }
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Sub Title :
                          </Label>
                          <Input
                            type="text"
                            name="sub_title"
                            onChange={(e) =>
                              setInputChange(e.target.value, "sub_title")
                            }
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Link :
                          </Label>
                          <Input
                            type="text"
                            name="link"
                            onChange={(e) =>
                              setInputChange(e.target.value, "link")
                            }
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            {input.type === "general" ? 
                            <>Banner Video(mp4) / Image(1920 x 530px)</>
                            :
                            <>Banner Image(
                            {/* {input.type === "general" && "1920 x 530px"} */}
                            {input.type === "coupon" && "300 x 200px"}
                            {input.type === "special" && "1920 x 530px"}
                            {input.type === "primary" && "1920 x 30px"})</>} : 
                          </Label>
                          <Input
                            onChange={(e) =>
                              setInputChange(e.target.files[0], "banner")
                            }
                            className="form-control"
                            id="validationCustom02"
                            type="file"
                            name="category_img"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            {input.type === "general" ? 
                            <>Banner Mobile Video(mp4) / Image(1920 x 530px)</>
                            :
                            <>Banner Mobile Image(
                            {/* {input.type === "general" && "1920 x 530px"} */}
                            {input.type === "coupon" && "150 x 100px"}
                            {input.type === "special" && "400 x 530px"}
                            {input.type === "primary" && "400 x 80px"})</>} :
                          </Label>
                          <Input
                            onChange={(e) =>
                              setInputChange(e.target.files[0], "banner_mobile")
                            }
                            className="form-control"
                            id="validationCustom022"
                            type="file"
                            name="category_img2"
                          />
                        </FormGroup>
                        <FormGroup className="m-checkbox-inline mb-3 custom-radio-ml d-flex radio-animated mt-3">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Banner Type :
                          </Label>
                          <Label className="d-block" >
                            <Input
                              className=""
                              id="edo-ani2"
                              type="radio"
                              name="rdo-ani"
                              
                              onChange={(e) =>
                                setInputChange("primary", "type")
                              }
                              style={{ marginRight: 5 }}
                            />
                            Primary {"  "}
                          </Label>
                          <Label className="d-block" style={{ marginLeft: 20 }}>
                            <Input
                              className=""
                              id="edo-ani"
                              type="radio"
                              name="rdo-ani"
                               style={{ marginRight: 5 }}
                              onChange={(e) =>
                                setInputChange("general", "type")
                              }
                            />
                            Main {"  "}
                          </Label>
                          {/* {special < 1 && ( */}
                          <Label className="d-block" style={{ marginLeft: 20 }}>
                            <Input
                              className=""
                              id="edo-ani2"
                              type="radio"
                              name="rdo-ani"
                               style={{ marginRight: 5 }}
                              onChange={(e) =>
                                setInputChange("special", "type")
                              }
                            />
                            Secondary
                          </Label>
                          {/* )}
                          {coupon < 2 && ( */}
                          <Label className="d-block" style={{ marginLeft: 20 }}>
                            <Input
                              className=""
                              id="edo-ani"
                              type="radio"
                              name="rdo-ani"
                               style={{ marginRight: 5 }}
                              onChange={(e) => setInputChange("coupon", "type")}
                            />
                            Promo {"  "}
                          </Label>
                          {/* )} */}
                        </FormGroup>
                        {/* <FormGroup className="m-checkbox-inline mb-3 custom-radio-ml d-flex radio-animated mt-3">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Is Active :
                          </Label>
                          <Label className="d-block">
                            <Input
                              className=""
                              id="edo-ani-is_active-1"
                              type="radio"
                              name="rdo-ani-is_active-1"
                              onChange={(e) =>
                                setInputChange(1, "is_active")
                              }
                              style={{ marginRight: 5 }}
                            />
                            Yes {"  "}
                          </Label>
                          <Label className="d-block"  style={{ marginLeft: 20 }}>
                            <Input
                              className=""
                              id="edo-ani-is_active-0"
                              type="radio"
                              name="rdo-ani-is_active-0"
                              onChange={(e) =>
                                setInputChange(0, "is_active")
                              }
                              style={{ marginRight: 5 }}
                            />
                            No {"  "}
                          </Label>
                        </FormGroup> */}
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={() => addCategory()}>Save</Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => onCloseModal("VaryingMdo")}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <div className="clearfix"></div>

                <div id="basicScenario" className="product-physical">
                  {data.length > 0 && (
                    <Datatable
                      myData={data}
                      // myData={data}
                      notaction={false}
                      mopen={onOpenModal}
                      multiSelectOption={false}
                      pageSize={10}
                      pagination={true}
                      setInputChange={setInputChange}
                      coupon={coupon}
                      special={special}
                      deleteItem={deleteCategory}
                      updateItem={updateCategory}
                      type={"banner"}
                      class="-striped -highlight"
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Banner;
