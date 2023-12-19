import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";

import Slider from "react-slick";
import stats from "../../assets/images/dashboard/Weet_Logo.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Login = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };

  return (
    <Fragment>
      <div className="page-wrapper" style={{backgroundImage:"url(https://yrpitsolutions.com/infix/public/backEnd/img/login-bg.png)",overflowY:"hidden",backgroundSize:"100% 100%"}}>
        <div className="authentication-box">
          <Container>
           
             
              <Col className="col-md-12 p-0 card-right flex flex-direction-column align-items-center justify-content-center" >
               
                <Card className="tab2-card flex  flex-direction-column align-items-center justify-content-center" style={{width:"60%",paddingTop:"10%",backgroundColor:"rgba(28, 0, 78, 0.25)"}}>
              <div className="flex flex-direction-column mt-2 flex-column justify-content-center align-items-center">
                <img src={"https://yrpitsolutions.com/Bookstore_API/images/logo.png"} width={"150px"}/>
                <h4 className="text-white mt-5">Login Details</h4>
                </div>
                  <CardBody style={{width:"80%"}}>
                    <LoginTabset />
                  </CardBody>
                </Card>
              </Col>
            
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
