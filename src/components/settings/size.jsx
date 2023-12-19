import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
 import { data } from "../../assets/data/size.js";
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

const Size = () => {
	const [data, setdata] = useState([]);
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
		setdata([])
		setInput({})
		await get("admin/size").then((res) => {
			
			if(res.response){
				let cat_data = res.data.data;
				
				let new_cat = cat_data.map((data,i) => {
					return	{
						sno:i+1,
							id:data.id,
							size:data.size
						}
				})
				console.log(new_cat);
				setdata(new_cat)
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
		payload_data.append("size", input.category_name);
		if(input.category_name==null){
			toast.warning("Please Fill All the fileds")
			return 
		}

		await post("admin/size/store",payload_data).then((res) => {
			if(res.response){
					onCloseModal("VaryingMdo")
					getData()
					// window.location.reload()
					toast.success("added Size Successfully");
				}else {
					console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
				}
			})
	
	}

	const updateCategory = async (data) => {
		let payload_data = new FormData();
		payload_data.append("size", data.name);
	

		await post("admin/size/update/"+data.id,payload_data).then((res) => {
			if(res.data.success){
					getData()
					toast.success("Size Updated Successfully");
				}else {
					console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
				}
			})
	}

	const deleteCategory = async (id) => {
		await remove("admin/size/destroy/"+id,null).then((res) => {
			if(res.data.success){
					onCloseModal("VaryingMdo")
					getData()
					toast.success("Deleted Size Successfully");
				}else {
					console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
				}
			})
	}

	return (
		<Fragment>
			<Breadcrumb title="Size" parent="Settings" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Size</h5>
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
										Add Size
									</Button>
									<Modal isOpen={open} toggle={onCloseModal}>
										<ModalHeader toggle={onCloseModal}>
											<h5
												className="modal-title f-w-600"
												id="exampleModalLabel2"
											>
												Add Size
											</h5>
										</ModalHeader>
										<ModalBody>
												
											<Form>
												<FormGroup>
													<Label
														htmlFor="recipient-name"
														className="col-form-label"
													>
														Size :
													</Label>
													<Input type="text" name="category_name" 
													onChange={(e) =>
														setInputChange(e.target.value, "category_name")
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
										{data.length>0&&<Datatable
											myData={data}
											// myData={data}
											notaction={false}
											mopen={onOpenModal}
											multiSelectOption={false}
											pageSize={10}
											pagination={true}
											setInputChange={setInputChange}
											updateItem={updateCategory}
											deleteItem={deleteCategory}
											size={true}

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

export default Size;
