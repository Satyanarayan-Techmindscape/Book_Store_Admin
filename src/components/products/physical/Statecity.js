
import { useState } from 'react';

import { Form,FormGroup, Label } from 'reactstrap'

import './css/style.css'


export default function Statecity(props) {
  




    return <div className="container-l">
        <div className="left">
        
        <ul style={{listStyleType: 'square'}}>
	
          {props.cat_data?.map((val,i)=>{
            
            return <li> 
              <Form>
            <FormGroup
              check
              inline
            >
               <Label check>
              {val.name}
              </Label>
              
             
            </FormGroup>
            </Form>
            </li>
          })}
     </ul>

        </div>
        {/* <div className="right">
        {/* <Form>
  <FormGroup
    check
    inline
  >
     <Label check>
     All city
    </Label>
    <Input type="checkbox" />
   
  </FormGroup>
 </Form> */}
 <Form>
 {/* {sc.map((val)=>{
return <>
<h4>{states[val].name}</h4>
<br />
  {states[val].cities.map((ch,i)=>{
   return<> {ch.toUpperCase().indexOf(searchbarval)!=-1&&<FormGroup
     check
     inline
   >
      <Label check>
     {ch}
     </Label>
     <Input type="checkbox" />
    
   </FormGroup>}</>

  })}
  <br />
  <hr />
  </>

 })} */}
</Form>
        </div> 
   
}