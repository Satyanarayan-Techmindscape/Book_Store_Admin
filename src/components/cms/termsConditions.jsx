import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "../common/datatable";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { get } from "../../services/apiHandler";
import axios from "axios";
import Image from "../common/image";
import Editor from "../Editor";
import { toast } from "react-toastify";

const AboutUs = () => {
  const [data, setdata] = useState([""]);
 
  useEffect(() => {
   
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Terms And Conditions" parent="CMS" searchBar="false" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Terms And Conditions</h5>
              </CardHeader>
              <CardBody className="order-datatable">
           <Editor url="api/about-tnc/1" keyData="tnc" />
           
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AboutUs;
