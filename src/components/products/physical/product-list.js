import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/physical_list";
import { Download, Edit, Trash2, Upload } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { post, get, remove, put } from "../../../services/apiHandler";
import one from "../../../assets/images/pro3/2.jpg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/AuthContextProvider";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
const Product_list = () => {
  const [dropen, setdropen] = useState(false);
  const [drdata, setdrdata] = useState("Category");
  const [dropen1, setdropen1] = useState(false);
  const [drdata1, setdrdata1] = useState("SubCategory");
  const [productData, setProductData] = useState([]);
  const [apiproductData, setapiProductData] = useState([]);
  const nav = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [categoryNames, setCategoryNames] = useState([]);
  const [subcategoryNames, setSubCategoryNames] = useState([]);
  const { searchText } = useContext(AuthContext);
  const [prevData, setPrevData] = useState([]);
  const fields = [
    {
      label: "Category Name",
      key: "Category Name",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "SubCategory Name",
      key: "SubCategory Name",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Product Name ",
      key: "Product Name ",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Author",
      key: "Author",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Product Code",
      key: "Product Code",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Product Type",
      key: "Product Type",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Price",
      key: "Price",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Discount",
      key: "Discount",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Tax",
      key: "Tax",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Total Products",
      key: "Total Products",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
    {
      label: "Image Id",
      key: "Image Id",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
    },
  ];
  const getData = async () => {
    setProductData([]);
    await get("admin/category/allparent").then((res) => {
      if (res.data.success) {
        let cat_data = res.data?.categories.categories.data;
        let new_cat = cat_data.map((category) => {
          return { name: category.name, id: category.id };
        });
        setCategoryNames(new_cat);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
    await get("admin/category/subcategory").then((res) => {
      if (res.data.success) {
        let cat_data = res.data?.categories.categories.data;
        let new_sub_cat = cat_data.map((category, index) => {
          return {
            status: (
              <Button
                key={index}
                type="button"
                color={category.is_instock == "0" ? "primary" : "secondary"}
                data-toggle="modal"
                data-original-title="test"
                data-target="#exampleModal"
              >
                {category.is_instock == "1" ? "IN STOCK" : "OUT OF STOCK"}
              </Button>
            ),
            category: category.parent_name,
            SubCategory: category.name,
            id: category.id,
          };
        });
        setSubCategoryNames(new_sub_cat);
      } else {
        console.log(
          "🚀 ~ file: sub category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });

    await get("admin/product/show").then((res) => {
      if (res.data.success) {
        let product_data = res.data?.product;
        console.log(
          "🚩 ~ file: product-list.js:64 ~ awaitget ~ product_data:",
          product_data.data
        );
        // setProductData(product_data.filter(item => item.is_active == "1"))
        setProductData(product_data.data);
        setapiProductData(product_data.data);
      } else {
        console.log(
          "🚀 ~ file: sub category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const selectDropDownVal = (id, name) => {
    // setInputChange(id, "category_id")
    setdrdata(name);
  };

  const selectSubDropDownVal = (id, name) => {
    // setInputChange(id, "sub_category_id")
    // setProductData([categoryNames.map((data)=>{
    //   if(data.id==productData.product_category?.parent_id)return data
    // })])
    let data = [];

    apiproductData.forEach((pdata) => {
      if (name === pdata.product_category?.name) {
        data.push(pdata);
      }
    });

    setProductData(data);

    setdrdata1(name);
  };

  const [searchEntered, setSearchEntered] = useState(false);

  useEffect(() => {
    setPrevData(productData);
  }, [productData]);
  console.log("🚩 ~ file: product-list.js:136 ~ productData:", productData);

  useEffect(() => {
    if (searchText !== "") {
      let filterData = productData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log(
        "🚩 ~ file: product-list.js:142 ~ useEffect ~ filterData:",
        filterData
      );
      setProductData(filterData);
      setSearchEntered(true);
    } else {
      getData();
    }
  }, [searchText]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteProduct(id);
    }
  };

  const deleteProduct = async (id) => {
    // let payload_data = new FormData();
    // payload_data.append("id", id);
    // payload_data.append("is_active", "0");

    await remove("admin/product/destroy/" + id, null).then((res) => {
      if (res.data.success) {
        getData();

        toast.success("Product Deleted Successfully");
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  const editProduct = (id) => {
    nav("/products/physical/edit-product/" + id);
  };

  const onCloseexc = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Breadcrumb
        title="Product List"
        parent="Products"
        searchBar="true"
        labelpr="search by author or book name..."
      />

      {isOpen && (
        <ReactSpreadsheetImport
          isOpen={isOpen}
          onClose={onCloseexc}
          onSubmit={(data, file) => {
            console.log(data);
          }}
          fields={fields}
        />
      )}
      <Container fluid={true}>
        <Row className="mb-3 mt-6">
          <Col sm={{ size: "auto" }}>
            <Dropdown
              isOpen={dropen}
              toggle={() => {
                setdropen(!dropen);
              }}
            >
              <DropdownToggle caret>{drdata}</DropdownToggle>
              <DropdownMenu>
                {categoryNames?.map((item, i) => (
                  <DropdownItem
                    key={i}
                    value={item.id}
                    onClick={() => {
                      selectDropDownVal(item.id, item.name);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col sm={{ size: "auto" }}>
            <Dropdown
              isOpen={dropen1}
              toggle={() => {
                setdropen1(!dropen1);
              }}
            >
              <DropdownToggle caret>{drdata1}</DropdownToggle>
              <DropdownMenu>
                {subcategoryNames?.map(
                  (item, i) =>
                    item.category == drdata && (
                      <DropdownItem
                        key={i}
                        value={item.id}
                        onClick={() => {
                          selectSubDropDownVal(item.id, item.SubCategory);
                        }}
                      >
                        {item.SubCategory}
                      </DropdownItem>
                    )
                )}
              </DropdownMenu>
            </Dropdown>
          </Col>
          {/* <Col sm={{ size: "auto",}}>
            <Dropdown
              isOpen={dropen1}
              toggle={() => {
                setdropen1(!dropen1);
              }}
            >
              <DropdownToggle caret>Author</DropdownToggle>
              <DropdownMenu>
                {subcategoryNames?.map(
                  (item, i) =>
                    item.category == drdata && (
                      <DropdownItem
                        key={i}
                        value={item.id}
                        onClick={() => {
                          selectSubDropDownVal(item.id, item.SubCategory);
                        }}
                      >
                        {item.SubCategory}
                      </DropdownItem>
                    )
                )}
              </DropdownMenu>
            </Dropdown>
          </Col> */}
          <Col
            md={{ size: "auto" }}
            style={{
              minWidth: "50%",
              float: "right",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              type="button"
              color="primary"
              className=""
              onClick={() => nav("/products/physical/add-product/")}
              data-toggle="modal"
              data-original-title="test"
              data-target="#exampleModal"
              // disabled={variation.length > 7}
            >
              Add +
            </Button>
          </Col>
          <Col
            md={{ size: "auto" }}
            style={{ float: "right", display: "flex", justifyContent: "end" }}
          >
            <Button
              type="button"
              color="primary"
              className=""
              data-toggle="modal"
              data-original-title="test"
              data-target="#exampleModal"
              // disabled={variation.length > 7}
            >
              <Upload />
            </Button>
          </Col>
          <Col
            md={{ size: "auto" }}
            style={{ float: "right", display: "flex", justifyContent: "end" }}
          >
            <Button
              type="button"
              color="primary"
              className=""
              onClick={() => setOpen(true)}
              data-toggle="modal"
              data-original-title="test"
              data-target="#exampleModal"
              // disabled={variation.length > 7}
            >
              <Download />
            </Button>
          </Col>
        </Row>
        <Row className="products-admin ratio_asos">
          {productData?.map((myData, i) => {
            let variationimg = myData.variations.filter(
              (item) =>
                item.size === myData.variations[0]?.size && item.image !== null
            );
            return (
              <Col xl="3" sm="6" key={i}>
                <Card>
                  <div className="products-admin">
                    <CardBody className="product-box">
                      <div className="img-wrapper">
                        <div
                          className="front"
                          style={{ minHeight: "300px", maxHeight: "380px" }}
                        >
                          <a className="bg-size">
                            {/* {myData.variations.length > 0 ? ( */}
                            <img
                              style={{ height: "250px" }}
                              alt=""
                              className="img-fluid blur-up bg-img lazyloaded"
                              src={
                                myData.product_images &&
                                myData.product_images.length > 0 &&
                                myData.product_images[0].image_path
                                  ? "https://yrpitsolutions.com/Bookstore_API/" +
                                    myData.product_images[0].image_path
                                  : one
                              }
                            />
                            {/* )  */}
                            {/* : (
                              <img
                                style={{ height: "250px" }}
                                alt=""
                                className="img-fluid blur-up bg-img lazyloaded"
                                src={one}
                              />
                            )} */}
                          </a>
                          <div className="product-hover">
                            <ul>
                              <li>
                                <Button color="btn" type="button">
                                  <Edit
                                    className="editBtn"
                                    onClick={() => editProduct(myData.id)}
                                  />
                                </Button>
                              </li>
                              <li>
                                <Button color="btn" type="button">
                                  <Trash2
                                    onClick={() => handleDelete(myData.id)}
                                    className="deleteBtn"
                                  />
                                </Button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="product-detail">
                        <a>
                          {" "}
                          <h6>{myData.name}</h6>
                        </a>
                        <h4>
                          {myData.variations[0]?.price}{" "}
                          <del>{myData.discount_price}</del>
                        </h4>
                        {/* <ul className="color-variant">
                          {myData.variations?.map((va_data) => {
                            return (
                              <li
                                style={{ backgroundColor: va_data.colour }}
                              ></li>
                            );
                          })}
                        </ul> */}
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Product_list;
