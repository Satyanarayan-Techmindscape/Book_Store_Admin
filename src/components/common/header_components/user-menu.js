import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//images import
import man from "../../../assets/images/dashboard/man.png";
import {  useNavigate } from "react-router-dom";
import { remove } from "../../../services/apiHandler"
import { ToastContainer, toast } from "react-toastify";

const UserMenu = (props) => {
	const history = useNavigate();
	const logout = async () => {
		await remove("admin/profile/logout").then((res)=>{
		    if(res.data.success){
				localStorage.removeItem("token")
				toast.success("Successfully Logout !");
				history(`${process.env.PUBLIC_URL}/auth/login`);
			}else {
				console.log("🚀 ~ file: usermenu.js:18 ~ ̥:", res.data.message)
			}
		})
	}

	return (
		<Fragment>
			<li className="onhover-dropdown">
				<div className="media align-items-center">
					<img
						className="align-self-center pull-right  rounded-circle blur-up lazyloaded"
						src={"https://yrpitsolutions.com/Bookstore_API/" +props.img}
						alt="header-user"
						width={50}
						height={50}
					/>
					<div className="dotted-animation">
						<span className="animate-circle"></span>
						<span className="main-circle"></span>
					</div>
				</div>
				<ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
					<li>
						<Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
							<i data-feather="user"></i>Edit Profile
						</Link>
					</li>
					{/* <li>
						<a href="#javaScript">
							<i data-feather="mail"></i>Inbox
						</a>
					</li>
					<li>
						<a href="#javaScript">
							<i data-feather="lock"></i>Lock Screen
						</a>
					</li>
					<li>
						<a href="#javaScript">
							<i data-feather="settings"></i>Settings
						</a>
					</li> */}
					<li>
						<Link onClick={()=>logout()}>
							<i data-feather="log-out"></i>Logout
						</Link>
					</li>
				</ul>
			</li>
				<ToastContainer />
		</Fragment>
	);
};

export default UserMenu;
