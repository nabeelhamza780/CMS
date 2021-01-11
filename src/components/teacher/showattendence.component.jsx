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

const ShowAttendence = () => {

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
        title: 'Lecture',
        dataIndex: 'lecture',
        key: 'lecture',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
    
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
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

const handleSubmit = () =>{
    axios.post("/teacher/showattendence",{course:course, date:date}).then(res => {
        console.log(res.data);
            const data=res.data.map((res) => (
             {
             course:res.course,
             lecture:res.lecture,
             status:res.status,
             date:res.date,
             user: res.user,
          }
            ));
            setFiles(data);
         
          });
}
      const handleChange = (values) =>{
        setCourse(values)
              
    }

    function onDateChange(date, dateString) {
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
        Attendance 
        </Title>
        <Form onFinish={handleSubmit}>
          <Row justify='space-around'>
       
        <Select
        style={{textAlign: 'center',marginBottom:'20px'}}
         placeholder="Select Courses"
         onChange={handleChange}
         >
        {courses.map(d => (
        <Option key={d} value={d}>{d}</Option>
       ))}
         </Select>
         <Col>
         <DatePicker onChange={onDateChange} disabledDate={disabledDate}/>
         </Col>
         <Form.Item>
           <Button type="primary" htmlType="submit" style={{marginLeft:'100px'}}>
           Submit
           </Button>
          </Form.Item>
     </Row>
     </Form>

         <Table dataSource={files} columns={columns} size={5}/>
   
        </Col>

    </Row>



</div>
)

    }
export default ShowAttendence;