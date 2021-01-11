import React, {useEffect, useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber } from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';


const {Title} = Typography;

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AssignTeacher = () => {

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let mounted = true
  axios.get("/admin/courses").then(res => {
    if (mounted) 
    {
      
      const data=res.data.map((res) => (
       res.coursename
      ));
      console.log(data);
      setCourses(data)
    }
    
    });
    axios.get("/user/allteachers").then(res => {
        if (mounted) 
        {
          const data=res.data.map((res) => (
            res.fullname
           ));
           console.log(data);
           setUsers(data)
        }
        });
        
    return function cleanup() {
      mounted = false
  
  }

  },[]);

  const handleSubmit = (values) => {
    console.log(values);
    setLoading(true);
    axios.post("/admin/assignteacher", 
      values
    )
    .then(res => {
      setLoading(false);
      
      message.info(res.data.msg);
      history.push('/admin/allcourses');
    })
    .catch(error => {
      setLoading(false);
      message.error(error);
    })
  }
  
  return (
  
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Assign Teacher
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>




          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item name="course" label="Courses"
            rules={[
              {
                required: true,
                message: 'Please select Course',
              }
            ]}
            >
             <Select
             placeholder="Select Courses"
             >
            {courses.map(d => (
            <Option key={d} value={d}>{d}</Option>
           ))}
             </Select>
            </Form.Item>

              

            <Form.Item name="teacher" label="Teachers"
            rules={[
              {
                required: true,
                message: 'Please select Teacher',
              }
            ]}
            >
             <Select
             placeholder="Select Teacher"
             >
            {users.map(d => (
            <Option key={d} value={d}>{d}</Option>
           ))}
             </Select>
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

export default AssignTeacher;
