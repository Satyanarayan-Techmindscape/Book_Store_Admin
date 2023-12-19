

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
import { post, get, remove, put } from "../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

 
const Faq = () => {
  const [data, setdata] = useState([""]);
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
    await get("api/faq").then((res) => {
      if (res.data.success) {
      
        let new_cat = res.data.data?.map((data) => {
          return {
            id:data.id,
           question:data.question,
           answer:data.answer
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
  
  };
  useEffect(() => {
    getdata();
  }, []);

  const addCategory = async () => {
   

   

    if (
      input.question == null ||
      input.answer == null 
      
    ) {
      toast.warning("Please Fill All the fileds");
      return;
    }
    await post("api/faq", input).then((res) => {
      if (res.data.message) {
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
 const form=new FormData()
 form.append("question",data.question)
 form.append("answer",data.answer)
 form.append("_method","PUT")
    await 
      post(
        "api/faq/" +
          data.id,
       form,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
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
        "https://yrpitsolutions.com/Bookstore_API/api/faq/" + id,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
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
  useEffect(() => {
   
  }, []);

  return (





    
    <Fragment>
      <Breadcrumb title="FAQ" parent="CMS" searchBar="false" />

      <Container fluid={true}>
        {/* <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>FAQ</h5>
              </CardHeader>
              <CardBody className="order-datatable">
           <Editor url="api/faq" keyData="Faq"/>
           
              </CardBody>
            </Card>
          </Col>
        </Row> */}


        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>FAQ</h5>
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
                    Add FAQ
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add FAQ
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                        
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Question<span className="text-danger">*</span>{" "}
                            :
                          </Label>
                          <Input
                            type="text"
                            name="category_name"
                            onChange={(e) =>
                              setInputChange(e.target.value, "question")
                            }
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                        
                        <Label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                         Answer<span className="text-danger">*</span>{" "}
                          :
                        </Label>
                        <Input
                          type="text"
                          name="category_name"
                          onChange={(e) =>
                            setInputChange(e.target.value, "answer")
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
                      type={"faq"}
                      class="-striped -highlight"
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>

   
      
   
  
  );
};

export default Faq;







    
    










