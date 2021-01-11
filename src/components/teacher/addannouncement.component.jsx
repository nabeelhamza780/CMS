import React, {useState,useEffect} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber } from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';

const { Option } = Select;
const {Title} = Typography;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Addannouncement = () => {

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let mounted = true
  axios.get("/teacher/teachercourses").then(res => {
    if (mounted) 
    {
      const data=res.data.map((res) => (
       res.coursename
      ));
      console.log(data);
      setCourses(data)
    }
    
    });
   
    return function cleanup() {
      mounted = false
  
  }

  },[]);

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    axios.post("/teacher/add-announcement", 
      values
    )
    .then(res => {
      setLoading(false);
      
      message.info(res.data.msg);
      history.push('/teacher/teacherhome');
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
            Add Announcement
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item name="course" label="Course"
            rules={[
              {
                required: true,
                message: 'Please Select a Course',
               
              }
            ]}
            >
                     <Select
                     placeholder="Select Course"
         
                      >
        {courses.map(d => (
        <Option key={d} value={d}>{d}</Option>
       ))}
         </Select>
            </Form.Item>

            <Form.Item name="title" label="Title" 
            rules={[
              {
                required: true,
                message: 'Please input Title',
                
              }
            ]}
            >
              <Input placeholder="Please Enter Title" />
            </Form.Item>

            <Form.Item name="description" label="Description" 
            rules={[
              {
                required: true,
                message: 'Please input Description',
                
              }
            ]}
            >
              <TextArea rows={4} placeholder="Please Enter Description" />
            </Form.Item>
 
            <div style={{textAlign: "right"}}>
            <Button type="primary" loading={loading} htmlType="submit">
              Save
            </Button>{' '}
            <Button type="danger" htmlType="button" onClick={() => history.push('/teacher/teacherhome')}>
              Back
            </Button>
              </div>
          </Form>
          </Col>
        </Row>
    </div>
  );
}

export default Addannouncement;
