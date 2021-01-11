import React, {useEffect, useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber,Upload,Divider,Table,DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';

const {Title, Text} = Typography;

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Attendence = () => {

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState();
    const [date, setDate] = useState();
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const [lecture, setLecture]= useState();
    const [showRow, setShowRow] = useState(true)


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

     const onFinish =(value)=>{
      setLecture(value.lecture)
      setShowRow(false)
     }
     const handleBack = () => {
      setShowRow(true)
     }

     const handleDone = () => {
      history.push('/teacher/teacherhome')
     }
     
     const onPresent = (values)=>{
        
        if(date){
          axios.post("/teacher/markattendence", 
         {course:values.coursename, user:values.student, date:date, status:'present', lecture:lecture}
        )
        .then(res => {
          setLoading(false);
          message.info(res.data.msg);
          
         
        })
        .catch(error => {
          setLoading(false);
          message.error(error);
        })
      }
      else
      message.info("Please Select Date");
     }

     const onAbsent = (values)=>{
        
      if(date){
        axios.post("/teacher/markattendence", 
       {course:values.coursename, user:values.student, date:date, status:'absent', lecture:lecture}
      )
      .then(res => {
        setLoading(false);
        message.info(res.data.msg);
        
       
      })
      .catch(error => {
        setLoading(false);
        message.error(error);
      })
    }
    else
    message.info("Please Select Date");
   }

      const handleChange = (values) =>{
        axios.post("/teacher/studentsforAttendence",{coursename:values}).then(res => {
            console.log(res.data);
                const data=res.data.map((res) => (
                 {student:res.user,
                  coursename:res.coursename,
                 }
                ));
                setStudents(data);
             
              });
              
    }
    function onDateChange(date, dateString) {
        setDate(dateString)
      }
      function disabledDate(current) {
        
        return current && current > moment().endOf('day');
      }

      
      const columns = [
    
        {
          title: 'Student',
          dataIndex: 'student',
          key: 'student',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => <a onClick={()=>{onPresent(record)}}>Present</a>
          },
          {
              title: 'Action',
              key: 'action',
              render: (record) => <a onClick={()=>{onAbsent(record)}}>Absent</a>
            },
      ];
return(
    <div>
    <Row gutter={[40, 0]}>
      <Col span={24}>
        <Title style={{textAlign: 'center'}} level={2}>
        Mark Attendance
        </Title>
        </Col>
    </Row>
    
         
    {showRow
    ?<Row justify='center'>
         <Form onFinish={onFinish} layout="inline">
         <Form.Item name='course' label='Select Course'  rules={[
          {
            required: true,
            message: 'Please Select Course',
          },
        ]}>
         <Select
         placeholder="Select Courses"
         onChange={handleChange}
         
         >
        {courses.map(d => (
        <Option key={d} value={d}>{d}</Option>
       ))}
         </Select>
         </Form.Item>
           <Form.Item name='lecture' label='Enter Lecture Proceedings'  rules={[
          {
            required: true,
            message: 'Please Enter Lecture Details',
          },
        ]}>
           <Input></Input>
           </Form.Item>
           <Form.Item  rules={[
          {
            required: true,
            message: 'Please select date',
          },
        ]}>
           <DatePicker onChange={onDateChange} disabledDate={disabledDate}/>
           </Form.Item>
           <Form.Item>
           <Button type="primary" htmlType="submit">
           Fetch Students
           </Button>
          </Form.Item>
           </Form>

        </Row>
  
    :<Row justify='center'>
      <Col style={{textAlign: 'center'}} span={23}>
      
         {students ?<Table dataSource={students} columns={columns} size={5}/> : <Text>No Students</Text>}
        </Col>
<Row justify='center'>
  <Col span={11}>
  <Button type="primary" onClick={handleDone}>
           Done
           </Button>
  </Col>
  <Col span={2}></Col>
  <Col span={11}>
  <Button type="primary" onClick={handleBack}>
           Back
           </Button>
  </Col>
</Row>
          
          

    </Row>}



</div>
)

    }
export default Attendence;