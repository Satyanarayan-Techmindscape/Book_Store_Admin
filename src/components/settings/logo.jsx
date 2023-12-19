import { Fragment, useContext } from "react";


import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";
import React, { useEffect, useState } from "react";

import { Input, Table } from "reactstrap";
import { get, post, put } from "../../services/apiHandler";

import { AuthContext } from "../../hooks/AuthContextProvider";
import { toast } from "react-toastify";

const Logo = () => {
  const context = useContext(AuthContext);

  const [input, setInput] = useState({
 
    avatar: null,
    img:""
  
  });
  const [logo, setLogo] = useState({});
  const getSiteData = async () => {
    const response = await get(`api/site-data`);
    return response.data;
  };
  const setLogofun=async()=>{
    let logoimg= await getSiteData();
    console.log("logo",logoimg);
    setLogo(logoimg.data.logo)
  }
  useEffect(() => {
   setLogofun()},[])
  const setInputChange = (data, param) => {
    input[param] = data;
    setInput({ ...input });
  };

 
  const Submit = async () => {
    
  
   
    let payload_data1 = new FormData();
  
    payload_data1.append("logo", input.avatar);

   const res= await post("api/site-data/1",payload_data1)
   
   if (res.data.message=="Logo uploaded successfully") {
    toast.success("Logo uploaded successfully");
    window.location.reload()
  
  };
  }
  return (
    <Fragment>
      <Breadcrumb title="Set Logo" parent="Settings" />
      <Container fluid={true} style={{margin:"auto"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
          <div xl="1" style={{margin:"auto"}}>
            <Card style={{maxWidth:"500px"}}>
              <CardBody>
                { console.log(input.img)}
                <div className="profile-details text-center">
                  <img
                    src={
                      input.img != "" 
                        ?input.img
                        : "https://yrpitsolutions.com/Bookstore_API/"+logo
                    }
                    alt=""
                    width={100}
                    height={100}
                    className="  blur-up lazyloaded"
                  />
                  <h5 className="f-w-600  f-16 ">Book Store</h5>
                  <Input
                                      onChange={(e) =>
                                      {
                                        console.log( URL.createObjectURL(e.target.files[0]));
                                        
                                        setInputChange(
                                       e.target.files[0],
                                          "avatar"
                                        )
                                        setInputChange(
                                          URL.createObjectURL(e.target.files[0]),
                                             "img"
                                           )}
                                      }
                                      className="form-control"
                                      id="validationCustom02"
                                      type="file"
                                      name="category_img"
                                    />
                                     <div className=" mt-2">
                                      <Button
                                        type="button"
                                        color="primary"
                                        onClick={() => Submit()}
                                      >
                                        Save
                                      </Button>
                                    </div>
                </div>
              </CardBody>
            </Card>
          </div>
       
        </div>
      </Container>
    </Fragment>
  );
};

export default Logo
