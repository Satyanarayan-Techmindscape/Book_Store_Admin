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
import { useForm } from "react-hook-form";
import { post,get,remove,put } from "../../services/apiHandler"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import data from "../../assets/data/taxes";

const Tax = () => {
	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const nav=useNavigate()

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
	  const getData = async () => {
		setData([])
		setInput({})
		await get("admin/tax").then((res) => {
			console.log(res);
			if(res.response){
				let cat_data = res.data.data;
				console.log(cat_data);
				let m_data=cat_data.map((data,i)=>{
					return{
						Sno:i+1,
						id:data.id,
						Tax:data.tax
					}

				})
				setData(m_data)
				}else {
					console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
				}
			})
	}
	useEffect( () => {

		

		getData()
	}, [])
	
	
	const addCategory = async () => {

		let payload_data = new FormData();
		payload_data.append("tax", input.name);
	
		if(input.name==null){
			toast.warning("Please Fill All the fileds")
			return 
		}
		await post("admin/tax/store",payload_data).then((res) => {
			if(res.data.success){
					onCloseModal("VaryingMdo")
					getData()
					toast.success("added Tax Successfully");
				}else {
					console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
				}
			})
	
	}

	const updateCategory = async (data) => {
		console.log(data);
		let payload_data = new FormData();
		payload_data.append("tax", data.name);
		

		await post("admin/tax/update/"+data.id,payload_data).then((res) => {
			if(res.data.success){
					getData()
					toast.success("Tax Updated Successfully");
				}else {
					console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
				}
			})
	}

	const deleteCategory = async (id) => {
		await remove("admin/tax/destroy/"+id,null).then((res) => {
			if(res.data.success){
					onCloseModal("VaryingMdo")
					getData()
					toast.success("Deleted Tax Successfully");
				}else {
					console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
				}
			})
	}

	return (
		<Fragment>
			<Breadcrumb title="Tax" parent="Settings" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Tax</h5>
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
										Add Tax
									</Button>
									<Modal isOpen={open} toggle={onCloseModal}>
										<ModalHeader toggle={onCloseModal}>
											<h5
												className="modal-title f-w-600"
												id="exampleModalLabel2"
											>
												Add Tax
											</h5>
										</ModalHeader>
										<ModalBody>
												
											<Form>
												<FormGroup>
													<Label
														htmlFor="recipient-name"
														className="col-form-label"
													>
														Tax :
													</Label>
													<Input type="number" name="category_name" 
													onChange={(e) =>
														setInputChange(e.target.value, "name")
													  }
													className="form-control" />
												</FormGroup>
											
											</Form>
										</ModalBody>
										<ModalFooter>
											<Button
											onClick={()=>addCategory()}
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
							
									<div id="basicScenario" className="product-physical">
									{	data.length>0&&<Datatable
											myData={data}
											// myData={data}
											notaction={false}
											mopen={onOpenModal}
											multiSelectOption={false}
											pageSize={10}
											pagination={true}
											setInputChange={setInputChange}
											updateItem={updateCategory}
											tax={true}
											deleteItem={deleteCategory}
											
											class="-striped -highlight"
										/>}
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

export default Tax;
