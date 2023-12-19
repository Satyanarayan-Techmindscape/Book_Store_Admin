import React from 'react'
import pro23 from '../images/dashboard/product/20.jpg';
import pro1 from '../images/dashboard/product/19.jpg';
import pro18 from '../images/dashboard/product/18.jpg';
import pro21 from '../images/dashboard/product/17.jpg';
import pro3 from '../images/dashboard/product/16.jpg';
import tools20 from '../images/dashboard/product/15.jpg';
import pro14 from '../images/dashboard/product/14.jpg';
import pro20 from '../images/dashboard/product/13.jpg';
import pro19 from '../images/dashboard/product/12.jpg';
import jwel18 from '../images/dashboard/product/11.jpg';
import jwel12 from '../images/dashboard/product/10.jpg';
import jwel26 from '../images/dashboard/product/9.jpg';
import cat3 from '../images/dashboard/product/7.jpg';
import fashion12 from '../images/dashboard/product/6.jpg';
import shoes from '../images/dashboard/product/5.jpg';
import pro06 from '../images/dashboard/product/4.jpg';
import pro9 from '../images/dashboard/product/3.jpg';
import pro6 from '../images/dashboard/product/2.jpg';
import { Button } from 'reactstrap';
const d="in stock"
const data = [
    {
        // image: <img alt="" src={pro23} style={{width:50,height:50}} />,
        // product_name: "Steering Wheels",
        // price: "$46.00",
        status:    <Button
        type="button"
        color="primary"
        // onClick={onOpenModal}
        data-toggle="modal"
        data-original-title="test"
        data-target="#exampleModal"
      >
       {d}
      </Button>,
        category: "Electronics"
        ,SubCategory:"Light"

    },
]

export default data;

