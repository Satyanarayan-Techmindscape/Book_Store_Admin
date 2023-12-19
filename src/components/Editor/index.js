import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';


import { Button, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { get, post } from '../../services/apiHandler';
import jsxToString from 'jsx-to-string';
import { toast } from 'react-toastify';
export default function Editor(props) {
    const [data,setData]=useState("")
    const submit=async()=>{
        console.log(props.keyData);
        console.log(data);
        const key=props.keyData
     
          const fd=new FormData()
          fd.append(key,data)
         
const res=await post(props.url,fd)
toast.success("Updated Successfuly !")
console.log(res);
    }
   const getData=async()=>{
    let url="api/about-tnc"
    if(props.api=="siteData"){
url="api/site-data"
    }
      const cdata=await get(url)
      setData(cdata.data.data[props.keyData])
      console.log("tnc",cdata.data.data[props.keyData]);}
    useEffect(()=>{
    getData()
    },[])
    return <>
      {props.onlyText? <Input
                                      value={data}
                                      onChange={(e) =>
                                        setData(
                                          e.target.value,
                                        
                                        )
                                      }
                                      className="form-control"
                                      id="validationCustom02"
                                      type="input"
                                      name="category_img"
                                    />: 
                                    
                                    
                                    <CKEditor
                                    editor={ ClassicEditor }
                                    data={data}
                                    onReady={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        console.log( { event, editor, data } );
                                        setData(data)
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />
                                    
                                    }
<div className="float-right mt-4">
           <Button
                                        type="button"
                                        color="primary"
                                        onClick={() => submit()}
                                      >
                                        Save
                                      </Button></div>
    </>
}