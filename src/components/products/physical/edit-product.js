import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  ModalFooter,
  ModalHeader,
  Modal,
  ModalBody,
} from "reactstrap";
import one from "../../../assets/images/pro3/2.jpg";
import user from "../../../assets/images/user.png";
import MDEditor from "@uiw/react-md-editor";
import StateSelection from "./StateSelection";
import { post, get, remove, put } from "../../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Datatable from "../../common/datatable";
import { Image } from "react-feather";

const Add_product = () => {
  const [loading, setLoading] = useState(false);
  const [variationlistt, setvariationlistt] = useState([]);
  let [myvariation, setMyvariation] = useState([]);
  let [group_id, setgroup_id] = useState(1);
  let [maxgroup_id, setmaxgroup_id] = useState(1);
  let [Prod, setProd] = useState({ data: "category" });
  let [mrp, setMrp] = useState("");
  const [open, setOpen] = useState(true);
  const [oneditvaritaionid, setOneditvaritaionid] = useState("");
  const [open1, setOpen1] = useState(false);
  const { pid } = useParams();
  let onetimearr = true;
  const [productdata, setproductdata] = useState([]);
  const [showdummyimg, setshowdummyimg] = useState([
    { img: "", file: null, is_variation_image: "" },
    { img: "", file: null, is_variation_image: "" },
    { img: "", file: null, is_variation_image: "" },
    { img: "", file: null, is_variation_image: "" },
    { img: "", file: null, is_variation_image: "" },
    { img: "", file: null, is_variation_image: "" },
    { img: "", file: null, is_variation_image: "" },
    { img: "", file: null, is_variation_image: "" },
  ]);
  const [proimages, setProImages] = useState([]);
  const [dummyproimages, setdummyProImages] = useState([]);
  const arrayColumn = (array, column) => {
    return array.map((item) => item[column]);
  };
  const getData = async () => {
    setMasterCategory([]);

    await get("api/authors").then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log("aut", res.data.data);
        let new_cat = res.data.data.map((data) => {
          return {
            id: data.id,
            Image: "https://yrpitsolutions.com/Bookstore_API/" + data.path,
            first_name: data.first_name,
            last_name: data.last_name,
          };
        });
        setAuthors(new_cat);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
    await get("api/master_product_types").then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log("aut", res.data.data);
        let new_cat = res.data.data.map((data) => {
          return {
            id: data.id,
            name: data.name,
          };
        });
        setMasterCategory(new_cat);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
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

    if (onetimearr) {
      onetimearr = false;

      await get("admin/product/show/" + pid).then((res) => {
        if (res.response) {
          let product = res.data?.product;
          let variation_data = res.data?.variations;
          console.log(product);
          setproductdata(product);
          // let next = product.variations.length;

          // mapping of variation
          const result = product.variations.filter(
            (thing, index, self) =>
              // index === self.findIndex((t) => (t.size == thing.size && t.image!=null))
              index === self.findIndex((t) => t.size == thing.size)
          );
          (result || []).map((data, i) => {
            console.log("___the images_____", result[i].image);
            dummyimgs[i] = {
              id: result[i].id,
              img:
                "https://yrpitsolutions.com/Bookstore_API/" + result[i].image,
              file: "",
              is_variation_image: "yes",
            };
            showdummyimg[i] = {
              id: result[i].id,
              img:
                "https://yrpitsolutions.com/Bookstore_API/" + result[i].image,
              file: "",
              is_variation_image: "yes",
            };
          });
          setProImages(result);
          setdummyProImages(result);

          product.variations.forEach((val, i) => {
            val.image = [
              "https://yrpitsolutions.com/Bookstore_API/" + val.image,
            ];
            val.product_images.forEach((data, i) => {
              data.image_path =
                "https://yrpitsolutions.com/Bookstore_API/" + data.image_path;
            });
          });
          console.log("See this");
          console.log(product.variations);
          // const data=product.variations.map((data,i)=>{
          //   data.id=i
          //   return data;
          // })
          setvariation([...product.variations]);
          // setvardata()
          // setvariationlistt((variationlistt) => [
          //   ...variationlistt,
          //   variationdatashow,
          // ]);

          nhtml = "";
          // });
          product.product_images
            .slice(result.length, product.product_images.length)
            .map((data, i) => {
              dummyimgs[result.length + i] = {
                id: data.id,
                img:
                  "https://yrpitsolutions.com/Bookstore_API/" + data.image_path,
                file: "",
                is_variation_image: "",
              };
              showdummyimg[result.length + i] = {
                id: data.id,
                img:
                  "https://yrpitsolutions.com/Bookstore_API/" + data.image_path,
                file: "",
                is_variation_image: "",
              };
            });
          setActiveImage(0);
          // setvariation(update_var);
          const pr_data = res.data?.product;
          const data = {
            product_name: pr_data.name,
            description: pr_data.description,
            height: pr_data.height,
            width: pr_data.width,
            length: pr_data.length,
            weight: pr_data.weight,
            height_unit: pr_data.height_unit,
            is_varient: pr_data.is_varient,
            is_recommended: pr_data.is_recommended,
            is_special: pr_data.is_special,
            product_code: pr_data.product_code,
            // variation_option_id:
            //   pr_data.variations[0].product_variation_details[0].id,
            // variation_id: pr_data.variations[0].id,
            // price: pr_data.variations[0].product_variation_details[0].price,
            // tax: pr_data.variations[0].product_variation_details[0].tax,
            // quantity: pr_data.variations[0].product_variation_details[0].stock,
            product_images: [...product.product_images],
          };
          console.log("data", data);
          setInput({
            ...data,
            sub_category_id: product.product_category?.id,
          });
          setdrdata1(product.product_category?.name);
          setdrdata(product.product_parent_category_name);
          setValue(product.description);
          // selectSubDropDownVal(product.product_category?.id,product.product_category?.name)
          // selectDropDownVal(product.product_category?.parent_id,categoryNames.map((data)=>{
          //   if(data.id==product.product_category?.parent_id)return data.name
          // }))
        }
      });
    }
    await get("admin/tax").then((res) => {
      if (res.response) {
        let cat_data = res.data.data;

        let m_data = cat_data.map((data, i) => {
          return {
            Sno: i + 1,
            id: data.id,
            Tax: data.tax,
          };
        });
        setTax(m_data);
      } else {
        console.log(
          "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
    await get("admin/size").then((res) => {
      if (res.response) {
        let cat_data = res.data.data;
        let new_cat = cat_data.map((data, i) => {
          return {
            sno: i + 1,
            id: data.id,
            size: data.size,
          };
        });
        setSize(new_cat);
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
  };
  useEffect(() => {
    getData();
  }, [pid]);
  const onCloseModal = () => {
    setVariationvalidat("");
    setQuantity([]);
    setvardata({
      price: "",
      tax: "",
      colour: "#000000",
      size: [],
      option: [],
    });
    setMyColor("#000000");
    setcolour_of_1_size([]);
    setOneditvaritaionid("");
    setgroup_id(maxgroup_id);
    setOpen(false);
  };
  const onCloseModal1 = () => {
    setOpen1(false);
  };
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  let [quantity, setQuantity] = useState([]);
  const [file, setFile] = useState();
  let [variation, setvariation] = useState([]);
  const [vardata, setvardata] = useState({
    price: [],
    tax: [],
    colour: "#000000",
    option: [],
    images: [],
    group_id: group_id,
    color_images: [],
    color_images_blob: [],
    parent_color_images: [],
    parent_color_images_blob: [],
  });
  const [activeImage, setActiveImage] = useState(null);
  const [dummyimgs, setDummyimgs] = useState([
    { img: "", file: null, file_name: "" },
    { img: "", file: null, file_name: "" },
    { img: "", file: null, file_name: "" },
    { img: "", file: null, file_name: "" },
    { img: "", file: null, file_name: "" },
    { img: "", file: null, file_name: "" },
    { img: "", file: null, file_name: "" },
    { img: "", file: null, file_name: "" },
  ]);

  const onChange = (e) => {
    setValue(e);
  };

  const IncrementItem = (i) => {
    console.log(quantity);
    if (input.quantity == null || undefined) {
      input.quantity = 1;
    } else {
      input.quantity += 1;
    }
    setInput(input);
    setvardata({ ...vardata });
  };
  const DecreaseItem = (i) => {
    if (input.quantity == null || undefined || input.quantity <= 0) {
      input.quantity = 0;
      setvardata({ ...vardata });
      setInput(input);
    } else {
      input.quantity -= 1;
      setInput(input);
      setvardata({ ...vardata });
    }
  };
  const handleChange = (event) => {
    let qty = parseInt(event.target.value);
    let i = parseInt(event.target.name);

    input.quantity = qty;
    // let i=parseInt(event.target.name);
    setvardata({ ...vardata });
  };

  //  image upload
  const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  const _handleImgChange = (e, i) => {
    e.preventDefault();
    console.log("_______image id is ___" + i);
    let reader = new FileReader();
    const image = e.target.files[0];

    reader.onload = () => {
      dummyimgs[i].img = reader.result;
      dummyimgs[i].file = image;
      dummyimgs[i].file_name = image.name;
      setFile({ file: file });
      setDummyimgs(dummyimgs);
    };

    reader.readAsDataURL(image);
    let group_ids = arrayColumn(myvariation, "group_id");
    group_ids = group_ids.filter(onlyUnique);
    console.log(group_ids);
    if (group_ids.length > 0) {
      console.log("_____ group_ids_____" + group_ids);

      for (let n = 0; n < group_ids.length; n++) {
        for (let j = 0; j < myvariation.length; j++) {
          if (n === i && myvariation[j].group_id === group_ids[n]) {
            console.log(
              "__" +
                n +
                "__" +
                i +
                "____add image to group_ids_____" +
                group_ids[n]
            );
            myvariation[j]["variation_image"] = dummyimgs[i];
          }
        }
      }
    }
    setActiveImage(i);
  };

  const [variationvalidat, setVariationvalidat] = useState("");
  const [dropen, setdropen] = useState(false);
  const [author, setAuthor] = useState(false);
  const [authorData, setAuthorData] = useState({
    id: null,
    first_name: "Author",
    img: null,
  });
  const [drdata, setdrdata] = useState("Category");
  const [dropen1, setdropen1] = useState(false);
  const [drdata1, setdrdata1] = useState("SubCategory");
  const [categoryNames, setCategoryNames] = useState([]);
  const [color, setColor] = useState([]);
  const [mycolor, setMyColor] = useState("#000000");
  const [size, setSize] = useState([]);
  const [tax, setTax] = useState([]);
  const [colour_of_1_size, setcolour_of_1_size] = useState([]);
  const [showvariationlist, setshowvariationlist] = useState([]);
  const [subcategoryNames, setSubCategoryNames] = useState([]);
  const [masterCategory, setMasterCategory] = useState([]);
  const [Authors, setAuthors] = useState([]);
  const nav = useNavigate();

  const [input, setInput] = useState({
    category_id: "",
    sub_category_id: "",
    product_name: "",
    price: "",
    tax: "",
    product_code: "",
    size: [],
    colour: [],
    quantity: "",
    description: "",
    is_recommended: 0,
    is_special: 0,
  });

  const selectDropDownVal = (id, name) => {
    setInputChange(id, "category_id");
    setdrdata(name);
    console.log(
      "🚩 ~ file: add-product.js:150 ~ selectDropDownVal ~ subcategoryNames:",
      subcategoryNames
    );
  };

  const selectSubDropDownVal = (id, name) => {
    setInputChange(id, "sub_category_id");
    setdrdata1(name);
  };
  // const removeProduct = (index) => {
  //   setColor([
  //     ...color.slice(0, index),
  //     ...color.slice(index + 1, color.length),
  //   ]);
  // };

  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };

  // VARIATION ONCHANGE
  const setVarChange = (data, param) => {
    console.log();
    // ||param=="tax"
    if (param == "price") {
      let tax = 0;
      if (vardata.tax > 0) tax = +vardata.tax;
      let mrp = 0;
      mrp = (tax * data) / 100;
      mrp += +data;
      setMrp(mrp);
    }
    if (param == "tax") {
      let price = 0;
      if (vardata.price > 0) price = +vardata.price;
      let mrp = 0;
      mrp = (price * data) / 100;
      mrp += +price;
      setMrp(mrp);
    }

    setvardata({ ...vardata, [param]: data });
  };

  const addProduct = async () => {
    // console.log("___________", myvariation);
    // console.log("enter");
    // //return;
    // let group_ids_r = arrayColumn(myvariation, "group_id");
    // group_ids_r = group_ids_r.filter(onlyUnique);
    // console.log("______", group_ids_r);
    // let k = 1;

    // // console.log("_____myvariation___"+JSON.stringify(myvariation)+"______");
    // // return;
    // if (
    //   input.product_name === "" ||
    //   input.sub_category_id === "" ||
    //   input.category_id === "" ||
    //   input.weight === "" ||
    //   input.height === "" ||
    //   input.width === "" ||
    //   input.length === "" ||
    //   value === ""
    // ) {
    //   console.log("er1");
    //   // toast.error("Please Fill All Mandatary Fields");
    //   toast.error(
    //     `Please Fill ${
    //       input.category_id === ""
    //         ? " Category"
    //         : input.sub_category_id === ""
    //         ? "Sub Category"
    //         : input.product_name === ""
    //         ? "Product Name"
    //         : input.weight === ""
    //         ? "Weight"
    //         : input.height === ""
    //         ? "Height"
    //         : input.width === ""
    //         ? "Width"
    //         : input.length === ""
    //         ? "Length"
    //         : value === ""
    //         ? "Description"
    //         : null
    //     } `
    //   );
    //   return;
    // } else if (variation.length === 0) {
    //   console.log("er2");
    //   toast.error("Please Fill Atleast One Variation");
    //   return;
    // } else {
    //   console.log("enter");
    //   setLoading(true);
    let payload_data = new FormData();
    let k = 0,
      l = 0;
    dummyimgs.map((data, index) => {
      if (data.file != null) {
        payload_data.append(`file[${l++}]`, data.file);
      }
    });
    if (dummyimgs[0].file != null) {
      payload_data.append(`thumbnail_image`, dummyimgs[0].file);
    }
    // for (let i = 0; i < variation.length; i++) {
    //   for (let j = 0; j < variation[i].color_images.length; j++) {
    //     console.log("this-->");
    //     console.log(variation[i].color_images[j]);
    payload_data.append(`variation_image[${1}][${0}]`, dummyimgs[0].file);
    payload_data.append(`parent_image[1]`, dummyimgs[0].file);
    //   }
    // }

    let dummymyvaritaion = [...myvariation];
    dummymyvaritaion.map(function (item) {
      delete item.id;
      delete item.variation_image;
      return item;
    });
    payload_data.append("weight", input.weight);
    payload_data.append("height", input.height);
    payload_data.append("length", input.length);
    payload_data.append("width", input.width);
    payload_data.append("name", input.product_name);
    payload_data.append("product_code", input.poduct_code);
    payload_data.append("master_product_type_id", 1);
    payload_data.append("author_id", authorData.id);
    payload_data.append("is_variant", "yes");
    payload_data.append("description", value);
    payload_data.append("sub_category_id", input.sub_category_id);
    payload_data.append("photos", "1");
    payload_data.append("product_code", input.product_code);
    payload_data.append("availability", "1");
    payload_data.append("is_special", input.is_special);
    payload_data.append("is_recommended", input.is_recommended);
    console.log("that");
    console.log(variation);
    payload_data.append(
      "variations",
      JSON.stringify([
        {
          colour: null,
          group_id: 1,
          variation_id: input.variation_id,
          variantimg: 1,
          mode: "edit",
          options: [
            {
              size: null,
              variation_option_id: input.variation_option_id,
              price: input.price,
              stock: input.quantity,
              tax: input.tax,
              mode: "edit",
            },
          ],
        },
      ])
    );
    await post("admin/product/update/" + pid, payload_data).then((res) => {
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        nav("/products/physical/product-list");
        toast.success(" Product Updated Successfully");
        setLoading(false);
      } else {
        toast.error(res.data.message);
        setLoading(false);

        console.log(
          "🚀 ~ file: sub category.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };

  let nhtml = "";
  (colour_of_1_size || []).map((data, i) => {
    nhtml +=
      '<li style="background-color:' +
      data +
      '; width:30px; height:30px; border-radius:100% ; margin-right:2px"></li>';
  });

  return (
    <Fragment>
      <Breadcrumb title="Edit Product" parent="Products" />
      {/* <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                   Product Category
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                    
                  
                        <Label className="d-block form-label">
                          <Input
                            className="radio_animated"
                            id="edo-ani"
                            type="radio"
                            name="rdo-ani"
                            value={1}
                            defaultChecked
                            onClick={()=>setProd({data:"Category"})}
                          />
                          Shop By Category
                        </Label>
                        <Label className="d-block form-label">
                          <Input
                            className="radio_animated"
                            id="edo-ani"
                            type="radio"
                            name="rdo-ani"
                            value={1}
                            onClick={()=>setProd({data:"Exam"})}
                           
                          />
                          Exam
                        </Label>
                        <Label className="d-block form-label">
                          <Input
                            className="radio_animated"
                            id="edo-ani"
                            type="radio"
                            name="rdo-ani"
                            value={0}
                            onClick={()=>setProd({data:"Author"})}
                          />
                         Author
                        </Label>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={() => {
                       setOpen(false)
                      }}>Save</Button>
                      {/* <Button
                        type="button"
                        color="secondary"
                        onClick={() => onCloseModal("VaryingMdo")}
                      >
                        Close
                      </Button> 
                    </ModalFooter>
                  </Modal> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Col xl="3 xl-50" sm="6 col-3">
                  <h5>Edit Product</h5>
                </Col>

                {/* <Button
                  type="button"
                  color="primary"
                  onClick={() => onOpenModal("", maxgroup_id)}
                  data-toggle="modal"
                  data-original-title="test"
                  data-target="#exampleModal"
                  disabled={variation.length > 7}
                >
                  Add Variation
                </Button> */}
              </CardHeader>
              <CardBody>
                <Row className="product-adding">
                  <Col xl="5">
                    <div className="add-product">
                      <Row>
                        <Col xl="9 xl-50" sm="6 col-9">
                          <img
                            src={
                              "https://yrpitsolutions.com/Bookstore_API/" +
                              cover
                            }
                            alt=""
                            className="img-fluid image_zoom_1 blur-up lazyloaded"
                          />
                        </Col>
                        <Col xl="3 xl-50" sm="6 col-3">
                          <ul className="file-upload-product">
                            {dummyimgs.map((res, i) => {
                              return (
                                <li key="{i}">
                                  <div className="box-input-file">
                                    <Input
                                      className="upload"
                                      type="file"
                                      onChange={(e) => _handleImgChange(e, i)}
                                    />

                                    <img
                                      alt=""
                                      src={res.img == "" ? one : res.img}
                                      style={{ width: 50, height: 50 }}
                                      onClick={() => setActiveImage(i)}
                                    />
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xl="7">
                    <Form
                      className="needs-validation add-product-form"
                      // onSubmit={handleValidSubmit}
                    >
                      <div className="form form-label-center">
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Category Name<span className="text-danger">*</span>{" "}
                            :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Dropdown
                              isOpen={dropen}
                              toggle={() => {
                                setdropen(!dropen);
                              }}
                              required
                            >
                              <DropdownToggle caret>
                                {drdata ? drdata : "Kids"}{" "}
                              </DropdownToggle>
                              <DropdownMenu>
                                {categoryNames?.map((item, i) => (
                                  <DropdownItem
                                    key={i}
                                    value={item.id ? item.id : "Not selected"}
                                    onClick={() => {
                                      selectDropDownVal(item.id, item.name);
                                      console.log("icon", item);
                                      setCover(item.icon);
                                    }}
                                  >
                                    {item.name}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                          <Label className="col-xl-3 col-sm-4 mb-4">
                            SubCategory <span className="text-danger">*</span>:
                          </Label>
                          <div className="col-xl-8 col-sm-7 ">
                            <Dropdown
                              isOpen={dropen1}
                              toggle={() => {
                                setdropen1(!dropen1);
                              }}
                              required
                            >
                              <DropdownToggle caret>
                                {drdata1 ? drdata1 : "sub category"}{" "}
                              </DropdownToggle>
                              <DropdownMenu>
                                {subcategoryNames?.map(
                                  (item, i) =>
                                    item.category == drdata && (
                                      <DropdownItem
                                        key="{i}"
                                        value={item.id}
                                        onClick={() => {
                                          selectSubDropDownVal(
                                            item.id,
                                            item.SubCategory
                                          );
                                        }}
                                      >
                                        {item.SubCategory}
                                      </DropdownItem>
                                    )
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          </div>

                          <Label className="col-xl-3 col-sm-4 mb-4">
                            Authors<span className="text-danger">*</span>:
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Dropdown
                              isOpen={author}
                              toggle={() => {
                                setAuthor(!author);
                              }}
                              required
                            >
                              <DropdownToggle caret>
                                {authorData.first_name +
                                  " " +
                                  authorData.last_name}
                              </DropdownToggle>
                              <DropdownMenu>
                                {Authors?.map((item, i) => (
                                  <DropdownItem
                                    key={i}
                                    value={item.id}
                                    onClick={() => {
                                      // selectDropDownVal(item.id, item.name);
                                      // console.log("icon",item);
                                      console.log(item);
                                      setAuthorData({ ...item });
                                    }}
                                  >
                                    {item.first_name + " " + item.last_name}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Product Name <span className="text-danger">*</span>:
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={input.product_name}
                              onChange={(e) =>
                                setInputChange(e.target.value, "product_name")
                              }
                              className="form-control"
                              name="product_name"
                              id="validationCustom01"
                              type="text"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                           Author Name:
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={auth}
                              className="form-control "
                              name="product_author"
                              id="validationCustomUsername"
                              type="text"
                              required
                            />
                          </div>
                          <div className="invalid-feedback offset-sm-4 offset-xl-3">
                            Please choose Valid Code.
                          </div>
                          </FormGroup> */}
                        {Prod.data == "Exam" ? (
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Exam Image<span className="text-danger">*</span> :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                onChange={(e) => _handleImgChange(e, 0)}
                                type="file"
                                accept="image/png, image/jpeg"
                                className="border form-group mb-3 mr-3 p-1 rounded-2 "
                                style={{ width: "100px" }}
                              />
                              <li key="{i}">
                                <div className="box-input-file">
                                  <img
                                    alt=""
                                    src={
                                      dummyimgs[0].img == ""
                                        ? one
                                        : dummyimgs[0].img
                                    }
                                    style={{ width: 150, height: 150 }}
                                  />
                                </div>
                              </li>
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>
                        ) : (
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Author Image<span className="text-danger">*</span>{" "}
                              :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <li key="{i}">
                                <div className="box-input-file">
                                  <img
                                    alt=""
                                    src={
                                      authorData.Image == ""
                                        ? one
                                        : authorData.Image
                                    }
                                    style={{ width: 150, height: 150 }}
                                  />
                                </div>
                              </li>
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>
                        )}

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Product Code :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={input.product_code}
                              onChange={(e) =>
                                setInputChange(e.target.value, "product_code")
                              }
                              className="form-control "
                              name="product_code"
                              id="validationCustomUsername"
                              type="text"
                              required
                            />
                          </div>
                          <div className="invalid-feedback offset-sm-4 offset-xl-3">
                            Please choose Valid Code.
                          </div>
                          <FormGroup className="m-checkbox-inline mb-3 custom-radio-ml  d-flex radio-animated mt-3">
                            <Label className="col-xl-4 col-sm-4 mb-0">
                              Product Type :
                            </Label>
                            <div className="row flex">
                              {masterCategory.map((data) => {
                                return (
                                  <Label key={data.id}>
                                    <Input
                                      className="radio_animated"
                                      id="r"
                                      type="checkbox"
                                      name="rdo-ani"
                                      onChange={(e) => {
                                        setInputChange(
                                          document.getElementById("r").checked
                                            ? 1
                                            : 0,
                                          data.id
                                        );
                                      }}
                                    />
                                    {data.name} {"  "}
                                  </Label>
                                );
                              })}
                            </div>
                          </FormGroup>
                        </FormGroup>
                      </div>
                      <div className="form">
                        <FormGroup className="form-group mb-3 row">
                          <Input
                            onChange={(e) =>
                              setVarChange(e.target.value, "group_id")
                            }
                            className="form-control mb-0"
                            name="group_id"
                            id="group_id__"
                            type="hidden"
                            value={group_id}
                          />

                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Price<span className="text-danger">*</span> :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={input.price}
                              onChange={(e) => {
                                setVarChange(e.target.value, "price");
                                setInputChange(e.target.value, "price");
                              }}
                              className="form-control mb-0"
                              name="price"
                              id="validationCustom02"
                              type="number"
                              required
                              // value={data.price && data.price}
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Tax<span className="text-danger">*</span> :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              value={input.tax}
                              onChange={(e) => {
                                setVarChange(e.target.value, "tax");
                                setInputChange(e.target.value, "tax");
                              }}
                              className="form-control digits"
                              id="exampleFormControlSelect1"
                            >
                              <option value={""}>Select Tax Rate</option>
                              {tax.map((data) => {
                                // console.log(tax);
                                return (
                                  <option value={data.Tax}>{data.Tax}</option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            MRP<span className="text-danger">*</span> :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            {input.price && (
                              <Input
                                // onChange={
                                //   (e) => {
                                //     data.price = e.target.value;
                                //     setvardata({ ...vardata });
                                //   }
                                // setVarChange(e.target.value, "tax")
                                // }
                                value={mrp}
                                className="form-control mb-0"
                                name="price"
                                id="validationCustom02"
                                type="number"
                                required
                                // value={data.price && data.price}
                              />
                            )}
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Input
                            onChange={(e) =>
                              setVarChange(e.target.value, "group_id")
                            }
                            className="form-control mb-0"
                            name="group_id"
                            id="group_id__"
                            type="hidden"
                            value={group_id}
                          />

                          {/* <Label className="col-xl-3 col-sm-4 mb-0">
                            Discount(%) :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              // onChange={
                              //   (e) => {
                              //     data.discount = e.target.value;
                              //     setvardata({ ...vardata });
                              //   }
                              //   // setVarChange(e.target.value, "tax")
                              // }
                              className="form-control mb-0"
                              name="discount"
                              id="validationCustom02"
                              type="number"
                              required
                              // value={data.discount && data.discount}
                            />
                          </div> */}
                          {/* <div className="valid-feedback">Looks good!</div> */}
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Input
                            onChange={(e) =>
                              setVarChange(e.target.value, "group_id")
                            }
                            className="form-control mb-0"
                            name="group_id"
                            id="group_id__"
                            type="hidden"
                            value={group_id}
                          />

                          {/* <Label className="col-xl-3 col-sm-4 mb-0">
                            Start Date :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              // onChange={
                              //   (e) => {
                              //     data.startdata = e.target.value;
                              //     setvardata({ ...vardata });
                              //   }
                              //   // setVarChange(e.target.value, "tax")
                              // }
                              className="form-control mb-0"
                              name="startdata"
                              id="validationCustom02"
                              type="date"
                              required
                              // value={data.startdata && data.startdata}
                            />
                          </div> */}
                          {/* <div className="valid-feedback">Looks good!</div> */}
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Input
                            onChange={(e) =>
                              setVarChange(e.target.value, "group_id")
                            }
                            className="form-control mb-0"
                            name="group_id"
                            id="group_id__"
                            type="hidden"
                            value={group_id}
                          />

                          {/* <Label className="col-xl-3 col-sm-4 mb-0">
                            End Date :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              // onChange={
                              //   (e) => {
                              //     data.enddate = e.target.value;
                              //     setvardata({ ...vardata });
                              //   }
                              //   // setVarChange(e.target.value, "tax")
                              // }
                              className="form-control mb-0"
                              name="enddate"
                              id="validationCustom02"
                              type="date"
                              required
                              // value={data.enddate && data.enddate}
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div> */}
                        </FormGroup>

                        <FormGroup
                          className="form-group mb-3 row"
                          style={{ display: "flex" }}
                        >
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Total Products
                            <span className="text-danger">*</span>:
                          </Label>
                          <fieldset
                            className="qty-box ms-0"
                            style={{ display: "flex", width: "unset" }}
                          >
                            <div className="input-group bootstrap-touchspin">
                              <div className="input-group-prepend">
                                <Button
                                  className="btn btn-primary btn-square bootstrap-touchspin-down"
                                  type="button"
                                  onClick={() => DecreaseItem(0)}
                                >
                                  <i className="fa fa-minus"></i>
                                </Button>
                              </div>

                              <Input
                                className="touchspin form-control"
                                type="number"
                                style={{
                                  maxWidth: "100px",
                                  alignItems: "self-start",
                                }}
                                name="{i}"
                                value={input.quantity ? input.quantity : ""}
                                onChange={handleChange}
                              />

                              <div className="input-group-append ms-0">
                                <Button
                                  className="btn btn-primary btn-square bootstrap-touchspin-up"
                                  type="button"
                                  onClick={() => IncrementItem(0)}
                                >
                                  <i className="fa fa-plus"></i>
                                </Button>
                              </div>
                            </div>
                          </fieldset>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0"></Label>

                          <div className="col-xl-8 col-sm-7">
                            <p
                              style={{
                                color: "#ff8084",
                              }}
                            >
                              On Each Order Product Weight Cannot Not Exceed
                              100kg and Product Description Length Should not be
                              more than 250 letters
                            </p>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Weight (kg)<span className="text-danger">*</span>:
                          </Label>

                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={input.weight}
                              onChange={(e) =>
                                setInputChange(e.target.value, "weight")
                              }
                              className="form-control mb-0"
                              name="price"
                              id="validationCustom02"
                              type="number"
                              required
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Height (cm)<span className="text-danger">*</span>:
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={input.height}
                              onChange={(e) =>
                                setInputChange(e.target.value, "height")
                              }
                              className="form-control mb-0"
                              name="price"
                              id="validationCustom02"
                              type="number"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Length (cm)<span className="text-danger">*</span> :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={input.length}
                              onChange={(e) =>
                                setInputChange(e.target.value, "length")
                              }
                              className="form-control mb-0"
                              name="price"
                              id="validationCustom02"
                              type="number"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Width (cm)<span className="text-danger">*</span> :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              value={input.width}
                              onChange={(e) =>
                                setInputChange(e.target.value, "width")
                              }
                              className="form-control mb-0"
                              name="price"
                              id="validationCustom02"
                              type="number"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4">
                            Add Description
                            <span className="text-danger">*</span> :
                          </Label>
                          <div className="col-xl-8 col-sm-7 description-sm">
                            <MDEditor
                              value={value}
                              onChange={onChange}
                              preview="edit"
                            />
                          </div>
                        </FormGroup>
                        {/* <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                           Availability :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                          <Button type="button" color="primary" onClick={()=>setOpen(true)}>
                          Yes
                        </Button>
                          </div>
                        </FormGroup> */}
                      </div>
                      <div className="offset-xl-3 offset-sm-4">
                        <Button
                          onClick={() => addProduct()}
                          color="primary"
                          // disabled={loading === true ? true : false}
                        >
                          Edit
                        </Button>
                        <Button type="button" color="light">
                          Discard
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <StateSelection open={open} onCloseModal={onCloseModal} /> */}
    </Fragment>
  );
};

export default Add_product;
