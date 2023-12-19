import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import StateSelection from "../products/physical/StateSelection";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContextProvider";

const Datatable = ({
  variationmodal,
  myData,
  myClass,
  multiSelectOption,
  pagination,
  notaction,
  noid,
  coupon,
  special,
  onlyEdit,
  onlyDelete,
  header,
  Cheader,
  withoutAction,
  type,
  updateItem,
  tax,
  withView,
  list,
  size,
  deleteItem,
  categoryNames,
  addvariationmodal,
  changeStatus,
  getdata,
  searchProp
}) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [ac, setac] = useState("Active");
  const [checkedValues, setCheckedValues] = useState([]);
  const [data, setData] = useState(myData);
  const [dropen, setdropen] = useState(false);
  const [drdata, setdrdata] = useState("Header");
  const [modalsToggle, setModalsToggle] = useState({});
  const [editInput, setEditInput] = useState({
    category_name: "",
    file: "",
    id: "",
  });
  const [editParentId, setEditParentId] = useState("");

  const { searchText } = useContext(AuthContext);
  const [prevData, setPrevData] = useState([]);
  const [searchEntered, setSearchEntered] = useState(false);

  useEffect(()=>{
    setPrevData(myData)
  },[myData])
  
  useEffect(() => {
    if(searchText !== ""){
      let filterData = data.filter((item) => 
      {
        console.log(item);
        return  String(item[searchProp]).toLowerCase().includes(searchText.toLowerCase())
      })
      setData(filterData)
      setSearchEntered(true)
    } else {
      if(searchEntered){
        setData(prevData)
      }
    } 

    
  }, [searchText])


  const selectDropDownVal = (id, name) => {
    // setInputChange(id, "parent_id")
    setEditParentId(id);
    setdrdata(name);
  };

  useEffect(() => {
    data.map((value, i) => {
      modalsToggle[value.id] = false;
      setModalsToggle({ ...modalsToggle });
    });
  }, [data]);

  const ModalForm = (data) => {
    if (type == "category") {
      return (
        <Form>
          <FormGroup>
            <Dropdown
              id={`edit_category_head${data.row.id}`}
              isOpen={dropen}
              toggle={() => {
                setdropen(!dropen);
              }}
            >
              <DropdownToggle caret>
                {drdata == "Header" ? data.row.header : drdata}
              </DropdownToggle>
              <DropdownMenu>
                {Cheader?.map((item, i) => (
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
            <Label htmlFor="recipient-name" className="col-form-label">
              {" "}
              Category Name<span className="text-danger">*</span> :{" "}
            </Label>
            <Input
              type="text"
              id={`edit_category_name${data.row.id}`}
              name="category_name"
              defaultValue={data.row.category}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message-text" className="col-form-label">
              {" "}
              Category Image (260 x 350px):
            </Label>
            <Input
              id={`edit_category_file${data.row.id}`}
              className="form-control"
              type="file"
              name="category_img"
            />
          </FormGroup>
        </Form>
      );
    } 
if(type=="Authors"){
  return (
    <Form>
    <FormGroup>
    
      <Label
        htmlFor="recipient-name"
        className="col-form-label"
      >
        First Name<span className="text-danger">*</span>{" "}
        :
      </Label>
      <Input
        type="text"
        name="category_name"
        id={`edit_Authors_firstName${data.row.id}`}
        defaultValue={data.row.first_name}
        className="form-control"
      />
    </FormGroup>
    <FormGroup>
    
    <Label
      htmlFor="recipient-name"
      className="col-form-label"
    >
     Last Name<span className="text-danger">*</span>{" "}
      :
    </Label>
    <Input
      type="text"
      id={`edit_Authors_lastName${data.row.id}`}
      defaultValue={data.row.last_name}
      name="category_name"
     
      className="form-control"
    />
  </FormGroup>
  <FormGroup>
    
    <Label
      htmlFor="recipient-name"
      className="col-form-label"
    >
     Image<span className="text-danger">*</span>{" "}
      :
    </Label>
    <Input
      type="file"
      name="category_name"
      id={`edit_Authors_image${data.row.id}`}
     
      className="form-control"
    />
  </FormGroup>
  </Form>
  )
}
if (type == "MasterCategory") {
 return( <Form>
  <FormGroup>
  
    <Label
      htmlFor="recipient-name"
      className="col-form-label"
    >
       Name<span className="text-danger">*</span>{" "}
      :
    </Label>
    <Input
      type="text"
      name="category_name"
      id={`edit_MasterCategory_name${data.row.id}`}
                            defaultValue={data.row.name}
      className="form-control"
    />
  </FormGroup>

</Form>)
}
    if (type == "faq") {
      return (
        <Form>
                        <FormGroup>
                        
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Question<span className="text-danger">*</span>{" "}
                            :
                          </Label>
                          <Input
                            type="text"
                            name="category_name"
                            id={`edit_faq_question${data.row.id}`}
                            defaultValue={data.row.question}
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                        
                        <Label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                         Answer<span className="text-danger">*</span>{" "}
                          :
                        </Label>
                        <Input
                          type="text"
                          name="category_name"
                          id={`edit_faq_answer${data.row.id}`}
                            defaultValue={data.row.answer}
                          className="form-control"
                        />
                      </FormGroup>
                      
                      </Form>
      );
    } 

    else if (type == "sub_category") {
      return (
        <Form>
          <FormGroup>
            <Dropdown
              id={`edit_sub_category_parent${data.row.id}`}
              isOpen={dropen}
              toggle={() => {
                setdropen(!dropen);
              }}
            >
              <DropdownToggle caret>{data.row.category}</DropdownToggle>
              <DropdownMenu>
                {categoryNames?.map((item, i) => (
                  <DropdownItem
                    value={item.id}
                    key={i}
                    onClick={() => {
                      selectDropDownVal(item.id, item.name);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Label htmlFor="recipient-name" className="col-form-label">
              Sub Category Name<span className="text-danger">*</span> :
            </Label>
            <Input
              type="text"
              defaultValue={data.row.SubCategory}
              id={`edit_sub_category_name${data.row.id}`}
              className="form-control"
            />
          </FormGroup>

          <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
            <Label className="d-block">
              <Input
                className="radio_animated"
                id="edo-ani1"
                type="radio"
                name={`rdo_stock${data.row.id}`}
                value={1}
              />
              Instock {"  "}
            </Label>
            <Label className="d-block" style={{ marginLeft: 20 }}>
              <Input
                className="radio_animated"
                id="edo-ani2"
                type="radio"
                name={`rdo_stock${data.row.id}`}
                value={0}
              />
              Out Of Stock
            </Label>
          </FormGroup>
        </Form>
      );
    } 
    
    else if (type == "stock") {
      return (
        <Form>
           <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
              Stock :
            </Label>

            <Input
              type="text"
              name="category_name"
              id={`edit_banner_title${data.row.id}`}
              defaultValue={data.row.stock}
              className="form-control"
            />
          </FormGroup>

       
        </Form>
      );
    } 
    else if (type == "banner") {
      return (
        <Form>
          <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
              Title :
            </Label>

            <Input
              type="text"
              name="category_name"
              id={`edit_banner_title${data.row.id}`}
              defaultValue={data.row.Title}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
              Sub Title :
            </Label>

            <Input
              type="text"
              name="sub_title"
              id={`edit_banner_sub_title${data.row.id}`}
              defaultValue={data.row.SubTitle}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="link" className="col-form-label">
              Link :
            </Label>
            <Input
              type="text"
              name="link"
              id={`edit_banner_link${data.row.id}`}
              defaultValue={data.row.link}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message-text" className="col-form-label">
              Banner Image :
            </Label>
            <Input
              className="form-control"
              id={`edit_banner_image${data.row.id}`}
              type="file"
              name="category_img"
            />
          </FormGroup>
          <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                           
                            <>Banner Mobile Video(mp4) / Image(1920 x 530px)</>
                           
                         
                          </Label>
                          <Input
                         
                            className="form-control"
                            id={`edit_banner_mobile_image${data.row.id}`}
                            type="file"
                            name="category_img2"
                          />
                        </FormGroup>
          <FormGroup className="m-checkbox-inline mb-3 custom-radio-ml d-flex radio-animated mt-3">
            <Label className="col-xl-3 col-sm-4 mb-0">Banner Type :</Label>
            <Label className="d-block">
              <Input
                className="radio_animated"
                id="edo-ani1"
                type="radio"
                name={`rdo_stock${data.row.id}`}
                value={
                  data.row.type === "Main"
                    ? "general"
                    : data.row.type === "Secondary"
                    ? "special"
                    : data.row.type === "Promo"
                    ? "coupon"
                    : null
                }
                checked={true}
              />
              {data.row.type}
            </Label>
            {/* {special < 1 && ( */}
            {/* <Label className="d-block" style={{ marginLeft: 20 }}>
              <Input
                className="radio_animated"
                id="edo-ani1"
                type="radio"
                name={`rdo_stock${data.row.id}`}
                value={"special"}
              />
              Secondary
            </Label> */}
            {/* )}
            {coupon < 2 && ( */}
            {/* <Label className="d-block" style={{ marginLeft: 20 }}>
              <Input
                className="radio_animated"
                id="edo-ani1"
                type="radio"
                name={`rdo_stock${data.row.id}`}
                value={"coupon"}
              />
              Promo {"  "}
            </Label> */}
            {/* )} */}
          </FormGroup>
        </Form>
      );
    } else if (tax) {
      return (
        <Form>
          <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
              Tax :
            </Label>
            <Input
              type="text"
              className="form-control"
              defaultValue={data.row.Tax}
              id={`edit_tax${data.row.id}`}
            />
          </FormGroup>
        </Form>
      );
    } else if (header) {
      return (
        <Form>
          <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
              header :
            </Label>
            <Input
              type="text"
              className="form-control"
              defaultValue={data.row.name}
              id={`edit_header${data.row.id}`}
            />
          </FormGroup>
        </Form>
      );
    } else if (size) {
      return (
        <Form>
          <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
              size :
            </Label>
            <Input
              type="text"
              className="form-control"
              defaultValue={data.row.size}
              id={`edit_size${data.row.id}`}
            />
          </FormGroup>
        </Form>
      );
    } else {
      return (
        <Form>
          <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
              Category Name :
            </Label>
            <Input type="text" className="form-control" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message-text" className="col-form-label">
              Category Image :
            </Label>
            <Input
              className="form-control"
              id="validationCustom02"
              type="file"
            />
          </FormGroup>
        </Form>
      );
    }
  };
  // ADD PRODUCT EDIT VARIATION MODAL
  const addvariationmodal__ = (index, colourlist) => {
    addvariationmodal(index);
  };

  // EDIT PRODUCT VARIATION MODAL
  const editvariationmodal = (id) => {
    variationmodal(id);
  };
  const onOpenModal2 = (id) => {
    modalsToggle[id] = true;
    setModalsToggle({ ...modalsToggle });
  };

  const onCloseModal2 = (id) => {
    modalsToggle[id] = false;
    setModalsToggle({ ...modalsToggle });
  };

  const updateForm = (id) => {
    if (type == "category") {
      let file_data = document.getElementById("edit_category_file" + id);
      if (
        document.getElementById("edit_category_name" + id).value === "" ||
        document.getElementById(`edit_category_head` + id).value === ""
      ) {
        toast.warning("Please Fill All the fileds");
        return;
      }
      let data = {
        id: id,
        file: file_data.files[0],
        name: document.getElementById("edit_category_name" + id).value,
        header: document.getElementById(`edit_category_head` + id).value,
      };
      updateItem(data);
      onCloseModal2(id);
    } else if (tax) {
      let data = {
        id: id,

        name: document.getElementById("edit_tax" + id).value,
      };
      updateItem(data);
      onCloseModal2(id);
    } else if (header) {
      let data = {
        id: id,

        name: document.getElementById("edit_header" + id).value,
      };
      updateItem(data);
      onCloseModal2(id);
    } else if (size) {
      let data = {
        id: id,

        name: document.getElementById("edit_size" + id).value,
      };
      updateItem(data);
      onCloseModal2(id);
    } else if (type == "sub_category") {
      let sub_name = document.getElementById(
        "edit_sub_category_name" + id
      ).value;
      let stock = document.getElementsByName("rdo_stock" + id);
      let selected_stock_val;
      for (let i = 0; i < stock.length; i++) {
        if (stock[i].checked) {
          selected_stock_val = stock[i].value;
        }
      }
      if (sub_name === "" || editParentId === "" || selected_stock_val === "") {
        toast.warning("Please Fill All Mandatary Field");
        return;
      }
      let data = {
        id: id,
        sub_name: sub_name,
        pid: editParentId,
        stock: selected_stock_val,
      };
      updateItem(data);
      onCloseModal2(id);
    } 
    else if(type=="MasterCategory"){
      let name = document.getElementById(
        "edit_MasterCategory_name" + id
      ).value;
      let data = {
        id: id,
      name
      };
      updateItem(data);
      onCloseModal2(id);
    }
    else if (type == "Authors") {
      let first_name = document.getElementById(
        "edit_Authors_firstName" + id
      ).value;
      let last_name = document.getElementById(
        "edit_Authors_lastName" + id
      ).value;
      let image = document.getElementById(
        "edit_Authors_image" + id
      ).files[0];
      let data = {
        id: id,
      last_name,first_name,image
      };
      updateItem(data);
      onCloseModal2(id);
    }
    else if (type == "faq") {
      let question = document.getElementById(
        "edit_faq_question" + id
      ).value;
      let answer = document.getElementById(
        "edit_faq_answer" + id
      ).value;
      let data = {
        id: id,
      question,answer
      };
      updateItem(data);
      onCloseModal2(id);
    }
    
    else if (type == "banner") {
      let title = document.getElementById("edit_banner_title" + id).value;
      let sub_title = document.getElementById(
        "edit_banner_sub_title" + id
      ).value;
      let link = document.getElementById("edit_banner_link" + id).value;
      let image = document.getElementById("edit_banner_image" + id);
      let imagemob = document.getElementById("edit_banner_mobile_image" + id);
      let stock = document.getElementsByName("rdo_stock" + id);
      let selected_stock_val;
      for (let i = 0; i < stock.length; i++) {
        if (stock[i].checked) {
          selected_stock_val = stock[i].value;
        }
      }
      let data = {
        id: id,
        title: title,
        sub_title: sub_title,
        link: link,
        image: image.files[0],
        type: selected_stock_val,
        imagemob: imagemob.files[0]

      };
      updateItem(data);
      onCloseModal2(id);
    }
  };

  const selectRow = (e, i) => {
    if (!e.target.checked) {
      setCheckedValues(checkedValues.filter((item, j) => i !== item));
    } else {
      checkedValues.push(i);
      setCheckedValues(checkedValues);
    }
  };

  const handleRemoveRow = () => {
    const updatedData = data.filter(function (el) {
      return checkedValues.indexOf(el.id) < 0;
    });
    setData([...updatedData]);
    toast.success("Successfully Deleted !");
  };

  const renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa",minWidth:"200px "}}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          // data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
          setData({ data: data });
        }}
        // dangerouslySetInnerHTML={{
        //   __html: data[cellInfo.index][cellInfo.index.id],
        // }}
      />
    );
  };

  const handleDelete = (id) => {
    let msg = "Are you sure you wish to delete this item?";
    if (type === "product" || type === "addproduct") {
      msg =
        "Are you sure you wish to delete this variation, this will also remove variation image " +
        (id + 1) +
        " ?";
    }
    if (window.confirm(msg)) {
      deleteItem(id);
    }
    // toast.success("Successfully Deleted !");
  };
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const columns = [];
  for (const key in data[0]) {
    let editable = renderEditable;
    let columnData=key;
    if (key === "image") {
      editable = null;
    }
    if (key === "status") {
      editable = null;
    }
    if (key === "avtar") {
      editable = null;
    }
    if (key === "vendor") {
      editable = null;
    }
    if (key === "order_status") {
      editable = null;
    }

    if (key == "id") {
      continue;
    }
    if (key == "search") {
      continue;
    }

    if (key == "is_active_coupon") {
      continue;
    }
    let width=null;
   if(key=="product_details"){
    width="250px"
    editable(key)}
    else if(key=="product_detail"){
      width="550px"
      editable(key)}
    columns.push({
      name: <b>{Capitalize(columnData.toString())}</b>,
      header: <b>{Capitalize(key.toString())}</b>,
       width:width,
      selector: (row) =>{ 
        console.log(row);
        return( row[key] !="undefined"&& row[key] !=null&&row[key] !=" "&&row[key] !="")?row[key]:""},
     
      Cell: editable,
      style: {
        textAlign: "center",
        minWidth:(key == "product_details"&&"250px"),
      },
    });
  }

  if (multiSelectOption === true && notaction == false) {
    columns.push({
      name: <b> Action</b>,
      id: "Action",
      accessor: (str) => "delete",
      cell: (row, i) => (
        <div key={i} style={{ display: "flex" }}>
          <button
            className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
            onClick={(e) => {
              if (ac == "Active") setac("Deactive");
              else setac("Active");
            }}
          >
            {ac}
          </button>
        </div>
      ),
      style: {
        textAlign: "center",
        display: "flex",
      },
      sortable: false,
    });
    columns.push({
      name: (
        <button
          className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
          onClick={(e) => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              handleRemoveRow();
          }}
        >
          Delete
        </button>
      ),
      id: "delete",
      accessor: (str) => "delete",
      cell: (row) => (
        <div>
          <span>
            <input
              type="checkbox"
              name={row.id}
              defaultChecked={checkedValues.includes(row.id)}
              onChange={(e) => selectRow(e, row.id)}
            />
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (type == "addproduct") {
    columns.splice(5, 3);

    columns.push({
      name: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      cell: (row, index) => (
        <div className="">
          {!onlyEdit && (
            <div className="d-flex align-items-center justify-content-center">
              <span onClick={() => addvariationmodal__(index)}>
                <i
                  className="fa fa-edit"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                    cursor: "pointer",
                  }}
                ></i>
              </span>
              <span
                onClick={() =>
                  noid ? handleDelete(index) : handleDelete(row.id)
                }
              >
                <i
                  className="fa fa-trash"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                    cursor: "pointer",
                  }}
                ></i>
              </span>
            </div>
          )}
          {withView && (
            <span>
              {" "}
              <i
                onClick={() => onOpenModal2(row.id)}
                className="fa fa-eye"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                  cursor: "pointer",
                }}
              ></i>
            </span>
          )}
          <span>
            {!onlyDelete && (
              <i
                onClick={() => onOpenModal2(row.id)}
                className="fa fa-pencil"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                  cursor: "pointer",
                }}
              ></i>
            )}

            {type == "listcoupon" && (
              <StateSelection
                open={modalsToggle[row.id]}
                id={row.id}
                data={list[index]}
                toggle={(id) => {
                  onCloseModal2(id);
                }}
              />
            )}
            {!withView && (
              <Modal
                key={"mdl" + row.id}
                isOpen={modalsToggle[row.id]}
                toggle={modalsToggle[row.id]}
              >
                <ModalHeader>
                  <h5
                    className="modal-title f-w-600"
                    id={"exampleModalLabel2" + index}
                  >
                    {type == "product" && "Edit Variation"}
                    {type == "category" && "Edit Category"}
                    {type == "sub_category" && "Edit Sub Category"}
                    {header && "Edit Header"}
                    {size && "Edit Size"}
                    {tax && "Edit Tax"}
                    {type == "banner" && "Edit Banner"}
                  </h5>
                </ModalHeader>
                <ModalBody>
                  <ModalForm row={row} index={index} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => updateForm(row.id)}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => onCloseModal2(row.id)}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            )}
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (type == "product") {
    columns.splice(0, 3);
    columns.push({
      name: <b>Image</b>,
      id: "image",
      accessor: (str) => "image",
      cell: (row, index) => (
        <div className="niru">
          <img src={row.image} width={50} height={50} />
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
    columns.push({
      name: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      cell: (row, index) => (
        <div className="niru">
          {!onlyEdit && (
            <div className="d-flex align-items-center justify-content-center">
              <span onClick={() => editvariationmodal(index)}>
                <i
                  className="fa fa-edit"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                    cursor: "pointer",
                  }}
                ></i>
              </span>
              <span
                onClick={() =>
                  noid ? handleDelete(index) : handleDelete(row.id)
                }
              >
                <i
                  className="fa fa-trash"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                    cursor: "pointer",
                  }}
                ></i>
              </span>
            </div>
          )}
          {withView && (
            <span>
              {" "}
              <i
                onClick={() => onOpenModal2(row.id)}
                className="fa fa-eye"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                  cursor: "pointer",
                }}
              ></i>
            </span>
          )}
          <span>
            {!onlyDelete && (
              <i
                onClick={() => onOpenModal2(row.id)}
                className="fa fa-pencil"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                  cursor: "pointer",
                }}
              ></i>
            )}

            {type == "listcoupon" && (
              <StateSelection
                open={modalsToggle[row.id]}
                id={row.id}
                data={list[index]}
                toggle={(id) => {
                  onCloseModal2(id);
                }}
              />
            )}
            {!withView && (
              <Modal
                key={"mdl" + row.id}
                isOpen={modalsToggle[row.id]}
                toggle={modalsToggle[row.id]}
              >
                <ModalHeader>
                  <h5
                    className="modal-title f-w-600"
                    id={"exampleModalLabel2" + index}
                  >
                    {type == "product" && "Edit Variation"}
                    {type == "category" && "Edit Category"}
                    {type == "sub_category" && "Edit Sub Category"}
                    {header && "Edit Header"}
                    {size && "Edit Size"}
                    {tax && "Edit Tax"}
                    {type == "banner" && "Edit Banner"}
                  </h5>
                </ModalHeader>
                <ModalBody>
                  <ModalForm row={row} index={index} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => updateForm(row.id)}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => onCloseModal2(row.id)}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            )}
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (withoutAction == true) {
  } else {

    if(type == "listcoupon"){

      columns.push({
        name: <b>Status</b>,
        cell: (row, index) => (
          <div key={index}>
            <select key={index} value={row.is_active_coupon} onChange={(e)=>changeStatus(row.id,e.target.value)}>
              <option value="1">Active</option>
              <option value="0">In-Active</option>
            </select>
          </div>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      })
    }

    // columns.push({
    //   name: <b>Link</b>,
    //   accessor: (str) => "link",
    //   selector: (row) => (
    //     <i
    //       onClick={() =>
    //         row.link === "null" ||
    //         row.link === "undefined" ||
    //         row.link === null ||
    //         row.link === undefined
    //           ? ""
    //           : nav(row.link)
    //       }
    //       className="fa fa-link"
    //       aria-hidden="true"
    //       style={{
    //         width: 35,
    //         fontSize: 20,
    //         padding: 11,
    //         color: "#e4566e",
    //         cursor: "pointer",
    //       }}
    //     ></i>
    //   ),
    //   style: {
    //     textAlign: "center",
    //   },
    //   sortable: false,
    // });
    columns.push({
      name: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      cell: (row, index) => (
        <div className="d-flex align-items-center justify-content-center">
          {!onlyEdit && (
            <div className="">
              {/* <span onClick={variationmodal}>
                <i
                  className="fa fa-edit"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                    cursor: "pointer",
                  }}
                ></i>
              </span> */}
              <span
                onClick={() =>
                  noid ? handleDelete(index) : handleDelete(row.id)
                }
              >
                <i
                  className="fa fa-trash"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                    cursor: "pointer",
                  }}
                ></i>
              </span>
            </div>
          )}
          {withView && (
            <span>
              {" "}
              <i
                onClick={() => onOpenModal2(row.id)}
                className="fa fa-eye"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                  cursor: "pointer",
                }}
              ></i>
            </span>
          )}
          <span>
            {!onlyDelete && (
              <i
                onClick={() => onOpenModal2(row.id)}
                className="fa fa-pencil"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(40, 167, 69)",
                  cursor: "pointer",
                }}
              ></i>
            )}

            {type == "listcoupon" && (
              <StateSelection
                open={modalsToggle[row.id]}
                id={row.id}
                data={list[index]}
                toggle={(id) => {
                  onCloseModal2(id);
                }}
              />
            )}
            {!withView && (
              <Modal
                key={"mdl" + row.id}
                isOpen={modalsToggle[row.id]}
                toggle={modalsToggle[row.id]}
              >
                <ModalHeader>
                  <h5
                    className="modal-title f-w-600"
                    id={"exampleModalLabel2" + index}
                  >
                    {type == "category" && "Edit Category"}
                    {type == "sub_category" && "Edit Sub Category"}
                    {header && "Edit Header"}
                    {size && "Edit Size"}
                    {tax && "Edit Tax"}
                    {type == "banner" && "Edit Banner"}
                  </h5>
                </ModalHeader>
                <ModalBody>
                  <ModalForm row={row} index={index} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => updateForm(row.id)}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => onCloseModal2(row.id)}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            )}
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  }
  return (
    <div>
      <Fragment>
        <DataTable
          data={data}
          columns={columns}
          notaction={false}
          className={myClass}
          pagination={pagination}
          striped={true}
          center={true}
        />

        <ToastContainer />
      </Fragment>
    </div>
  );
};

export default Datatable;
