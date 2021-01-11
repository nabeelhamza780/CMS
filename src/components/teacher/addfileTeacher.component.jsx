import React, {useEffect, useState} from 'react';


import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber,Upload,Divider,Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';

const {Title} = Typography;

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Addfile = () => {

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const [course, setCourse] = useState();
    const [type, setType]=useState();
    const columns = [
      {
        title: 'File',
        dataIndex: 'file',
        key: 'file',
      },
     
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Student',
        dataIndex: 'student',
        key: 'student',
      },
      {
        title: 'Regestration No.',
        dataIndex: 'regno',
        key: 'regno',
      },
      {
        title: 'Date & Time',
        dataIndex: 'date',
        key: 'date',
      },
      {
          title: 'Action',
          key: 'action',
          render: (record) => <a href={`/solutions/${record.file}`} download>Download</a>
        },
    ];

    const props = {
        name: 'file',
        action: '/teacher/upload',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

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
          console.log(values);
        setLoading(true);
        axios.post("/teacher/addfile", 
          values
        )
        .then(res => {
          setLoading(false);
          
          message.info(res.data.msg);
          
        })
        .catch(error => {
          setLoading(false);
          message.error("Something Went Wrong");
        })
      }

      const handleCourseChange = (values) =>{
        setCourse(values)
      }

      const handleChange = (values) =>{
        axios.post("/teacher/quizAssignmentsolutions",{course:values}).then(res => {
            console.log(res.data);
                const data=res.data.map((res) => (
                 {course:res.course,
                 type:res.type,
                 file:res.file,
                 student:res.user,
                 regno: res.regno,
                 date:res.date
              }
                ));
                setFiles(data);
             
              });
              
    }

    const onTypeChange = (val) => {
      console.log(val);
      setType(val)
    }


return(
    <div>
    <Row gutter={[40, 0]}>
      <Col span={23}>
        <Title style={{textAlign: 'center'}} level={2}>
        Add Quiz or Assignment
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

          

        <Form.Item name="type" label="Type"
        rules={[
          {
            required: true,
            message: 'Please select Type',
          }
        ]}
        >
         <Select
         placeholder="Select Type"
         onChange={(val)=>onTypeChange(val)}
         >
        
        <Option key={1} value={'Quiz'}>Quiz</Option>
        <Option key={2} value={'Assignment'}>Assignment</Option>
        <Option key={3} value={'Other'}>Other</Option>
         </Select>
        </Form.Item >
        {type === 'Other'
        ?<Form.Item name="title" label="Title"
        rules={[
          {
            required: true,
            message: 'Please Enter Title',
          }
        ]}
        >
          <Input></Input>
          </Form.Item>:null}

        <div style={{textAlign: "center",marginLeft:'100px'}}>
        <Form.Item  name="file">
        <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        </div>
    

       
        <div style={{textAlign: "right"}}>
        <Button type="primary" loading={loading} htmlType="submit">
          Save
        </Button>{' '}
        <Button type="danger" htmlType="button" onClick={() => history.push('/teacher/allcourses')}>
          Back
        </Button>
          </div>
      </Form>
      </Col>
    </Row>
    <Divider orientation="Center"></Divider>
    <Row gutter={[40, 0]}>
      <Col style={{textAlign: 'center'}} span={23}>
        <Title style={{textAlign: 'center'}} level={2}>
        Download Solutions by students
        </Title>
        <Select
        style={{textAlign: 'center',marginBottom:'20px'}}
         placeholder="Select Courses"
         onChange={handleChange}
         >
        {courses.map(d => (
        <Option key={d} value={d}>{d}</Option>
       ))}
         </Select>



         <Table dataSource={files} columns={columns} size={5}/>;
   
        </Col>

    </Row>



</div>
)

    }
export default Addfile;