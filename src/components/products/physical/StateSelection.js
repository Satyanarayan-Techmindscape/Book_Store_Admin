import { Button, Dropdown, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MultipleStateCitySelector from "./multipleCity";
import Statecity from "./Statecity";
import { useState } from "react";
export default function StateSelection(props) {

const [data,setdata]=useState(props.data.categories.length>0?props.data.categories:props.data.products)

    return<>
    <Modal isOpen={props.open} toggle={()=>{props.toggle(props.id)}}>
<ModalHeader toggle={()=>{props.toggle(props.id)}} >
  <h5
    className="modal-title f-w-600"
    id="exampleModalLabel2"
  >
   {props.data?.categories.length>0?"SubCategories":"Products" }
  </h5>
</ModalHeader>
<ModalBody>

<Statecity cat_data={data}/>
  <Form>
   
   
      {/* <Label
        htmlFor="message-text"
        className="col-form-label"
      >
        Sub Category Image :
      </Label> */}
      {/* <Input
        className="form-control"
        id="validationCustom02"
        type="file"
      /> */}
      
     
  
  </Form>
</ModalBody>

</Modal>
    </>
}