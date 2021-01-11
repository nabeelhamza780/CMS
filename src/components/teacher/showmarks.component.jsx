import React, {useEffect, useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber,Upload,Divider,Table,DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';

const {Title} = Typography;

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ShowMarks = () => {

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState();
    const history = useHistory();
    const [course, setCourse] = useState();
    const [type, setType]=useState();
    const columns = [
      {
        title: 'Student',
        dataIndex: 'user',
        key: 'user',
      },
     
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
    
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Obtained Marks',
        dataIndex: 'obtainedmarks',
        key: 'obtainedmarks',
      },
      {
        title: 'Total Marks',
        dataIndex: 'totalmarks',
        key: 'totalmarks',
      },
      
    ];


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
      


      const handleSbmit = (value) =>{
          console.log(value.course);
        axios.post("/teacher/showmarks",{course:value.course,type:value.type,date:date}).then(res => {
            console.log(res.data);
                const data=res.data.map((res) => (
                 {
                 course:res.course,
                 details:res.details,
                 type:res.type,
                 date:res.date,
                 user: res.user,
                 obtainedmarks:res.obtainedmarks,
                 totalmarks:res.totalmarks,
                 
              }
                ));
                setFiles(data);
             
              });
              
    }
    function onDateChange(date, dateString) {
        console.log(dateString);
        setDate(dateString)
      }
      function disabledDate(current) {
        
        return current && current > moment().endOf('day');
      }


return(
    <div>

    <Row gutter={[40, 0]}>
      <Col style={{textAlign: 'center'}} span={23}>
      <Title style={{textAlign: 'center'}} level={2}>
        Attendence 
        </Title>
        <Form onFinish={handleSbmit}>
          <Row justify='space-around'>
          
          <Form.Item name='course' label='Select Course' rules={[
          {
            required: true,
            message: 'Please select Course',
          },
        ]}>
        <Select
        style={{textAlign: 'center',marginBottom:'20px'}}
         placeholder="Select Courses"
         >
        {courses.map(d => (
        <Option key={d} value={d}>{d}</Option>
       ))}
         </Select>
         </Form.Item>


         <Col>
         <Form.Item name='date' label='Pick a Date' rules={[
          {
            required: true,
            message: 'Please select date',
          },
        ]}>
         <DatePicker onChange={onDateChange} disabledDate={disabledDate}/>
         </Form.Item>
         </Col>




         <Form.Item name='type' label='Select Type'  rules={[
          {
            required: true,
            message: 'Please Select Type',
          },
        ]}>
         <Select
         placeholder="Select Type"         
         >
       
        <Option key='quiz' value='Quiz'>Quiz</Option>
        <Option key='assignment'value='Assignment'>Assignment</Option>
        <Option key='sessional' value='Sessional'>Sessional</Option>
      
         </Select>
         </Form.Item>



         <Form.Item>
           <Button type="primary" htmlType="submit" style={{marginLeft:'100px'}}>
           Submit
           </Button>
          </Form.Item>
      
     </Row>   </Form>


         <Table dataSource={files} columns={columns} size={5}/>
   
        </Col>

    </Row>



</div>
)

    }
export default ShowMarks;