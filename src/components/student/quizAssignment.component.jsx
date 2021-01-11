import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, InputNumber,Upload,Layout,Divider,Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useHistory,} from 'react-router';
import {Link} from 'react-router-dom';

const {Title,Text} = Typography;
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  
const QuizAssignment = (props) => {

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [tableloading, setTableLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        let mounted = true
         console.log(props.Course.coursename);
        axios.post("/user/quizAssignment",{course:props.Course.coursename}).then(res => {
          console.log(res.data);
              const data=res.data.map((res) => (
               {course:res.course,
               type:res.type,
               file:res.file}
              ));
              setFiles(data);
              setTableLoading(false)
           
            });
        return function cleanup() {
          mounted = false
      
      }
    
      },[]);


      const uploadprops = {
        name: 'file',
        action: '/user/upload',
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

      const handleSubmit = (values) => {
        
        const val={...values, course:props.Course.coursename}
        console.log(val);
      setLoading(true);
      axios.post("/user/addsolution", 
      val
      )
      .then(res => {
        setLoading(false);
        
        message.info(res.data.msg);
        history.push('/student/registeredcourses')
       
      })
      .catch(error => {
        setLoading(false);
        message.error(error);
      })
    }

    const handleDownloadClick = (values) =>{
console.log(values);
    }

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
            title: 'Action',
            key: 'action',
            render: (record) => <a href = {`/files/${record.file}`} download>Download</a>
          },
      ];
return(
    <div style={{margin:'30px 0px'}} >
     <Row justify='center'>
      <Col style={{textAlign: 'center'}} span={23}>
        <Title level={4}>
        Download Quiz/Assignment
        </Title>
         <Table dataSource={files} columns={columns} size={5} loading={tableloading}/>
        </Col>

    </Row>
    <Divider orientation="Center"></Divider>
    <Row gutter={[40, 0]}>
      <Col span={23}>
        <Title style={{textAlign: 'center'}} level={4}>
         Upload Quiz/Assignment Solution
        </Title>
        </Col>
    </Row>
    <Row gutter={[40, 0]}>
    <Col span={18}>
    <Form {...layout} onFinish={handleSubmit}>
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
         >
        
        <Option key={1} value={'Quiz'}>Quiz</Option>
        <Option key={2} value={'Assignment'}>Assignment</Option>
      
         </Select>
        </Form.Item >
        <div style={{textAlign: "center",marginLeft:'100px'}}>
        <Form.Item  name="file">
        <Upload {...uploadprops}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        </div>
        <div style={{textAlign: "right"}}>
        <Button type="primary" loading={loading} htmlType="submit">
          Save
        </Button>{' '}
        <Button type="danger" htmlType="button" onClick={() => history.push('/student/registeredcourses')}>
          Back
        </Button>
          </div>
      </Form>
      </Col>
    </Row>
</div>
)

}
export default QuizAssignment;