import React, { useState, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { post } from "../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const LoginTabset = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };

  const routeChange = () => {
    history(`${process.env.PUBLIC_URL}/dashboard`);
  };

  const login = async () => {
    let data = { email: email, password: password };
    console.log(data);
    await post("admin/login", data).then((res) => {
      console.log(res);
      if (res.data.success) {
        localStorage.setItem("token", res.data.data.token);
        history(`${process.env.PUBLIC_URL}/dashboard`);
        toast.success("Successfully Logged In !");
      } else {
        console.log(
          "🚀 ~ file: loginTabset.js:27 ~ awaitpost ~ ̥:",
          res.data.message
        );
      }
    });
  };
  // ON ENTER SWITCH
  const onEnterFunction = (e) => {
    if (e.key === "Enter") {
      const inputs = Array.from(
        // Get table or tbody whatever that contains all inputs. The number of parentElements depends on the structure of your html
        e.currentTarget?.parentElement?.parentElement?.parentElement?.querySelectorAll(
          "input"
        ) ?? []
      ).filter((e) => !e.disabled);
      const index = inputs.indexOf(e.currentTarget);
      inputs[index + 1]?.focus();
      e.preventDefault();
    }
  };
  return (
    <div>
      <Fragment>
        <Tabs>
         

          <TabPanel>
            <Form className="form-horizontal auth-form0" >
              <FormGroup>
                <Input
                  required=""
                  name="login[username]"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Username"
                  id="exampleInputEmail1"
                  onKeyPress={(e) => {
                    onEnterFunction(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required=""
                  name="login[password]"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      login(e);
                    }
                  }}
                />
              </FormGroup>
              <div className="form-terms">
                <div className="custom-control custom-checkbox pl-0" style={{paddingLeft:0}}>
                  
                <div class="checkbox-wrapper-15">
  <input class="inp-cbx" id="cbx-15" type="checkbox" style={{display: "none"}}/>
  <label class="cbx" for="cbx-15">
    <span>
      <svg width="12px" height="9px" viewbox="0 0 12 9">
        <polyline points="1 5 4 8 11 1"></polyline>
      </svg>
    </span>
    <span style={{color:"white"}}>Remember Me</span>
  </label>
</div>



                   {" "}
                 
                </div>
              </div>
              <div className="form-button flex flex-direction-column justify-content-center align-items-center">
                <Button color="primary" onClick={() => login()}>
                  Login
                </Button>
              </div>
              <div style={{ height: 100 }}></div>
              {/* <div className="form-footer">
								<span>Or Login up with social platforms</span>
								<ul className="social">
									<li>
										<a href="/#">
											<i className="icon-google"></i>
										</a>
									</li>
									
								</ul>
							</div> */}
            </Form>
          </TabPanel>
          <TabPanel>
            <Form className="form-horizontal auth-form">
              <FormGroup>
                <Input
                  required=""
                  name="login[username]"
                  type="email"
                  className="form-control"
                  placeholder="Username"
                  id="exampleInputEmail12"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required=""
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required=""
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </FormGroup>
              <div className="form-terms">
                <div className="custom-control custom-checkbox me-sm-2">
                  <Label className="d-block">
                    <Input
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />
                    I agree all statements in{" "}
                    <span>
                      <a href="/#">Terms &amp; Conditions</a>
                    </span>
                  </Label>
                </div>
              </div>
              <div className="form-button">
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => routeChange()}
                >
                  Register
                </Button>
              </div>
              <div className="form-footer">
                <span>Or Sign up with social platforms</span>
                <ul className="social">
                  <li>
                    <a href="/#">
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-twitter-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-pinterest-alt"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </Form>
          </TabPanel>
        </Tabs>
      </Fragment>
    </div>
  );
};

export default LoginTabset;
