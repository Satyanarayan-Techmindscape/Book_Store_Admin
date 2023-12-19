import React from "react";
import { Home } from "react-feather";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import SearchComponent from "./header_components/SearchComponent";

const Breadcrumb = ({ title, parent, searchBar,labelpr }) => {

  return (
    <Container fluid={true}>
      <div className="page-header">
        <Row>
          {searchBar ?
          <>
          <Col lg="4">
            <div className="page-header-left">
              <h3>{title}</h3>
            </div>
          </Col>
          <Col lg="4">
            <div className="d-flex justify-center">
              <SearchComponent data={labelpr} />
            </div>
          </Col>
          <Col lg="4">
            <ol className="breadcrumb pull-right">
              <li className="breadcrumb-item">
                <Link to="mutikart-admin/dashboard">
                  <Home />
                </Link>
              </li>
              <li className="breadcrumb-item">{parent}</li>
              {title === "" ? null : (
                <li className="breadcrumb-item active">{title}</li>
              )}
            </ol>
          </Col>
          </> : 
          
          <>
          <Col lg="6">
            <div className="page-header-left">
              <h3>{title}</h3>
            </div>
          </Col>
          <Col lg="6">
            <ol className="breadcrumb pull-right">
              <li className="breadcrumb-item">
                <Link to="mutikart-admin/dashboard">
                  <Home />
                </Link>
              </li>
              <li className="breadcrumb-item">{parent}</li>
              {title === "" ? null : (
                <li className="breadcrumb-item active">{title}</li>
              )}
            </ol>
          </Col>
          </>
          }
        </Row>
      </div>
    </Container>
  );
};

export default Breadcrumb;
