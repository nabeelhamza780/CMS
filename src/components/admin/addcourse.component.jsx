import React, {useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber } from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';

const { Option } = Select;
const {Title} = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Addcourse = () => {

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (values) => {
    setLoading(true);
    axios.post("/admin/addcourse", 
      values
    )
    .then(res => {
      setLoading(false);
      
      message.info(res.data.msg);
      history.push('/admin/addcourse');
    })
    .catch(error => {
      setLoading(false);
      message.error('error');
    })
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Add a Course
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item name="courseno" label="Course Code"
            rules={[
              {
                required: true,
                message: 'Please input response Course Code',
               
              }
            ]}
            >
                 <Input placeholder="Please Enter coursecode" />
            </Form.Item>

            <Form.Item name="coursename" label="Course Name" 
            rules={[
              {
                required: true,
                message: 'Please input coursename',
                
              }
            ]}
            >
              <Input placeholder="Please Enter coursename" />
            </Form.Item>

            <Form.Item name="courseDescription" label="Course Description" 
            rules={[
              {
                required: true,
                message: 'Please input courseDescription',
                
              }
            ]}
            >
              <Input placeholder="Please Enter courseDescription" />
            </Form.Item>


            

            <Form.Item name="courseCreditHours" label="Course CreditHours" 
            rules={[
              {
                required: true,
                message: 'Please enter courseCreditHours',
               
              }
            ]}
            >
             <Select
            placeholder='Select Credit hours'>
              <Option key='2' value='2'>2</Option>
              <Option key='3' value='3'>3</Option>
              <Option key='4' value='4'>4</Option>
              <Option key='3+1' value='3+1'>3+1</Option>
              <Option key='2+1' value='2+1'>2+1</Option>
             </Select>
            </Form.Item>

            <Form.Item name="coursePrerequisites" label="Course Prerequisites" 
            rules={[
              {
                required: true,
                message: 'Please enter coursePrerequisites',
               
              }
            ]}
            >
               <Input placeholder="Please Enter coursePrerequisites" />
            </Form.Item>

            <Form.Item name="coursetype" label="Course Type" 
            rules={[
              {
                required: true,
                message: 'Please enter coursetype',
                
              }
            ]}
            >
              <Radio.Group>
                <Radio value="elective">Elective</Radio>
                <Radio value="compulsory">Compulsory</Radio>
                
              </Radio.Group>
            </Form.Item>

        

           
            <div style={{textAlign: "right"}}>
            <Button type="primary" loading={loading} htmlType="submit">
              Save
            </Button>{' '}
            <Button type="danger" htmlType="button" onClick={() => history.push('/admin/allcourses')}>
              Back
            </Button>
              </div>
          </Form>
          </Col>
        </Row>
    </div>
  );
}

export default Addcourse;
