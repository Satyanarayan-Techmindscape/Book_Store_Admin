import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/city";
import Datatable from "../../common/datatable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import MultipleStateCitySelector from "./multipleCity";
import AddCityModal from "./AddCityModal";

const Availability = () => {
  const [open, setOpen] = useState(false);
  const onCloseModal = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Breadcrumb title="Product" parent="Product" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5>Delivery Zone</h5>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="order-datatable">
                <AddCityModal open={open} onCloseModal={onCloseModal} />

                <Datatable
                  multiSelectOption={false}
                  notaction={false}
                  myData={data}
                  pageSize={10}
                  pagination={true}
                  class="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Availability;
