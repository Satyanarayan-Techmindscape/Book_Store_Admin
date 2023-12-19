import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/sub-category";
import Datatable from "../../common/datatable";
import {
  Modal,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { post, get, remove, put } from "../../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sub_category = () => {
  const [open, setOpen] = useState(false);
  const [categoryNames, setCategoryNames] = useState([]);
  const [subcategoryNames, setSubCategoryNames] = useState([]);
  const nav = useNavigate();

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const [input, setInput] = useState({
    category_name: "",
    parent_id: "",
    order_level: "",
    is_instock: "1",
  });

  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };
  const getdata = async () => {
    setSubCategoryNames([]);
    setInput({
      category_name: "",
      parent_id: "",
      order_level: "",
      is_instock: "1",
    });
    await get("admin/category/allparent").then((res) => {
      if (res.data.success) {
        let cat_data = res.data?.categories.categories.data;
        let new_cat = cat_data.map((category) => {
          return { name: category.name, id: category.id };
        });
        setCategoryNames(new_cat);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
      get("admin/category/subcategory").then((res) => {
        if (res.data.success) {
          let cat_data = res.data?.categories.categories.data;
          let new_sub_cat = cat_data.map((category, index) => {
            return {
              status: (
                <Button
                  key={index}
                  type="button"
                  color={category.is_instock == "0" ? "primary" : "secondary"}
                  data-toggle="modal"
                  data-original-title="test"
                  data-target="#exampleModal"
                >
                  {category.is_instock == "1" ? "IN STOCK" : "OUT OF STOCK"}
                </Button>
              ),
              category: category.parent_name,
              SubCategory: category.name,
              id: category.id,
            };
          });
          setSubCategoryNames(new_sub_cat);
        } else {
          console.log(
            "🚀 ~ file: sub category.js:27 ~ awaitpost ~ ̥:",
            res.data.message
          );
        }
      });
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  const selectDropDownVal = (id, name) => {
    setInputChange(id, "parent_id");
    setdrdata(name);
  };

  const adSubCategory = async () => {
    if (
      input.category_name === "" ||
      input.parent_id === "" ||
      input.is_instock === ""
    ) {
      toast.warning("Please Fill All Mandatary Field");
      return;
    }
    let payload_data = new FormData();
    payload_data.append("name", input.category_name);
    payload_data.append("parent_id", input.parent_id);
    payload_data.append("order_level", "1");
    payload_data.append("is_instock", input.is_instock);
    if (input.category_name == null || input.parent_id == null) {
      toast.warning("Please Fill All the fileds");
      return;
    }
    await post("admin/category/store", payload_data).then((res) => {
      console.log(res);
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        getdata();
        toast.success("added Sub-Category Successfully");
      } else {
        console.log(
          "🚀 ~ file: sub category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  const updateSubCategory = async (data) => {
    console.log(
      "🚩 ~ file: sub-category.js:129 ~ updateSubCategory ~ data:",
      data
    );

    let payload_data = new FormData();
    payload_data.append("name", data.sub_name);
    payload_data.append("parent_id", data.pid);
    payload_data.append("lang", "en");
    payload_data.append("is_instock", data.stock);

    await post("admin/category/update/" + data.id, payload_data).then((res) => {
      if (res.data.success) {
        getdata();
        toast.success("Sub Category Updated Successfully");
        //  window.location.reload()
      } else {
        console.log(
          "🚀 ~ file: sub category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  const deleteSubCategory = async (id) => {
    await remove("admin/category/destroy/" + id, null).then((res) => {
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        getdata();
        toast.success("Deleted Sub Category Successfully");
      } else {
        console.log(
          "🚀 ~ file: sub category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  const [dropen, setdropen] = useState(false);
  const [drdata, setdrdata] = useState("Category");
  return (
    <Fragment>
      <Breadcrumb title="Sub Category" parent="Products" searchBar="true" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Sub Category</h5>
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
                    Add Sub Category
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Sub Category
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
                              {categoryNames?.map((item, i) => (
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
                            Sub Category Name
                            <span className="text-danger">*</span> :
                          </Label>
                          <Input
                            type="text"
                            onChange={(e) =>
                              setInputChange(e.target.value, "category_name")
                            }
                            className="form-control"
                          />
                        </FormGroup>

                        {/* <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Sub Category Image :
                          </Label> */}
                        {/* <Input
                            className="form-control"
                            id="validationCustom02"
                            type="file"
                          /> */}
                        <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                          <Label className="d-block">
                            <Input
                              className="radio_animated"
                              id="edo-ani1"
                              type="radio"
                              name="rdo-ani"
                              defaultChecked
                              onChange={(e) => setInputChange(1, "is_instock")}
                            />
                            Instock {"  "}
                          </Label>
                          <Label className="d-block" style={{ marginLeft: 20 }}>
                            <Input
                              className="radio_animated"
                              id="edo-ani2"
                              type="radio"
                              name="rdo-ani"
                              onChange={(e) => setInputChange(0, "is_instock")}
                            />
                            Out Of Stock
                          </Label>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => adSubCategory()}
                      >
                        Save
                      </Button>
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
                {subcategoryNames?.length > 0 && (
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      myData={subcategoryNames}
                      searchProp={"SubCategory"}
                      notaction={false}
                      multiSelectOption={false}
                      pageSize={10}
                      mopen={onOpenModal}
                      pagination={true}
                      setInputChange={setInputChange}
                      updateItem={updateSubCategory}
                      deleteItem={deleteSubCategory}
                      categoryNames={categoryNames}
                      type={"sub_category"}
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
export default Sub_category;
