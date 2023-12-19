
import { Button, Dropdown, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MultipleStateCitySelector from "./multipleCity";
import Statecity from "./Statecity";
const AddCityModal = (props) => {
return <Modal isOpen={props.open} toggle={props.onCloseModal} style={{width:1900}}>
<ModalHeader toggle={props.onCloseModal}>
  <h5
    className="modal-title f-w-600"
    id="exampleModalLabel2"
  >
    Add State&Cities
  </h5>
</ModalHeader>
<ModalBody>
<Statecity/>
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
<ModalFooter>
  <Button
    type="button"
    color="primary"
    onClick={() => props.onCloseModal("VaryingMdo")}
  >
    Save
  </Button>
  <Button
    type="button"
    color="secondary"
    onClick={() => props.onCloseModal("VaryingMdo")}
  >
    Close
  </Button>
</ModalFooter>
</Modal>
};

export default AddCityModal;