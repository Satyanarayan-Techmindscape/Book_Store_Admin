

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
import Image from "../common/image";

 
const Authors = () => {
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
    await get("api/authors").then((res) => {
        console.log(res);
      if (res.data.success) {
      console.log("aut",res.data.data);
        let new_cat = res.data.data.map((data) => {
          return {
            id:data.id,
            Image:<img style={{maxWidth:100,maxHeight:100}} src={"https://yrpitsolutions.com/Bookstore_API/"+data.path}/>,
           first_name:data.first_name,
           last_name:data.last_name,
         
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
      input.first_name == null ||
      input.last_name == null ||
      input.image==null
      
    ) {
      toast.warning("Please Fill All the fileds");
      return;
    }
    const form=new FormData()
    form.append("first_name",input.first_name)
    form.append("last_name",input.last_name)
    form.append("image",input.image)
    await post("api/authors", form).then((res) => {
      if (res.data.message) {
        onCloseModal("VaryingMdo");
        getdata();
        toast.success(res.data.message);
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
 form.append("first_name",data.first_name)
 form.append("last_name",data.last_name)
 form.append("image",data.image)
 form.append("_method","PUT")
    await 
      post(
        "api/authors/" +
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
          toast.success(res.data.message);
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
        "https://yrpitsolutions.com/Bookstore_API/api/authors/" + id,
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
          toast.success(res.data.message);
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
      <Breadcrumb title="Authors" parent="CMS" searchBar="false" />

      <Container fluid={true}>
        {/* <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Authors</h5>
              </CardHeader>
              <CardBody className="order-datatable">
           <Editor url="api/Authors" keyData="Authors"/>
           
              </CardBody>
            </Card>
          </Col>
        </Row> */}


        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Authors</h5>
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
                    Add Authors
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Authors
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                        
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            First Name<span className="text-danger">*</span>{" "}
                            :
                          </Label>
                          <Input
                            type="text"
                            name="category_name"
                            onChange={(e) =>
                              setInputChange(e.target.value, "first_name")
                            }
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                        
                        <Label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                         Last Name<span className="text-danger">*</span>{" "}
                          :
                        </Label>
                        <Input
                          type="text"
                          name="category_name"
                          onChange={(e) =>
                            setInputChange(e.target.value, "last_name")
                          }
                          className="form-control"
                        />
                      </FormGroup>
                      <FormGroup>
                        
                        <Label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                         Last Name<span className="text-danger">*</span>{" "}
                          :
                        </Label>
                        <Input
                          type="file"
                          name="category_name"
                          onChange={(e) =>
                           {
                            console.log(e.target.files[0]);
                            setInputChange(e.target.files[0], "image")}
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
                      type={"Authors"}
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

export default Authors;







    
    










