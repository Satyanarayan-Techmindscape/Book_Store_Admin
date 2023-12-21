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
import { useNavigate } from "react-router-dom";
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
  const [isSelected, setIsSelected] = React.useState([false]);
  // const [categoryName, setCategoryName] = React.useState("");
  // const [subCategoryName, setSubCategoryName] = React.useState("");

  const arrayColumn = (array, column) => {
    return array.map((item) => item[column]);
  };
  const savetovariation = (
    idofvariation,
    data_here,
    colorsofthisdata,
    group_id
  ) => {
    idofvariation = oneditvaritaionid;
    console.log("____lets do something____________");
    console.log(
      "__________index which edited_or added_____________",
      oneditvaritaionid
    );
    console.log("__________colorsofthisdata_____________", colorsofthisdata);

    //for datatable
    let variationdatashow = {
      price: data_here.price,
      tax: data_here.tax,
      colour: data_here.colour ? data_here.colour : "",
      colourlist: colour_of_1_size,
      size: data_here.size,
      stock: data_here.stock,
      group_id: group_id,
      color_images: data_here.color_images,
      color_images_blob: data_here.color_images_blob,
      // is_deleted:0,
      image: [],
    };
    console.log(
      "__________index which edited_or added_____________",
      variationdatashow
    );
    console.log("__________", vardata);
    let element_vardata_keys = Object.keys(vardata);

    if (element_vardata_keys.includes("id")) {
      variationdatashow.id = vardata.id;
    }

    if (element_vardata_keys.includes("colorlistid")) {
      variationdatashow.colorlistid =
        vardata.colorlistid != undefined &&
        vardata.colorlistid != "" &&
        vardata.colorlistid != "undefined"
          ? vardata.colorlistid
          : [];
    }

    if (
      oneditvaritaionid === "" ||
      oneditvaritaionid === undefined ||
      oneditvaritaionid === "undefined"
    ) {
      console.log("_________when there is no id when add___*************_");

      variationlistt.push(variationdatashow);
    } else {
      console.log("________edit____", oneditvaritaionid);
      variationlistt[oneditvaritaionid] = variationdatashow;
      setOneditvaritaionid("");
    }

    console.log("____", variationlistt);

    let mynewpayload = [];
    console.log("____variationlistt____", variationlistt);
    for (let n = 0; n < variationlistt.length; n++) {
      //console.log();

      let element_var = variationlistt[n];
      element_var["group_id"] = n + 1;
      element_var["variation_image"] = dummyimgs[n];
      let is_deleted_data =
        element_var["is_deleted"] != "" &&
        element_var["is_deleted"] !== undefined &&
        element_var["is_deleted"] !== "undefined"
          ? element_var["is_deleted"]
          : 0;
      var element_var_keys = Object.keys(element_var);
      //temvar = element_var;
      if (element_var_keys.includes("colourlist")) {
        if (element_var["colourlist"].length == 0) {
          console.log("_________no_____colourlist___");
          if (element_var_keys.includes("colorlistid")) {
            for (let cl = 0; cl < element_var["colorlistid"].length; cl++) {
              console.log("data_updated");
              mynewpayload.push({
                id: element_var["colorlistid"][cl]
                  ? element_var["colorlistid"][cl]
                  : element_var["colorlistid"][0]
                  ? element_var["colorlistid"][0]
                  : null,
                colour: "#00000",
                image: [],
                is_deleted: 1,
                price: element_var["price"],
                size: element_var["size"],
                stock: element_var["stock"],
                tax: element_var["tax"],
                group_id: element_var["group_id"],
                variation_image: element_var["variation_image"],
                color_images: element_var["color_images"],
                color_images_blob: element_var["color_images_blob"],
              });
            }
          }
        }
        for (let j = 0; j < element_var["colourlist"].length; j++) {
          console.log(
            "______________colourlist___" + j + "_______________",
            element_var["colourlist"][j]
          );
          if (
            element_var_keys.includes("colorlistid") &&
            element_var_keys.includes("colourlist")
          ) {
            console.log("_____________there here__________________");

            if (
              element_var["colorlistid"].length <=
              element_var["colourlist"].length
            ) {
              if (
                element_var["colorlistid"][j] != "" &&
                element_var["colorlistid"][j] != undefined &&
                element_var["colorlistid"][j] != "undefined"
              ) {
                console.log("_____________here");
                mynewpayload.push({
                  id: element_var["colorlistid"][j]
                    ? element_var["colorlistid"][j]
                    : element_var["colorlistid"][0]
                    ? element_var["colorlistid"][0]
                    : null,
                  colour: element_var["colourlist"][j],
                  image: element_var["image"],
                  variantimg: element_var["image"],
                  price: element_var["price"],
                  size: element_var["size"],
                  stock: element_var["stock"],
                  tax: element_var["tax"],
                  group_id: element_var["group_id"],
                  is_deleted: is_deleted_data,
                  variation_image: element_var["variation_image"],
                  color_images: element_var["color_images"],
                  color_images_blob: element_var["color_images_blob"],
                });
              } else {
                console.log("_____________there");
                mynewpayload.push({
                  colour: element_var["colourlist"][j],
                  image: element_var["image"],
                  variantimg: element_var["image"],
                  price: element_var["price"],
                  size: element_var["size"],
                  stock: element_var["stock"],
                  tax: element_var["tax"],
                  group_id: element_var["group_id"],
                  is_deleted: is_deleted_data,
                  variation_image: element_var["variation_image"],
                  color_images: element_var["color_images"],
                  color_images_blob: element_var["color_images_blob"],
                });
              }
            } else if (
              element_var["colorlistid"].length >
              element_var["colourlist"].length
            ) {
              console.log(
                "______colorlistid > colorlist____" +
                  element_var["colourlist"][j]
              );

              for (let l = 0; l < element_var["colorlistid"].length; l++) {
                if (
                  element_var["colourlist"][l] !== undefined &&
                  element_var["colourlist"][l] !== "undefined"
                ) {
                  console.log(
                    "_____________________________id not deleted________"
                  );
                  mynewpayload.push({
                    id: element_var["colorlistid"][l],

                    colour: element_var["colourlist"][j],
                    image: element_var["image"],
                    variantimg: element_var["image"],
                    price: element_var["price"],
                    size: element_var["size"],
                    stock: element_var["stock"],
                    tax: element_var["tax"],
                    group_id: element_var["group_id"],
                    is_deleted: is_deleted_data,
                    variation_image: element_var["variation_image"],
                    color_images: element_var["color_images"],
                    color_images_blob: element_var["color_images_blob"],
                  });
                } else {
                  console.log(
                    "_____________________________id deleted________"
                  );
                  mynewpayload.push({
                    id: element_var["colorlistid"][l],
                    is_deleted: 1,
                    colour: element_var["colourlist"][j],
                    image: element_var["image"],
                    variantimg: element_var["image"],
                    price: element_var["price"],
                    size: element_var["size"],
                    stock: element_var["stock"],
                    group_id: element_var["group_id"],
                    tax: element_var["tax"],
                    variation_image: element_var["variation_image"],
                    color_images: element_var["color_images"],
                    color_images_blob: element_var["color_images_blob"],
                  });
                }
              }
            } else {
              console.log("_________________1262");

              mynewpayload.push({
                colour: element_var["colourlist"][j],
                image: element_var["image"],
                variantimg: element_var["image"],
                price: element_var["price"],
                size: element_var["size"],
                stock: element_var["stock"],
                tax: element_var["tax"],
                group_id: element_var["group_id"],
                is_deleted: is_deleted_data,
                variation_image: element_var["variation_image"],
                color_images: element_var["color_images"],
                color_images_blob: element_var["color_images_blob"],
              });
            }
          } else {
            console.log("_________________1273");
            mynewpayload.push({
              colour: element_var["colourlist"][j],
              image: element_var["image"],
              variantimg: element_var["image"],
              price: element_var["price"],
              size: element_var["size"],
              stock: element_var["stock"],
              tax: element_var["tax"],
              group_id: element_var["group_id"],
              is_deleted: is_deleted_data,
              variation_image: element_var["variation_image"],
              color_images: element_var["color_images"],
              color_images_blob: element_var["color_images_blob"],
            });
          }
        }
      } else {
        console.log("_______________in lese_______last");

        mynewpayload.push({
          colour: element_var["color"],
          image: element_var["image"],
          variantimg: element_var["image"],
          price: element_var["price"],
          size: element_var["size"],
          stock: element_var["stock"],
          tax: element_var["tax"],
          group_id: element_var["group_id"],
          is_deleted: is_deleted_data,
          variation_image: element_var["variation_image"],
          color_images: element_var["color_images"],
          color_images_blob: element_var["color_images_blob"],
        });
        // mynewpayload.push(element_var);
      }
    }

    console.log("___________latest payload___________", mynewpayload);
    setMyvariation([]);
    setMyvariation(mynewpayload);
    if (idofvariation !== "" && group_id) {
      console.log("_____max group id updated________");

      setgroup_id(maxgroup_id);
    }
  }; //end of function
  const s_avetovariation_ = (
    idofvariation,
    data_here,
    colorsofthisdata,
    group_id
  ) => {
    // console.log("___idofvariation__"+JSON.stringify(idofvariation)+"________");
    // console.log("_____"+JSON.stringify(data_here)+"________");
    // console.log("_____"+JSON.stringify(colorsofthisdata)+"________");
    // console.log("_____"+colorsofthisdata.length+"________");
    console.log("___maxgroup_id__" + maxgroup_id + "________");
    let toberemoved = [];
    if (idofvariation !== "" && group_id) {
      console.log("______this is edit___" + idofvariation + "___" + group_id);
      for (let i = 0; i < myvariation.length; i++) {
        if (myvariation[i].group_id === group_id) {
          toberemoved.push(i);
          //myvariation.splice(i,1);
        }
      }
    }
    let var_arr = [];
    for (let var_index = 0; var_index < colorsofthisdata.length; var_index++) {
      const colorelement = colorsofthisdata[var_index];

      var_arr[var_index] = {
        id: idofvariation,
        group_id: group_id,
        price: data_here.price,
        tax: data_here.tax,
        size: data_here.size,
        stock: data_here.stock,
        color_images: data_here.color_images,
        color_images_blob: data_here.color_images_blob,
        colour: colorelement,
        //"variation_image":dummyimgs[group_id],
      };
      if (idofvariation !== "" && group_id) {
        console.log("______this is edit___" + idofvariation + "___" + group_id);
        myvariation.push({
          id: idofvariation,
          group_id: group_id,
          price: data_here.price,
          tax: data_here.tax,
          size: data_here.size,
          stock: data_here.stock,
          color_images: data_here.color_images,
          color_images_blob: data_here.color_images_blob,
          colour: colorelement,
          variation_image: dummyimgs[group_id - 1],
        });
        console.log(
          "__toberemoved___" + JSON.stringify(toberemoved) + "________"
        );
        for (let i = 0; i < toberemoved.length; i++) {
          myvariation.splice(toberemoved[i], 1);
        }
        toberemoved = [];
      } else {
        toberemoved = [];
        console.log("_____this is add__" + idofvariation + "___" + group_id);
        myvariation.push({
          id: idofvariation,
          group_id: group_id,
          price: data_here.price,
          tax: data_here.tax,
          size: data_here.size,
          stock: data_here.stock,
          color_images: data_here.color_images,
          color_images_blob: data_here.color_images_blob,
          colour: colorelement,
          variation_image: dummyimgs[group_id - 1],
        });
      }
    }
    if (idofvariation !== "" && group_id) {
      console.log("_____max group id updated________");

      setgroup_id(maxgroup_id);
    }
    console.log("_____" + JSON.stringify(var_arr) + "________");
  };

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
    handleCloseModal();
  };

  const handleCloseModal = () => {
    const acquiredData = document.querySelectorAll(".master-category");
    // let isSelected = false;
    console.log('acquiredData of the field ".master-category"', [
      ...acquiredData,
    ]);
    for (let i = 0; i < acquiredData.length; i++) {
      console.log(acquiredData[i]);
      if (acquiredData[i].checked === true) {
        setIsSelected([true]);

        break;
      }
    }

    console.log("Acquired #r elements", isSelected);
    if (!isSelected[0]) {
      toast.error("Field selection is required");
      setOpen(true);
    } else {
      setOpen(false);
    }
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
      input.quantity = 1;
      setInput(input);
      setvardata({ ...vardata });
    } else {
      input.quantity > 1
        ? (input.quantity -= 1)
        : (input.quantity = input.quantity);
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
    console.log(e.target.files);
    const image = e.target.files[0];
    console.log(image);
    console.log(activeImage);

    reader.onload = () => {
      dummyimgs[i].img = reader.result;
      dummyimgs[i].file = image;
      dummyimgs[i].file_name = image.name;
      setFile({ file: file });
      setDummyimgs(dummyimgs);
    };

    image && reader.readAsDataURL(image);
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
  // const [selectedCategory, setSelectedCategory] = React.useState([])
  // const [selectedSubCategory, setSelectedSubCategory] = React.useState([])
  const nav = useNavigate();

  useEffect(() => {
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
            return {
              name: category.name,
              id: category.id,
              icon: category.icon,
            };
          });
          setCategoryNames(new_cat);
        } else {
          console.log(
            "🚀 ~ file: category.js:27 ~ awaitpost ~ ̥:",
            res.data.message
          );
        }
      });
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

    getData();
  }, []);

  const [input, setInput] = useState({
    category_id: "",
    sub_category_id: "",
    product_name: "",
    price: "",
    tax: "",
    product_code: "",
    size: [],
    colour: [],
    quantity: 1,
    description: "",
    is_recommended: 0,
    is_special: 0,
    product_types: [],
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
  const removeSize = (index) => {
    let toberemove_group_id = showvariationlist[index].group_id;
    dummyimgs[toberemove_group_id - 1] = { img: "", file: null, file_name: "" };
    let myvar = myvariation.filter(function (item) {
      return item["group_id"] != toberemove_group_id;
    });

    //   return;
    setMyvariation(myvar);
    setshowvariationlist([
      ...showvariationlist.slice(0, index),
      ...showvariationlist.slice(index + 1, showvariationlist.length),
    ]);
    // variation.splice(index, 1);
    variationlistt.splice(index, 1);
    if (myvariation.length === 0) {
      setMyvariation([]);
      setgroup_id(1);
      setmaxgroup_id(1);
    }
    onCloseModal1("VaryingMdo");
  };
  const setInputChange = (data, param) => {
    console.log(input, data, param);
    // input[param] = data;
    console.log(input, data, param);
    setInput({ ...input, [param]: data });
    console.log(input);
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
  const setParentChange = (data, param) => {
    vardata[param] = data;
    setvardata({ ...vardata });
  };
  const setColorVarChange = () => {
    vardata["colour"] = mycolor;
    setvardata({ ...vardata });
    // COLOUR ADDITTION OF ONE VARIATION
    // if (colour_of_1_size.some((item) => item == mycolor)) {
    //   setVariationvalidat("Color Cannot Be Same");
    //   // alert("color cannot be same");
    // } else {
    colour_of_1_size[0] = vardata["colour"];
    // }
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
    payload_data.append("quantity", input.quantity);
    payload_data.append("price", input.price);
    payload_data.append("tax", input.tax);
    payload_data.append("mrp", mrp);
    payload_data.append("height", input.height);
    payload_data.append("length", input.length);
    payload_data.append("width", input.width);
    payload_data.append("name", input.product_name);
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
          variantimg: 1,
          options: [
            {
              size: null,
              price: input.price,
              stock: input.quantity,
              tax: input.tax,
            },
          ],
        },
      ])
    );
    await post("admin/product/store", payload_data).then((res) => {
      if (res.data.success) {
        onCloseModal("VaryingMdo");
        nav("/products/physical/product-list");
        toast.success("added Product Successfully");
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

  const setProductTypesfn = () => {
    const all_elements = document.querySelectorAll(".check-product-type");
    let newProductTypes = [];
    for (let i = 0; i < all_elements.length; i++) {
      if (all_elements[i].value === true) {
        newProductTypes.push(i);
      }
    }
    setInputChange(newProductTypes, product_types);
  };

  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Products" />
      <ToastContainer></ToastContainer>

      {/**********************************The Master Category Modal(Banner) Removed here **************************/}

      {/* <Modal isOpen={open} toggle={handleCloseModal}>
        <ModalHeader>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Product Master Type
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            {masterCategory.map((data) => {
              return (
                <Label key={data.id}>
                  <Input
                    className="radio_animated master-category"
                    id="r"
                    type="checkbox"
                    name="rdo-ani[]"
                    onChange={(e) => {
                      console.log(
                        document.getElementsByName("rdo-ani[]")[0].checked
                      );

                      setInputChange(
                        document.getElementsByName("rdo-ani[]").checked
                          ? data.id
                          : 0,
                        "masterCategory"
                      );
                      setProd({ data: data.id });
                    }}
                  />
                  {data.name} {"  "}
                  <br />
                </Label>
              );
            })}
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCloseModal}>Save</Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => onCloseModal("VaryingMdo")}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal> */}

      {/**********************************The Master Category Modal(Banner) Removed here **************************/}

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
                  <h5>Add Product</h5>
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
                                    {
                                      <Input
                                        className="upload"
                                        type="file"
                                        onChange={(e) => _handleImgChange(e, i)}
                                      />
                                    }

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
                              <DropdownToggle caret>{drdata}</DropdownToggle>
                              <DropdownMenu>
                                {categoryNames?.map((item, i) => (
                                  <DropdownItem
                                    key={i}
                                    value={item.id}
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
                              <DropdownToggle caret>{drdata1}</DropdownToggle>
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
                                          // setSubCategoryNames(item);
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
                                      // console.log(item);
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
                              <Label>
                                <Input
                                  className="radio_animated check-product-type"
                                  id="r"
                                  type="checkbox"
                                  name="rdo-ani"
                                  onChange={setProductTypesfn}
                                />
                                {"New Release"} {"  "}
                              </Label>
                              {/* <Label>
                                <Input
                                  className="radio_animated"
                                  id="r"
                                  type="checkbox"
                                  name="rdo-ani"
                                  onChange={(e) => {
                                    setInputChange(
                                      "Upcoming Exam Schedule",
                                      "product_ype"
                                    );
                                  }}
                                />
                                {"Upcoming Exam Schedule"} {"  "}
                              </Label> */}
                              <Label>
                                <Input
                                  className="radio_animated"
                                  id="r"
                                  type="checkbox"
                                  name="rdo-ani"
                                  onChange={setProductTypesfn}
                                />
                                {"Deal Of The Week"}
                              </Label>
                              {/* <Label>
                                <Input
                                  className="radio_animated"
                                  id="r"
                                  type="checkbox"
                                  name="rdo-ani"
                                  onChange={(e) => {
                                    setInputChange(
                                      "Shop By Exams",
                                      "product_ype"
                                    );
                                  }}
                                />
                                {"Shop By Exams"}
                              </Label> */}
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
                            {vardata.price && (
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
                                    Discount(%){" "}
                                    :
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
                          {/* <div className="valid-feedback">
                                    Looks good!
                                  </div> */}
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
                                    Start Date{" "}
                                    :
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
                                  </div>
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div> */}
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
                                    End Date{" "}
                                    :
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
                                  </div> */}
                          {/* <div className="valid-feedback">
                                    Looks good!
                                  </div> */}
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
                                  onClick={() => DecreaseItem(1)}
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
                                value={input.quantity > 0 ? input.quantity : ""}
                                onChange={handleChange}
                              />

                              <div className="input-group-append ms-0">
                                <Button
                                  className="btn btn-primary btn-square bootstrap-touchspin-up"
                                  type="button"
                                  onClick={() => IncrementItem(1)}
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
                          Add
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
