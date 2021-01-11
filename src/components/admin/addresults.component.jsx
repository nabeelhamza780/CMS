import React, {useEffect, useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber,Space,Divider } from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';
import {
    MinusCircleOutlined,
    PlusOutlined
   
    } from '@ant-design/icons';

const {Title,Text} = Typography;

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddResults = () => {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  //
  const [selectOptions, setSelectOptions] = useState([]);
  const [result, setResult] = useState([]);
  const history = useHistory();

 

  const handleChange = (values) => {
    console.log('onChange',values);
    axios.post("/admin/getresultofstudent", 
    {user:values}
  )
  .then(res => {
    setLoading(false);
    console.log(res.data);
   setResult(res.data)
  
  
  })
  }

  const onSemesterChange = (value)=>{
    axios.post("/user/students-by-semester",{semester:value}).then(res => {
        const data=res.data.map((res) => (
          {name:res.fullname,
          regno:res.regno}
          
         ));
         setUsers(data)
         console.log(data);
      });
  }

  const handleSubmit = (values) => {
    console.log(values);
    setLoading(true);
    axios.post("/admin/addresult", 
      values
    )
    .then(res => {
      setLoading(false);
      
      message.info(res.data.msg);
      history.push('/admin/responselist');
    })
    .catch(error => {
      setLoading(false);
      console.log(error);
      message.error('Some thing Went Wrong');
    })
  }
  
  return (
  
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Add Results
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>




          <Form {...layout} onFinish={handleSubmit}>
          <Form.Item name="semester" label="Semester" 
            rules={[
              {
                required: true,
                message: 'Please enter semester',
                
              }
            ]}
            >
             <Select
         placeholder="Select Semester"
         onChange={(val)=>onSemesterChange(val)}
         >
        <Option key={1} value={1}>{1}</Option>
        <Option key={2} value={2}>{2}</Option>
        <Option key={3} value={3}>{3}</Option>
        <Option key={4} value={4}>{4}</Option>
        <Option key={5} value={5}>{5}</Option>
        <Option key={6} value={6}>{6}</Option>
        <Option key={7} value={7}>{7}</Option>
        <Option key={8} value={8}>{8}</Option>

         </Select>
            </Form.Item>
            <Form.Item name="user" label="Student"
            rules={[
              {
                required: true,
                message: 'Please select student',
              }
            ]}
            >
             <Select
             placeholder="Select Student"
             onChange={handleChange}
             >
            {users.map(d => (
            <Option key={d} value={d.name}>{d.name+"  __  "+d.regno}</Option>
           ))}
             </Select>
            </Form.Item>

            <Form.Item name="cgpa" label="CGPA" 
            rules={[
              {
                required: true,
                message: 'Please enter CGPA',
                
              }
            ]}
            >
              <Input placeholder="Please Enter CGPA" />
            </Form.Item>

            <Form.List name="courses">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex',justifyContent:'center',alignItems:'center', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'course']}
                  fieldKey={[field.fieldKey, 'course']}
                  rules={[{ required: true, message: 'Missing course' }]}
                >
                  <Input placeholder="Course" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'gpa']}
                  fieldKey={[field.fieldKey, 'gpa']}
                  rules={[{ required: true, message: 'Missing gpa' }]}
                >
                  <Input placeholder="GPA" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
             <div style={{textAlign: "right",marginBottom:'50px'}}>
              <Button type="dashed" onClick={() => add()}  icon={<PlusOutlined />}>
                Add course result
              </Button>
              </div>
          </>
        )}
      </Form.List>


            

       
        

           
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
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Results
            </Title>
            {result.length
            ?<div>
          <Row style={{textAlign: 'center'}}>
            <Col span={8}>
              <Title level={4}>Name</Title>
              <Text>
                {result[0].user}
              </Text>
              
            </Col>
            <Col span={8}>
            <Title level={4}>Semester</Title>
              <Text>
                {result[0].semester}
              </Text>
            </Col>
            <Col span={8}>
            <Title level={4}>CGPA</Title>
              <Text>
                {result[0].cgpa}
              </Text>
            </Col>
          </Row>
          <Divider orientation="Center">Grade in All Courses</Divider>
          <Row style={{textAlign: 'center'}}>
            <Col span={12}>
              <Text style={{fontSize:'16px',fontWeight:'bold'}}>
                Courses
              </Text>
              
            </Col>
            <Col span={12}>
              <Text style={{fontSize:'16px',fontWeight:'bold'}}>
              GPA
              </Text>
              
            </Col>
        
          </Row>
          {result[0].courses.map(d => (
            <Row style={{textAlign: 'center'}}>
            <Col span={12}>
              <Text>
                
                {d.course}
              </Text>
              
            </Col>
            <Col span={12}>
              <Text>
              
                {d.gpa}
              </Text>
              
            </Col>
        
          </Row>

           ))}
          

            </div>
            :null
}
            </Col>
        </Row>
    </div>
  );
}

export default AddResults;
