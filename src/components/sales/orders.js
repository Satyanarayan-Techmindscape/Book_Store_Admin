import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { get } from "../../services/apiHandler";
import axios from "axios";
import Image from "../common/image";

const Orders = () => {
  const [data, setdata] = useState([]);
 
  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://yrpitsolutions.com/Bookstore_API/admin/order", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            console.log(res.data.data[0]);
            res.data.data.map((ele, i) => {
               let productname=''
              setdata((data) => [
                ...data,
                {
                  date: ele.created_at,
                  order_details: (
                    <div style={{ textAlign: "left" }}>
                      {ele.id} <br />
                      Buyer Name:{ele.user.name}
                    </div>
                  ),
                  
                  image: ele.order_details.map((img) => {
                    // console.log(img.product_variation.variation_image);
                    productname+=img.product_name;
                    return (
                      <Image
                        id="image1"
                        width={100}
                        data={[
                          img.product_variation === null
                            ? null
                            : `https://yrpitsolutions.com/Bookstore_API/${img.product_variation.variation_image}`,
                        ]}
                      />
                    );
                  }),
                  search:ele.user.name+ele.id+" "+productname,
                  product_details: ele.order_details.map((product) => {
                    return (
                      <div style={{ textAlign: "left" }}>
                        {product.product_name} <br />
                        code:{product.product_variation?.code} <br />
                       <div style={{display:'flex'}}> color:<div style={{marginLeft:"5px",width:"20px",height:"20px",backgroundColor:product.product_variation?.colour,borderRadius:'50%'}}></div></div> 
                        quantity:{product.cart_quantity} <br />
                        Iteam Subtotal:{product.price_with_discount_and_tax}
                      </div>
                    );
                  }),

                  delivery_Status: (
                    <span className="badge badge-danger">
                      {ele.delivery_status}
                    </span>
                  ),
                  order_Status: (
                    <>
                      <select
                        name=""
                        id=""
                        style={{ padding: "10px", borderColor: "orange" }}
                        onChange={(e) => {
                          let ans = window.confirm(
                            `Are You sure the order is ${e.target.value}`
                          );
                          if(!ans){
                            e.target.value='Select status'
                          }
                          else{
                            e.target.disabled="true"
                          }
                        }}
                      >
                        <option val="select val">Select status</option>
                        <option value="Shipped">Shipping</option>
                        <option value="Unshipped">Unshipping</option>
                        <option value="Delivered">Cancling</option>
                      </select>
                    </>
                  ),
                  payment_Method: ele.payment_type,
                },
              ]);
            });
          } else {
            console.log(
              "🚀 ~ file: loginTabset.js:27 ~ awaitpost ~ ̥:",
              res.data.message
            );
          }
        });
    };
    getdata();
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Orders" parent="Sales" searchBar="true" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Manage Order</h5>
              </CardHeader>
              <CardBody className="order-datatable">
                {data.length > 0 && (
                  <Datatable
                    multiSelectOption={false}
                    notaction={true}
                    withoutAction={true}
                    myData={data}
                    searchProp={"search"}
                    pageSize={10}
                    pagination={true}
                    class="-striped -highlight"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Orders;
