import React, {useEffect, useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber,Upload,Divider,Table,DatePicker,Space,Spin } from 'antd';
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

const Addmarks = (props) => {

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState();
    const [date, setDate] = useState();
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const [details, setDetails]= useState();
    const [total, setTotal]= useState(10);
    const [type, setType]= useState(10);
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


      const saveMarks = (value) => {
          setLoading(true)
        const data= students.map((res) => 
           ({user:res.student,
             course:res.coursename,
             totalmarks:total,
             type:type,
             details:details,
             date:date,
             obtainedmarks:value[res.student]
            })
        );
        axios.post("/teacher/addmarks", data)
       .then(res => {
         setLoading(false);
         message.info(res.data.msg);
         history.push('/teacher/teacherhome')
        
       })
       .catch(error => {
         setLoading(false);
         message.error(error);
       })
    }

     const onFinish =(value)=>{
         console.log(value);
        setDetails(value.lecture)
        setTotal(value.total)
        setType(value.type)
        setShowRow(false)
     }

     const handleBack = () => {
      setShowRow(true)
     }

     const handleDone = () => {
      history.push('/teacher/teacherhome')
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
            title: 'Type',
            key: 'type',
            render: () => (<Text>{type}</Text>)
          },
        {
            title: 'Obtained',
            key: 'action',
            render: (record) => (<InputNumber placeholder='Obtained Marks'/>)
          },
        

          {
              title: 'Total',
              key: 'action',
              render: (record) =>(<Text>{total}</Text>)
            },
      ];

return(
    <div>
    <Row gutter={[40, 0]}>
      <Col span={24}>
        <Title style={{textAlign: 'center'}} level={2}>
        Add Marks
        </Title>
        </Col>
    </Row>
    
         
    {showRow
    ?<Row justify='center'>
         <Form onFinish={onFinish}
           labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 14,
          }}
         >
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
           <Form.Item name='lecture' label='Enter details'>
           <Input placeholder='Enter details'></Input>
           </Form.Item>
           <Form.Item name='total' label='Total Marks'>
           <InputNumber placeholder='Total Marks'/>
           </Form.Item>
           <Form.Item name='date' label='Pick a Date' rules={[
          {
            required: true,
            message: 'Please select date',
          },
        ]}>
           <DatePicker onChange={onDateChange} disabledDate={disabledDate}/>
           </Form.Item>
           <Form.Item>
           <Button type="primary" htmlType="submit" style={{marginLeft:'100px'}}>
           Submit
           </Button>
          </Form.Item>
           </Form>

        </Row>
  
    :<Row justify='center'>
      <Col style={{textAlign: 'center'}} span={23}>
       <Text>{type}</Text>
       <Text>{total}</Text>
       <Text>{date}</Text>
         {students 
         ? <Form onFinish={saveMarks} autoComplete="off">
       
                   {students.map((k, index ) => {
                      return(
                          <>
                        <Form.Item
                          required={false}
                          key={k.index}
                          name={k.student}
                          label={k.student}
                        >   
                         <InputNumber placeholder="Obtained Marks"  style={{width: '60%', marginRight: 8}}/>
                       
                        </Form.Item>
            
                        </>
                      )
                    })}
         <Form.Item>
             <Spin spinning={loading}>
         <Row justify='center'>
            <Col span={11}>
            <Button type="primary" htmlType="submit">
             Submit
           </Button>
         </Col>
            <Col span={2}></Col>
            <Col span={11}>
            <Button type="primary" onClick={handleBack}>
           Back
           </Button>
         </Col>
        </Row>
        </Spin>

         </Form.Item>

       </Form>
         : <Text>No Students</Text>}
        </Col>
    </Row>}



</div>
)

    }
export default Addmarks;