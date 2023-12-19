import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listCoupons";
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
import { get, post, remove } from "../../services/apiHandler";
import Image from "../common/image";
import { toast } from "react-toastify";

const ListCoupons = () => {
  const [data, setdata] = useState([]);
  const [Acdata, setAcdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [discountStatus, setDiscountStatus] = useState("");
  const [discountId, setDiscountId] = useState("");
  
  
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const [input, setInput] = useState({ startDate: "", endDate: "",});

  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };

  const getdata = async () => {
	  setdata([]);
	  setAcdata([]);
    await get("admin/discount/coupon").then((res) => {
      console.log(res);
      if (res.response) {
        // console.log(res.data.data[0]);
        // updateList(list.filter(item => item.name !== name))
        let new_data = res.data.data.map((data) => {
          return {
            id: data.id,
            title: data.title,
            Discount: data.discount,
            discount_type: data.discount_type,
            code: data.coupon_code,
            start_date: data.start_date,
            end_date: data.end_date,
            is_active_coupon: data.is_active,
            // Subcategories:data.categories,
            // product:data.restricted_products
          };
        });
        setdata(new_data);
        setAcdata(res.data.data);
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

  const deleteCategory = async (id) => {
    await post("admin/discount/coupon/destroy/" + id).then((res) => {
      if (res.data.success) {
        getdata();
        toast.success("Deleted Header Successfully");
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  const updateStatus = async () => {
    if(input.startDate == ""){
        toast.error("Enter Start Date");
      return;
    }
    if(input.endDate == ""){
      toast.error("Enter End Date");
    return;
  }
    let payload_data = new FormData();
		payload_data.append("is_active", discountStatus);
    payload_data.append("start_date", input.startDate);
    payload_data.append("end_date", input.endDate);

		await post("admin/discount/coupon/update/" + discountId, payload_data).then((res) => {
			if (res.data.success) {
				getdata();
        setOpen(false);
			  toast.success("Status Updated Successfully");
        setInput({ startDate: "", endDate: ""});
        
		} else {
			  console.log( "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message );
        setInput({ startDate: "", endDate: ""});
			}
		  });
    
  }
  
  const changeStatus = async (id,status) => {
    
    if(status == 1){
      setDiscountId(id)
      setDiscountStatus(status)
      setOpen(true);
    } else {
      let payload_data = new FormData();
      payload_data.append("is_active", status);
      await post("admin/discount/coupon/update/" + id, payload_data).then((res) => {
        if (res.data.success) {
          getdata();
          toast.success("Status Updated Successfully");
      } else {
          console.log( "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message );
        }
        });
    }
	};
  
  return (
    <Fragment>
      <Breadcrumb title="List Discount" parent="Discount" searchBar="true"/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Discount Details</h5>
              </CardHeader>
              <CardBody>
                <div
                  id="batchDelete"
                  className="category-table order-table coupon-list-delete"
                >
                  {data.length > 0 && (
                    <Datatable
                      // multiSelectOption={true}
                      searchProp={"title"}
                      myData={data}
                      notaction={false}
                      pageSize={10}
                      onlyDelete={true}
                      pagination={true}
                      list={Acdata}
                      withView={true}
                      type={"listcoupon"}
                      deleteItem={deleteCategory}
					  changeStatus={changeStatus}
                      class="-striped -highlight"
                    />
                  )}
                </div>
                <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        To Change Status From Inactive to Active First You Need to Change Date
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Row>
                        <Col>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Start Date<span className="text-danger">*</span>{" "}
                            :
                          </Label>
                          <Input
                            type="date"
                            name="startDate"
                            onChange={(e) =>
                              setInputChange(e.target.value, "startDate")
                            }
                            className="form-control"
                          />
                        </Col>
                        <Col>

                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            End Date<span className="text-danger">*</span>{" "}
                            :
                          </Label>
                          <Input
                            type="date"
                            name="endDate"
                            onChange={(e) =>
                              setInputChange(e.target.value, "endDate")
                            }
                            className="form-control"
                          />
                        </Col>
                        </Row>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={()=>updateStatus()}>Save</Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => onCloseModal("VaryingMdo")}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ListCoupons;
