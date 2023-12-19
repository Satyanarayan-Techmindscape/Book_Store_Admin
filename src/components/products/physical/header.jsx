import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { data } from "../../../assets/data/header.js";
import Datatable from "../../common/datatable";
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

import { post, get, remove, put } from "../../../services/apiHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setdisabled] = useState(false);
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
  });

  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };
  const getdata = async () => {
    setData([]);
    setInput({});
    await get("admin/header").then((res) => {
      if (res.data.success) {
        console.log(res);
        let cat_data = res.data.data;
        let new_cat = cat_data.map((category, i) => {
          return {
            Sno: i + 1,
            name: category.name,
            id: category.id,
          };
        });
        setData(new_cat);
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
    if (input.category_name == null) {
      toast.warning("Please Fill All the fileds");
      return;
    }

    await post("admin/header/store", payload_data).then((res) => {
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        getdata();

        toast.success("added Header Successfully");
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
    if (data.name == null) {
      toast.warning("Please Fill All the fileds");
      return;
    }
    await post("admin/header/update/" + data.id, payload_data).then((res) => {
      if (res.data.success) {
        getdata();
        toast.success("Header Updated Successfully");
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  const deleteCategory = async (id) => {
    await remove("admin/header/destroy/" + id).then((res) => {
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        getdata();
        nav(window.location.pathname);
        toast.success("Deleted Header Successfully");
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
      <Breadcrumb title="Header" parent="Products" searchBar="true" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Header</h5>
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
                    disabled={data.length > 5}
                  >
                    Add Header
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Header
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Name :
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
                      searchProp={"name"}
                      getdata={getdata}
                      notaction={false}
                      mopen={onOpenModal}
                      multiSelectOption={false}
                      pageSize={10}
                      pagination={true}
                      header={true}
                      setInputChange={setInputChange}
                      updateItem={updateCategory}
                      deleteItem={deleteCategory}
                      type={"header"}
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

export default Header;
