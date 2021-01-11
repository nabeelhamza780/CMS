import React, {useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, message, } from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';


const {Title} = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Adduser = () => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('')
  const history = useHistory();

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    let userdata;
    if(values.type === 'user'){
      userdata = {
        ...values,
        username:values.regno
      }
    }
    else{
      userdata=values
    }
   
    axios.post("/admin/adduser", 
    userdata
    )
    .then(res => {
      setLoading(false);
      
      message.info(res.data.msg);
      history.push('/admin/allusers');
    })
    .catch(error => {
      setLoading(false);
      message.error(error);
    })
  }
  const handleTypeChange=(val)=>{
    console.log(val.target.value);
    setUser(val.target.value)
 
 
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
           Add user
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            {user === 'teacher' || user === 'admin'
            ?<Form.Item name="username" label="Username"
            rules={[
              {
                required: true,
                message: 'Please input username',
                
              }
            ]}
            >
               <Input placeholder="Please Enter username " />
            </Form.Item> : null
            }
            <Form.Item name="fullname" label="Fullname" 
            rules={[
              {
                required: true,
                message: 'Please input Fullname',
                
              }
            ]}
            >
              <Input placeholder="Please Enter Fullname" />
            </Form.Item>

            <Form.Item name="email" label="Email" 
            rules={[
              {
                required: true,
                message: 'Please enter Email',
               
              }
            ]}
            >
              <Input placeholder="Please Enter Email" />
            </Form.Item>

            <Form.Item name="password" label="Password" 
            rules={[
              {
                required: true,
                message: 'Please enter password',
                
              }
            ]}
            >
              <Input placeholder="Please Enter password" />
            </Form.Item>

            <Form.Item name="type" label="Type" 
            rules={[
              {
                required: true,
                message: 'Please select Type',
              }
            ]}
            >
              <Radio.Group onChange={(val)=>{handleTypeChange(val)}}>
                <Radio value="user">Student</Radio>
                <Radio value="admin">Admin</Radio>
                <Radio value="teacher">Teacher</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="contact" label="Contact" 
            rules={[
              {
                required: true,
                message: 'Please input contact',
                
              }
            ]}
            >
              <Input placeholder="Please Enter Contact" />
            </Form.Item>

            <Form.Item name="address" label="Address" 
            rules={[
              {
                required: true,
                message: 'Please input Address',
                
              }
            ]}
            >
              <Input placeholder="Please Enter Address" />
            </Form.Item>
          {user === 'user'
           ?<div>
           <Form.Item name="regno" label="Regestration" 
            rules={[
              {
                required: true,
                message: 'Please input Regestration Number',
                
              }
            ]}
            >
              <Input placeholder="Please Enter Regestration no." />
            </Form.Item>

            <Form.Item name="semester" label="Semester" 
            rules={[
              {
                required: true,
                message: 'Please input Semester',
                
              }
            ]}
            >
              <Input placeholder="Please Enter Semester" />
            </Form.Item>
            </div> : null}
           
            <div style={{textAlign: "right"}}>
            <Button type="primary" loading={loading} htmlType="submit">
              Save
            </Button>{' '}
            <Button type="danger" htmlType="button" onClick={() => history.push('/admin/responselist')}>
              Back
            </Button>
              </div>
          </Form>
          </Col>
        </Row>
    </div>
  );
}

export default Adduser;
