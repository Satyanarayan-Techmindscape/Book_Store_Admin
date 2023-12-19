import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../components/common/breadcrumb";

import Datatable from "../components/common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { get } from "../services/apiHandler";
import axios from "axios";
import Image from "../components/common/image";
import "../assets/style/custom.css";
const Stock = () => {
  let [data, setdata] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://yrpitsolutions.com/Bookstore_API/admin/product/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            // console.log(res.data.product.data);
            let ob = [];
            let k=0;
            res.data.product.data.map((ele, i) => {
              let productname = "";

              //  let data=ele.varitons.map((var)=>{
              //  return <>
              //   </>
              //  });
            
              ele.variations.map((val, j) => {
                ob[k] = {
                  ...ob[k],
                  image:  (
                    <img
                      id="img"
                      width={100}
                      src={
                        val.image === null
                          ? null
                          : `https://yrpitsolutions.com/Bookstore_API/${val.image}`
                      }
                    />
                  ),
                };
                let price=val.product_variation_details[0]?.price;
                let stock=val.product_variation_details[0]?.stock;
                let product_name=ele.name;
//                 let perval=  <div style={{ textAlign: "left",minWidth:"100%" }}>
//                <h1 style={{color:"orange", textAlign:"center", fontSize:"20px"}}>{ele.name}</h1>
//                {/* <h2 style={{color:"blue", textAlign:"center", fontSize:"15px"}}>{val.code}</h2> */}
//                 <table style={{width:'100%',border:"1px solid orange "}} >
//                  <tr  style={{textAlign:'center',border:"1px solid orange "}} >
//                  {/* <th>Name</th> */}
//                  {/* <th>Code</th> */}
//                  {/* <th>size</th> */}
//                  <th>price</th>
//                  <th>Stock</th>
//                  </tr>
//              { val.product_variation_details.map((op, i) => {
//                   // console.log(val);
//                   return (
                   

                     
//                       <tr style={{textAlign:'center'}}>
//                         {/* <td>
//                         {ele.name}
//                         </td> */}
//                         {/* <td>{val.code}</td> */}
//                         {/* <td>
//                         {op.size}
//                         </td> */}
//                         <td>
//                         {op.price}
//                         </td>
//                         <td>{op.stock}</td>
//                       </tr>
                     
//                   );
//                 })}
// </table>
                     
                     
//                      </div>
                     
                
                ob[k] = {
                  ...ob[k],
                  product_name,
                price,
                stock
                
                };
                ob[k] = {
                  ...ob[k],
                SubCategory: ele.product_category.name
                
                };
                ob[k] = {
                  ...ob[k],
                Product_Code: ele.product_code
                
                };
                // ob[k] = {
                //   ...ob[k],
                // color: <div style={{display:'flex',justifyContent:"center"}}><div style={{marginLeft:"5px",width:"20px",height:"20px",backgroundColor:val.colour,borderRadius:'50%'}}></div></div> 
                
                // };
                ob[k] = {
                  ...ob[k],
                  Status: (
                    <div id="app-cover">
           
            <div class="row">
              <div class="toggle-button-cover">
                <div class="button-cover">
                  <div class="button b2" id="button-16">
                    <input type="checkbox" onChange={(e)=>{
                     
                   }} class="checkbox" />
                    <div class="knobs"></div>
                    <div class="layer"></div>
                  </div>
                </div>
              </div>
             
             
            </div>
          </div>
                    // <label class="switch" style={{transform:"scale(2px)"}}>
                    //   <input type="checkbox" />
                    //   <span class="slider round"></span>
                    // </label>
                  ),
                };
             
                k++;
                // ob[j] = {
                //   ...ob,
                //   perval
                // };
                //   setdata((data) => [
                //     ...data,
                //     {

                // image: ele.order_details.map((img) => {
                //   // console.log(img.product_variation.variation_image);
                //   productname+=img.product_name+img.product_variation?.code;
                //   return (
                //     <Image
                //       id="image1"
                //       width={100}
                //       data={[
                //         img.product_variation === null
                //           ? null
                //           : `https://yrpitsolutions.com/Bookstore_API/${img.product_variation.variation_image}`,
                //       ]}
                //     />
                //   );
                // }),
                //       search:ele.user.name+ele.id+" "+productname+200,
                //       product_details: ele.order_details.map((product) => {
                //         return (
                //           <div style={{ textAlign: "left" }}>
                //             {product.product_name} <br />
                //             code:{product.product_variation?.code} <br />

                //           </div>
                //         );
                //       }),
                //       listing_price:400,
                //       stock:200,
                //       category:"name",
                //       subcategory:"sub name",
                //       Status: <label class="switch">
                //       <input type="checkbox" />
                //       <span class="slider round"></span>
                //     </label>

                //     },
                //   ]);
                data.push({...ob})
              });
            });
            console.log(ob);
            setdata([...ob]);
          }
          //  }
          // }
          else {
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
      <Breadcrumb title="Stock" parent="Stock" searchBar="true" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Manage Stock</h5>
              </CardHeader>
              <CardBody className="order-datatable">
                {data.length > 0 && (
                  <Datatable
                    multiSelectOption={false}
                    notaction={true}
                    withoutAction={false}
                    onlyEdit={true}
                    myData={data}
                    type={"stock"}
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

export default Stock;
