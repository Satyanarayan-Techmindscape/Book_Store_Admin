import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import InvoicePDF from "../Invoice/App";
import { jsPDF } from "jspdf";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { get } from "../../services/apiHandler";

const Transactions_sales = () => {
	let [Invoicedata, setInvoicedata] = useState([]);
	const [data,setData]=useState([]);
	useEffect(()=>{getdata()},[])
	const getdata = async () => {
		await get("admin/order").then((res) => {
		  console.log(res);
		  if (res.data.success) {
			console.log(res.data.data[0]);
			setInvoicedata(res.data.data);
			Invoicedata = res.data.data;
			setData(Invoicedata.map((data)=>{return{
				order_id:data.id,
				payment_method:data.payment_method,
				payment_type:data.payment_type,
				payment_status:data.payment_status,
				invoice:<InvoicePDF
			pdfgen={createPDF}
			name={Invoicedata[0]?.user.name}
			Baddress={Invoicedata[0]?.billing_address}
			Saddress={Invoicedata[0]?.shipping_address}
			order={Invoicedata[0]?.order_details}
		  />
			}}))
		  }})
		  }

	const createPDF = async () => {
		const pdf = new jsPDF("portrait","pt",[2000,1200]);
		const data = await document.querySelector("#pdf");
		// pdf.line(20, 25, 60, 25);
		pdf.html(data).then(() => {
		  pdf.save("Invoice.pdf");
		});
	  };
	 
	return (
		<Fragment>
			<Breadcrumb title="Transactions" parent="Sales" searchBar="true"/>

			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Transaction Details</h5>
							</CardHeader>
							<CardBody>
								<div id="batchDelete" className="transactions">
									{data.length>0&&<Datatable
										multiSelectOption={false}
										myData={data}
										searchProp={"transaction_id"}
										pageSize={10}
										notaction={true}
										withoutAction
										pagination={true}
										class="-striped -highlight"
									/>}
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Transactions_sales;
