import React ,{ useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./signin.styles.css";
import { Form, Input, Button, Checkbox, Row , Col, Typography} from "antd";
import {useHistory}  from 'react-router';
import Axios from 'axios';



const Signin = () => {
 
 const [showError, setShowError] = useState(false)
 const [signing, setSigning] = useState(false)  

const history = useHistory();

 const handleLogin = (values) => {
    setSigning(true)
    Axios.post("/user/signin",{username:values.username,password:values.password}).then((resp)=>{
     if(resp.data)
     {
       setSigning(false)
       console.log(resp.data)
       localStorage.setItem('userData',JSON.stringify(resp.data));
       history.push("/student/registeredcourses");
      
     }
   

    }).catch(error => {
      setSigning(false)
      setShowError(true)
  })

  }

  return (
      <div className="custom">
       <Row  justify="center" align="middle"  style={{ minHeight: "20vh" }}> 
        <div className="top_text_one">
          <a>
            <font color="white" > SBBW UNIVERSITY PESHAWAR </font>
          </a>
        </div>
        </Row>
    <Row
      
      justify='center'
      style={{ minHeight: "80vh"}}
    >
         
        
        <Col style={{marginTop:'20px'}}>
        <img
            style={{marginTop:'50px'}}
          src="https://www.tutoreye.com/images/home/login-illus-1.svg"
            alt="bldg"
         />  
        </Col>
        <Col span={5}></Col>
        <Col style={{marginTop:'20px'}}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={handleLogin}
      >
       
        <div className="top_text">
          <a>
            <font color="white"> LOGIN </font>
          </a>
        </div>

        <div className="alignCenter_login">
          <a>
            <font color="white">REGESTRATION NO</font>
          </a>
        </div>
        <Form.Item
          name="username"
          className="username"
          rules={[
            {
              required: true,
              message: "Please Enter Regestration no."
            }
          ]}
        >
          <Input type="username" style={{ borderRadius: "10px" }} />
        </Form.Item>
        <div className="alignCenter_login">
          <a>
            <font color="white">PASSWORD</font>
          </a>
        </div>
        <Form.Item
          name="password"
          className="login-form-password"
          rules={[
            {
              required: true,
              message: "Please Enter Password"
            }
          ]}
        >
          <Input type="password" style={{ borderRadius: "10px" }} />
        </Form.Item>
        <Form.Item>
          <div className="alignCenter-checkbox">
            <Form.Item name="remember" valuePropName="unchecked" noStyle>
              <Checkbox> REMEMBER ME </Checkbox>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={signing}
          >
            LET ME IN!
          </Button>
         <div className="alignCenter-error">
          {showError 
          ?<Typography.Text type='danger' style={{fontWeight:'bold',fontSize:'18px',}}>Invalid Credentials !</Typography.Text>
          : null
        }
        </div>
        </Form.Item>
      </Form>
      </Col>
    </Row>
    </div>
  );
};

export default Signin
