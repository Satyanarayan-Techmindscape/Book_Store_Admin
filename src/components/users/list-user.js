import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";

import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import axios from "axios";
import { post,get,remove,put } from "../../services/apiHandler"
const List_user = () => {
	let[data,setdata]=useState([])
	
	useEffect( () => {

		const getData = async () => {
			await axios.get("https://yrpitsolutions.com/Bookstore_API/admin/customer").then((res) => {
				if(res.data.success){
					let user_data = res.data?.data;
					
					user_data.map((u_data)=>{
					
					setdata(data=>[...data,{image: <img alt="" src={u_data.icon == null ? 'https://fastly.picsum.photos/id/925/200/300.jpg?hmac=1mxh8L9qVukkpb-iUojF9keY4Eq6gL0Ip0-kRYFE4gg' : 'https://yrpitsolutions.com/Bookstore_API/images/'+u_data.avatar} style={{ width: 50, height: 50 }} />,name:u_data.name,email:u_data.email,id:u_data.id,phone:u_data.phone}])
					console.log(u_data);
					})
				
					}else {
						console.log("🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:", res.data.message)
					}
				})
		}

		getData()
	}, [])
	const dataTable=()=>{
		
	}
	return (
		<Fragment>
			<Breadcrumb title="User List" parent="Users" />
			<Container fluid={true}>
				<Card>
					<CardHeader>
						<h5>User Details</h5>
					</CardHeader>
					<CardBody>
						{/* <div className="btn-popup pull-right">
							<Link to="/users/create-user" className="btn btn-secondary">
								Create User
							</Link>
						</div> */}
						<div className="clearfix"></div>
						<div
							id="batchDelete"
							className="category-table user-list order-table coupon-list-delete"
						>
							{data?.length>0&&<Datatable
		multiSelectOption={true}
		myData={data}
		pageSize={10}
		notaction={true}
		withoutAction={true}
		pagination={true}
		class="-striped -highlight"
	/>}
						</div>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default List_user;
