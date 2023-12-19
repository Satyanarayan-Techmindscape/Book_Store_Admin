import brandLogo from "./assets/img/img/loungeWearLogo.png";
import "./App.css";
import './index.css'
import { Download } from "react-feather";
function App(props) {
  return (
    <>
    <div className="run"  style={{cursor:'pointer'}} onClick={()=>props.pdfgen()}>{<Download/>}</div>
    <div className="p-t ">
     <div id="pdf" >
      <div class="invoice_container ">
        <div class="invoice_header">
          <div class="logo_container"  style={{ lineHeight: "2vw" }}>
            <img src={brandLogo} />
          </div>
          <div class="company_address">
            <h1 className="h1">Book Store Invoice</h1>
            <div className="invoice_detail flex just-ard alig-cntr">
              <div className="invoice_title">
                Invoice No. <br />
                Invoice Date <br />
                Invoice Due <br />
              </div>
              <div className="invoice_details">
                000001 <br />
                March, 20 2023 <br />
                March, 30 2023 <br />
              </div>
            </div>
          </div>
        </div>
        <div class="customer_container">
          <div>
            <h4 className="h4">From</h4>
            <h1 className="h1">Prajna LoungeWear</h1>
            <p className="p" style={{ lineHeight: "2vw" }}>
              Shop No-4, fazal compound, singh Estate Road no.4,
              <br />
              Samata Nagar, Kandivali(e),
              <br /> Mumbai-400 101 <br />
              Phone: 7400456342
              <br />
              Email: Prajna.Online@gmail.com
            </p>
          </div>
          <div class="in_details">
            <div className="addd">
              <h4 className="h4" style={{ marginBottom: "2vw" }}>Bill To</h4>
              <h2 className="h2">{props.name}</h2>
              <p className="p">
               {props.Baddress?.address}<br/>
               {props.Baddress?.address_line_2}
               {props.Baddress?.postal_code}
              </p>
            </div>
            {/* <div className="addd">
              <h4 className="h4" style={{ marginBottom: "2vw" }}>Ship To</h4>
              <p className="p">
              {props.Saddress?.address}<br/>
               {props.Saddress?.address_line_2}
               {props.Saddress?.postal_code}
              </p>
            </div> */}
          </div>
        </div>
        <div class="product_container">
          <table class="item_table" border="1" cellspacing="0">
            <tr>
              <th>Description</th>
              <th>Rate CADA</th>
              <th>Qty</th>
              <th>Tax</th>
              <th>DISC</th>
              <th>Total</th>
            </tr>
          
           {props.order?.map((data)=>{
            let order=data
            data=data.product_variation

            return   <tr>
            <td className="td">{data.product_name}</td>
            <td className="td">{data.price}</td>
            <td className="td">{order.cart_quantity}</td>
            <td className="td">{data.product_tax}%</td>
            <td className="td">{data.product_discount}%</td>
            <td className="td">{order.cart_price_with_discount}</td>
          </tr>
           })}
          </table>
        </div>
        <div class="payment_container">
          <div>
            <h2 className="h2">Payment Instructions</h2>
            <p className="p">
              Paypal Email: <br />
              xyz@example.com <br />
            </p>
            <p className="p">
              Make Checks Payable to <br />
              john Smith <br />
            </p>
            <p className="p">
              Bank Transfer <br />
              Routing (ABA) 907654467 <br />
            </p>
          </div>
          <table
            class="item_table_subtotal"
            border="1"
            cellspacing="0"
            cellpadding="5"
          >
            <tr>
              <td className="td">SubTotal</td>
              <td className="td">Rs.  80000</td>
            </tr>
            <tr>
              <td className="td">Discount(20%)</td>
              <td className="td">20%</td>
            </tr>
            <tr>
              <td className="td">Shopping Cost</td>
              <td className="td">Rs.  800</td>
            </tr>
            <tr>
              <td className="td">Sales Tax</td>
              <td className="td">10%</td>
            </tr>
            <tr>
              <td className="td">Total</td>
              <td className="td">Rs.  80000</td>
            </tr>
            <tr>
              <td className="td">Amount Paid</td>
              <td className="td">Rs.  60000</td>
            </tr>
            <tr>
              <td className="td">Balance Due</td>
              <td className="td">Rs.  5000</td>
            </tr>
          </table>

          {/* <div className="invoice_summary flex just-btwn alig-cntr">
            <div className="invoice_sum_title">
              <span>SubTotal</span> <br />
              <span>Discount(20%)</span> <br />
              <span>Shopping Cost</span> <br />
              <span>Sales Tax</span> <br />
              <span>Total</span> <br />
              <span>Amount Paid</span> <br />
              <span>Balance Due</span>
            </div>
            <div className="invoice_sum_details">
              <span>Rs.  80000</span> <br />
              <span>20%</span> <br />
              <span>Rs.  800</span> <br />
              <span>10%</span> <br />
              <span>Rs.  80000</span> <br />
              <span>Rs.  60000</span> <br />
              <span>Rs.  560000</span> <br />
            </div>
          </div> */}
        </div>
        <div class="invoice_footer">
          <div class="note">
            <h2 className="h2">Thank You!</h2>
            <hr />
            <h3 style={{ fontSize: "2vw" }}>
              *** This is System Generated Bill ***
            </h3>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default App;
