import React, { Fragment, useEffect, useState } from "react";
import SearchHeader from "./searchHeader";
import Notification from "./notification";
import UserMenu from "./user-menu";
import Language from "./language";
import {
  AlignLeft,
  Maximize2,
  Bell,
  MessageSquare,
  MoreHorizontal,
} from "react-feather";

//images
import logo from "../../../assets/images/dashboard/Weet_Logo.png";
import { get } from "../../../services/apiHandler";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/AuthContextProvider";
import axios from "axios";

const Header = () => {
  const [sidebar, setSidebar] = useState(true);
  // const [rightSidebar, setRightSidebar] = useState(true);
  const [navMenus, setNavMenus] = useState(false);
  const [input, setInput] = useState({});
  const [logo, setLogo] = useState({});
  const toggle = () => {
    // setNavMenus((prevState) => ({
    // 	navMenus: !prevState.navMenus,
    // }));
    setNavMenus(!navMenus);
  };
  const context = useContext(AuthContext);
  const getSiteData = async () => {
    const response = await axios.get(
      `https://yrpitsolutions.com/Bookstore_API/api/site-data`
    );
    return response.data;
  };
  const goFull = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };
  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(false);

      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
      // document.querySelector(".footer").classList.add("open");
    } else {
      setSidebar(true);

      document.querySelector(".page-main-header").classList.remove("open");
      document.querySelector(".page-sidebar").classList.remove("open");
      // document.querySelector(".footer").classList.remove("open");
    }
  };
  const getdata = async () => {
    await get("admin/profile/get").then((res) => {
      console.log(res);
      if (res.response) {
        setInput(res.data.user);
        context.setapicall(false);
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
    let logoimg = getSiteData();
    setLogo(logoimg.logo);
  }, [context.apicall]);
  return (
    <Fragment>
      {/* open */}
      <div className="page-main-header ">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none col-auto">
            <div className="">
              <a href="index.html">
                <img
                  className="rounded-circle blur-up lazyloaded"
                  src={
                    input.avatar != null || undefined
                      ? "https://yrpitsolutions.com/Bookstore_API/" + logo
                      : logo
                  }
                  alt="logo"
                  style={{ maxWidth: "100px" }}
                  width={50}
                  height={50}
                />
              </a>
            </div>
          </div>
          <div className="mobile-sidebar col-auto p-0">
            <div className="media-body text-end switch-sm">
              <label className="switch">
                <a href="#javaScript" onClick={() => openCloseSidebar()}>
                  <AlignLeft />
                </a>
              </label>
            </div>
          </div>
          <div className="nav-right col">
            <ul className={"nav-menus " + (navMenus ? "open" : "")}>
              <li>{/* <SearchHeader /> */}</li>
              <li>
                <a onClick={goFull} className="text-dark" href="#javaScript">
                  <Maximize2 />
                </a>
              </li>
              {/* <li className="onhover-dropdown">
								<a className="txt-dark" href="#javaScript">
									<h6>EN</h6>
								</a>
								<Language />
							</li>

							<li className="onhover-dropdown">
								<Bell />
								<span className="badge rounded-pill badge-primary pull-right notification-badge">
									3
								</span>
								<span className="dot"></span>
								<Notification />
							</li>
							<li>
								<a href="#javaScript" onClick={showRightSidebar}>
									<MessageSquare />
									<span className="dot"></span>
								</a>
							</li> */}
              <UserMenu img={input.avatar} />
            </ul>
            <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={() => toggle()}
            >
              <MoreHorizontal />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
