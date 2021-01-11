import React, { useState } from 'react';
import { Layout, Menu,Divider,Row, Col,Typography,Dropdown,Card , Form, Input, Button, Upload, message,Spin } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {useHistory,} from 'react-router';
import axios from 'axios';
const { Content, } = Layout;
const { Title, Link ,Text} = Typography;


const Settings = () => {

  const[picloading, setPicLoading]= useState(false)
  const[imgUrl, setimgUrl]= useState()
  const [loading, setLoading] = useState(false);

  const history = useHistory();

    const onFinish = (values) => {
        setLoading(true);
        axios.post("/user/updateprofile", 
          values
        )
        .then(res => {
          setLoading(false);
          message.info(res.data.msg);
          localStorage.setItem('userData',JSON.stringify(res.data.user));
          history.push('/student/registeredcourses')
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
          // message.error(error);
        })

      };
      const Back = () => {
        console.log('in update');
      history.push('/student/registeredcourses')
      history.go()
    }
  
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

 
      function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      const uploadprops = {
        name: 'file',
        listType: "picture-card",
        action: '/user/profileupload',
        showUploadList: false,
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if(info.file.status === 'uploading'){
            setPicLoading(true)
            return
          }
           if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            getBase64(info.file.originFileObj, imageUrl =>{
              setimgUrl(imageUrl)
              setPicLoading(false)
            }
            );
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      }

return(
    <div style={{height:'90vh'}}>

<Content 
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding:'10px',
           
          borderRadius:'7px'
          
        }}
      >

        <Col>
        <Row justify='center'>
      <Title level={4}  style={{
          margin: '24px 16px',
          borderRadius:'7px'
          
        }}>Basic Profile </Title>
        </Row>
      <Divider/>
     <Spin spinning={loading}>
      <Form
      
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <Row justify='center'>

      
         <Form.Item
        style={{marginLeft:'20px'}}
        name="address"
        label='Address'
      >
        <Input  />
      </Form.Item>
     
         <Form.Item
        style={{marginLeft:'20px'}}
        name="email"
        label='Email'
      >
        <Input  />
      </Form.Item>
      

         <Form.Item
        style={{marginLeft:'20px'}}
        name="contact"
        label='Phone'
      >
        <Input />
      </Form.Item>
      </Row>
      <Row justify='center'>
    
         <Form.Item
        style={{marginLeft:'20px'}}
        name="description"
        label='About you'
      >
        <Input.TextArea rows={4} />
      </Form.Item>
     
        <Form.Item  name="file" label='Profile'  style={{marginLeft:'20px'}}>
        <Upload {...uploadprops}>
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> 
        : <div>
        {picloading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
         </div>}
        </Upload>
        </Form.Item>
     
        </Row>
      
        <Divider/>
        <Row justify='center'>
        <Button  type='primary' style={{marginLeft:'20px',marginBottom:'20px'}} htmlType="submit" >Save Settings</Button>
        <Button  type='primary' style={{marginLeft:'20px',marginBottom:'20px'}}  onClick={Back}> Back </Button>
        </Row>
      </Form>
      </Spin>
      
      </Col>
      
      </Content>
     
</div>
);

}

export default Settings;