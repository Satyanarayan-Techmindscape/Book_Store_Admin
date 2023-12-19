import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
// import { data } from "../../../assets/data/category";
import Datatable from "../../common/datatable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Dropdown,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { post, get, remove, put } from "../../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  console.log("🚩 ~ file: category.js:35 ~ Category ~ categoryData:", categoryData)
  const [header, setHeader] = useState([]);
  const [open, setOpen] = useState(false);
  const [dropen, setdropen] = useState(false);
  const [drdata, setdrdata] = useState("Category");

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
  });

  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };
  const getdata = async () => {
    setCategoryData([]);
    setInput({});
    await get("admin/category/allparent").then((res) => {
      if (res.data.success) {
        let cat_data = res.data?.categories.categories.data;
        let new_cat = cat_data.map((category) => {
          return {
            image: (
              <img
                alt=""
                src={
                  category.icon == null
                    ? "https://fastly.picsum.photos/id/925/200/300.jpg?hmac=1mxh8L9qVukkpb-iUojF9keY4Eq6gL0Ip0-kRYFE4gg"
                    : "https://yrpitsolutions.com/Bookstore_API/" + category.icon
                }
                style={{ width: 50, height: 50 }}
              />
            ),
            header: category.menu_name,
            category: category.name,
            id: category.id,
          };
        });
        setCategoryData(new_cat);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
    await get("admin/header").then((res) => {
      if (res.data.success) {
        console.log(res);
        let cat_data = res.data.data;
        let new_cat = cat_data.map((category) => {
          return {
            name: category.name,

            id: category.id,
          };
        });
        setHeader(new_cat);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  const addCategory = async () => {
    let payload_data = new FormData();
    payload_data.append("name", input.category_name);
    payload_data.append("parent_id", "0");
    payload_data.append("icon", input.file);
    payload_data.append("header", input.header);
    var radios = document.getElementsByClassName("radio_animated");
    var value;
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        // get value, set checked flag or do whatever you need to
        value = radios[i].value;
        break;
      }
    }
    payload_data.append("is_instock", value);

    if (
      input.category_name == null ||
      input.file == null ||
      input.header == null
    ) {
      toast.warning("Please Fill All the fileds");
      return;
    }
    await post("admin/category/store", payload_data).then((res) => {
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        getdata();
        toast.success("added Category Successfully");
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  const updateCategory = async (data) => {
    let payload_data = new FormData();
    payload_data.append("name", data.name);
    payload_data.append("parent_id", "0");
    payload_data.append("icon", data.file);
    payload_data.append("lang", "en");
    payload_data.append("instock", "en");
    await axios
      .post(
        "https://yrpitsolutions.com/Bookstore_API/admin/category/update/" +
          data.id,
        payload_data,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          getdata();
          toast.success("Category Updated Successfully");
        } else {
          console.log(
            "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
            res.data.message
          );
        }
      });
  };

  const deleteCategory = async (id) => {
    await axios
      .delete(
        "https://yrpitsolutions.com/Bookstore_API/admin/category/destroy/" + id,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          onCloseModal("VaryingMdo");
          getdata();
          toast.success("Deleted Category Successfully");
        } else {
          console.log(
            "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
            res.data.message
          );
        }
      });
  };
  const selectDropDownVal = (id, name) => {
    setInputChange(id, "header");
    setdrdata(name);
  };
  return (
    <Fragment>
      <Breadcrumb title="Category" parent="Products" searchBar="true" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Category</h5>
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
                    Add Category
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Category
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Dropdown
                            isOpen={dropen}
                            toggle={() => {
                              setdropen(!dropen);
                            }}
                          >
                            <DropdownToggle caret>{drdata}</DropdownToggle>
                            <DropdownMenu>
                              {header?.map((item, i) => (
                                <DropdownItem
                                  key={i}
                                  value={item.id}
                                  onClick={() => {
                                    selectDropDownVal(item.id, item.name);
                                  }}
                                >
                                  {item.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Category Name<span className="text-danger">*</span>{" "}
                            :
                          </Label>
                          <Input
                            type="text"
                            name="category_name"
                            onChange={(e) =>
                              setInputChange(e.target.value, "category_name")
                            }
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Category Image (260 x 350px)
                            <span className="text-danger">*</span>:
                          </Label>
                          <Input
                            onChange={(e) =>
                              setInputChange(e.target.files[0], "file")
                            }
                            className="form-control"
                            id="validationCustom02"
                            type="file"
                            name="category_img"
                          />
                        </FormGroup>
                        <Label className="d-block form-label">
                          <Input
                            className="radio_animated"
                            id="edo-ani"
                            type="radio"
                            name="rdo-ani"
                            value={1}
                            defaultChecked
                          />
                          Stock
                        </Label>
                        <Label className="d-block form-label">
                          <Input
                            className="radio_animated"
                            id="edo-ani1"
                            type="radio"
                            name="rdo-ani"
                            value={0}
                          />
                          Out Of Stock
                        </Label>
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
                {categoryData?.length > 0 && (
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      myData={categoryData}
                      searchProp={"category"}
                      // myData={data}
                      notaction={false}
                      mopen={onOpenModal}
                      multiSelectOption={false}
                      pageSize={10}
                      Cheader={header}
                      pagination={true}
                      setInputChange={setInputChange}
                      updateItem={updateCategory}
                      deleteItem={deleteCategory}
                      type={"category"}
                      class="-striped -highlight"
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Category;
