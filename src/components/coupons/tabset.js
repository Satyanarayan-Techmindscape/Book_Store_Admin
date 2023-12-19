import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { get, post, remove } from "../../services/apiHandler";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Tabset = () => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [dropen, setdropen] = useState(false);
  const [drdata, setdrdata] = useState("Category");
  const [dropen1, setdropen1] = useState(false);
  const [drdata1, setdrdata1] = useState("SubCategory");
  const [categoryNames, setCategoryNames] = useState([]);
  const [subcategoryNames, setSubCategoryNames] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [input, setInput] = useState({
    category_name: "",
    banner: "",
    id: "",
  });
  const getData = async () => {
    
    await 
      get(
        "admin/category/allparent"
      )
      .then((res) => {
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
    get(
        "admin/category/subcategory",
       
      )
      .then((res) => {
        if (res.data.success) {
          let cat_data = res.data?.categories.categories.data;
          let new_sub_cat = cat_data.map((category, index) => {
            return {
              status: (
                <Button
                  key={index}
                  type="button"
                  SubCategory={category.is_instock == "0" ? "primary" : "secondary"}
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

    
  };
  useEffect(() => {
    

    getData();
  }, []);
  const addDiscount = async () => {
    let payload_data = new FormData();
    console.log(input.banner);
    let range =
      startDate.getFullYear() +
      "-" +
      startDate.getMonth() +
      "-" +
      startDate.getDate() +
      "-" +
      endDate.getFullYear() +
      " - " +
      endDate.getMonth() +
      "-" +
      endDate.getDate();
    payload_data.append("name", input.title);
    payload_data.append("sub_title", input.sub_title);
    payload_data.append("banner", input.banner);
    payload_data.append("coupon_code", input.coupon_code);
    payload_data.append("discount", input.discount);
    // payload_data.append("date_range", range);
    payload_data.append("restricted_products", input.restricted_products);

  let new_sub_id=SubCategory.map((data)=>{
    return data.id
  })
  console.log(new_sub_id);
  payload_data.append("restricted_categories", new_sub_id);
    payload_data.append("discount_type", input.discount_type);
    payload_data.append(
      "start_date",
      startDate.getFullYear() +
        "-" +
        startDate.getMonth() +
        "-" +
        startDate.getDate()
    );
    payload_data.append(
      "end_date",
      endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate()
    );
    await post("admin/discount/coupon/store", payload_data).then((res) => {
      if (res.data.success) {
        // window.location.reload();
        toast.success("added Header Successfully");
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };
  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
    if(param=="SubCategory")
    { setSubCategory((SubCategory) => [...SubCategory, data]);
     console.log(SubCategory);}
  };
  const handleStartDate = (date) => {
    setstartDate(date);
    input["start_date"] = date;
    setInput({ ...input });
  };

  const handleEndDate = (date) => {
    setendDate(date);
    input["end_date"] = date;
    setInput({ ...input });
  };

  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };
  const selectDropDownVal = (id, name) => {
    // setInputChange(id, "category_id")
    setdrdata(name);
  };
  const removeProduct = (index) => {
    setSubCategory([
      ...SubCategory.slice(0, index),
      ...SubCategory.slice(index + 1, SubCategory.length)
    ]);
  }
  const selectSubDropDownVal = (id, name) => {
    // setInputChange(id, "sub_category_id")
    setdrdata1(name);
  };
  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link" onClick={(e) => clickActive(e)}>
            General
          </Tab>
          <Tab className="nav-link" onClick={(e) => clickActive(e)}>
            Applied On
          </Tab>
          {/* <Tab className="nav-link" onClick={(e) => clickActive(e)}>
            Usage
          </Tab> */}
        </TabList>

        <TabPanel>
          <div className="tab-pane fade active show">
            <Form className="needs-validation" noValidate="">
              <h4>General</h4>
              <Row>
             
                <Col sm="12">
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Title
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        required=""
                        onChange={(e) =>
                          setInputChange(e.target.value, "title")
                        }
                      />
                    </div>
                  </div>
                  {/* <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Sub Title
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="text"
                        required=""
                        onChange={(e) =>
                          setInputChange(e.target.value, "sub_title")
                        }
                      />
                    </div>
                  </div> */}
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Discount
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom0"
                        type="number"
                        required=""
                        onChange={(e) =>
                          setInputChange(e.target.value, "discount")
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Code
                    </Label>
                    <div className="col-md-7">
                      <Input
                        className="form-control"
                        id="validationCustom1"
                        type="text"
                        required=""
                        onChange={(e) =>
                          setInputChange(e.target.value, "coupon_code")
                        }
                      />
                    </div>
                    <div className="valid-feedback">
                      Please Provide a Valid Coupon Code.
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Start Date</Label>
                    <div className="col-md-7">
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDate}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">End Date</Label>
                    <div className="col-md-7">
                      <DatePicker
                        selected={endDate}
                        endDate={endDate}
                        onChange={handleEndDate}
                      />
                    </div>
                  </div>
               
                  <div className="form-group row">
                    <Label className="col-xl-3 col-md-4">Discount Type</Label>
                    <div className="col-md-7">
                      <select
                        className="form-select"
                        required=""
                        onChange={(e) =>
                          setInputChange(e.target.value, "discount_type")
                        }
                      >
                        <option value="">--Select--</option>
                        <option value="percent">Percent</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                  </div>
                 
                </Col>
              </Row>
            </Form>
          </div>
        </TabPanel>
        <TabPanel>
          <Form className="needs-validation" noValidate="">
            <h4>Restriction</h4>
            <Row style={{marginBottom:'20px'}}>
            <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0"></Label>
                          <div className="flex-cl col-xl-8 col-sm-7">
                            {SubCategory.map((data,index) => {
                             return <span className="badge badge-secondary" style={{marginLeft:'12px'}} onClick={()=>{removeProduct(index)}}>{data.name+" "}</span>
                            })}
                          </div>
                        </FormGroup>
          <Col sm={{ size: "auto", offset: 4 }}>
          
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

          <Col sm={{ size: "auto", offset: 0 }}>
         
            <Dropdown
              isOpen={dropen1}
              toggle={() => {
                setdropen1(!dropen1);
              }}
            >
              <DropdownToggle caret>{drdata1}</DropdownToggle>
              <DropdownMenu>
                {subcategoryNames?.map((item, i) => (
				
				item.category==drdata&&<DropdownItem
                    key={i}
                    value={item.id}
                    onClick={() => {
                     
                      setInputChange({id:item.id,name:item.SubCategory},"SubCategory");
                    }}
                  >
				
                    {item.SubCategory}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Product Code</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="text"
                  required="restricted_products"
                  onChange={(e) =>
                    setInputChange(e.target.value, "restricted_products")
                  }
                />
              </div>
              <div className="valid-feedback">
                Please Provide a Product Name.
              </div>
            </div>
            
			<div className="form-group row">
        
              {/* <Label className="col-xl-3 col-md-4">categories</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="text"
                  required="restricted_products"
                  onChange={(e) =>
                    setInputChange(e.target.value, "restricted_categories")
                  }
                />
              </div>
              <div className="valid-feedback">
                Please Provide a Product Name.
              </div> */}
            </div>
            {/* <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Minimum Spend</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="number"
                  onChange={(e) =>
                    setInputChange(e.target.value, "minimum_spend")
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <Label className="col-xl-3 col-md-4">Maximum Spend</Label>
              <div className="col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom5"
                  type="number"
                  onChange={(e) =>
                    setInputChange(e.target.value, "maximum_spend")
                  }
                />
              </div> */}
              
            {/* </div> */}
            <div className="col-xl-8 col-sm-7">
                          <Button
                            type="button"
                            SubCategory="primary"
                            onClick={() => addDiscount()}
                          >
                            Save
                          </Button>
                        </div>
          </Form>
        </TabPanel>
       
      </Tabs>
    </Fragment>
  );
};

export default Tabset;
