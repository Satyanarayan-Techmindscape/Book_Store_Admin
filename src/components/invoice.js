// import React, { Fragment, useEffect, useState } from "react";
// import Breadcrumb from "../components/common/breadcrumb";

// import Datatable from "../components/common/datatable";
// import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

// import InvoicePDF from "./Invoice/App";
// import { jsPDF } from "jspdf";
// import { get } from "../services/apiHandler";
// const Invoice = () => {
//   const [data, setdata] = useState([]);
//   let [Invoicedata, setInvoicedata] = useState([]);
//   useEffect(() => {
//     const getdata = async () => {
//       await get("admin/order").then((res) => {
//         console.log(res);
//         if (res.data.success) {
//           console.log(res.data.data[0]);
//           setInvoicedata(res.data.data);
//           Invoicedata = res.data.data;
//           res.data.data.map((ele, i) => {
//             setdata((data) => [
//               ...data,
//               {
//                 date: ele.created_at,
//                 order_id: ele.id,
//                 status: (
//                   <span className="badge badge-warning">
//                     {ele.payment_status}
//                   </span>
//                 ),
//                 Invoice: (
//                   <InvoicePDF
//                     pdfgen={createPDF}
//                     name={Invoicedata[0]?.user.name}
//                     Baddress={Invoicedata[0]?.billing_address}
//                     Saddress={Invoicedata[0]?.shipping_address}
//                     order={Invoicedata[0]?.order_details}
//                   />
//                 ),
//               },
//             ]);
//           });
//         } else {
//           console.log(
//             "🚀 ~ file: loginTabset.js:27 ~ awaitpost ~ ̥:",
//             res.data.message
//           );
//         }
//       });
//     };
//     getdata();
//   }, []);
//   const createPDF = async () => {
//     const pdf = new jsPDF("portrait", "px", [2080, 1250]);
//     const data = await document.querySelector("#pdf");
//     pdf.line(20, 25, 60, 25);
//     pdf.html(data).then(() => {
//       pdf.save("Invoice.pdf");
//     });
//   };
//   return (
//     <Fragment>
//       <Breadcrumb title="Invoice" parent="Sales" />

//       <Container fluid={true}>
//         <Row>
//           <Col sm="12">
//             <Card>
//               <CardHeader>
//                 <h5>Invoice List</h5>
//               </CardHeader>
//               <CardBody>
//                 {data.length > 0 && (
//                   <div id="basicScenario" className="product-list">
//                     <Datatable
//                       multiSelectOption={false}
//                       notaction={false}
//                       myData={data}
//                       pageSize={10}
//                       withoutAction={true}
//                       pagination={true}
//                       className="-striped -highlight"
//                     />
//                   </div>
//                 )}
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </Fragment>
//   );
// };

// export default Invoice;
