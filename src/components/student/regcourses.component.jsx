import React, { useState, useEffect } from 'react';
import '../../App.css';

import { Layout, Menu,Divider,Row, Col,Typography,Dropdown,Card ,Statistic, Button, Table, Progress} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
  AppstoreOutlined,
  MailOutlined

} from '@ant-design/icons';

import axios from 'axios';

import fetchdata from '../HigherOrderComponent/fetchdata';

import {useHistory}  from 'react-router';
import 'antd/dist/antd.css';

import Result from './results.component';
import QuizAssignment from './quizAssignment.component'
import Attendence from './attendence.component'
import Marks from './marks.component'
import Announcements from './announcements.component'
import Contents from './content.component'

const { Content, } = Layout;
const { Title,Text, Link } = Typography;
const { Column} = Table;

const RegCourseslist = ({allData , loaded}) => {

  const [ShowCourseMenu, setShowCourseMenu] = useState(false);
     const [Course, setCourse] = useState({coursename:'',courseCreditHours:null,teacher:''});
     const [MenuItem, setMenuItem] = useState('announcement')
     const [attendence, setAttendence] = useState([])
     const history = useHistory();
      
    useEffect(() => {
      let mounted = true
      if(allData && allData.length){
        allData.map((res) => {
          let attencende
        let present = 0;
        console.log(res.coursename);
        axios.post("/user/student-attendence",{course:res.coursename}).then(res => {
          res.data.forEach(a=>{
            console.log(a.status);
            if(a.status === 'present'){
              present++
            }
          })
          });
          console.log(present);})}
        
      return function cleanup() {
        mounted = false
    }
  
    },[]);

      const data = [];
      let i=1;
      if(allData && allData.length){
      allData.map((res) => {   
        data.push({
         key: i,
         courseno: res.coursecode,
         coursename: res.coursename,
         courseDescription: res.courseDescription,
         coursetype: res.coursetype,
         courseCreditHours: res.courseCreditHours,
         coursePrerequisites: res.coursePrerequisites ,
         coursestatus: res.coursestatus,
         status: res.status,
         instructor:res.instructor
       })
       i++;
       
       return data;
     });}
       
      

   
   
     const handleBack = () => {
      history.push('/student/registeredcourses')
      history.go()
    
    }
 
   
     const handleClick = (record) => {
       setShowCourseMenu(true);
       setCourse(record)
     
     }
   
   
     const columns = [
       {
         title: 'Course Code',
         dataIndex: 'courseno',
         key: 'courseno',
       },
       {
         title: 'Course Name',
         dataIndex: 'coursename',
         key: 'coursename',
         render: (text,record) => <a onClick={()=>handleClick(record)}>{text}</a>,
       },
       {
         title: 'Credit Hourse',
         dataIndex: 'courseCreditHours',
         key: 'courseCreditHours',
       },
       {
         title: 'Teacher',
         dataIndex: 'instructor',
         key: 'teacher',
   
       },
      //  {
      //    title: 'Class',
      //    dataIndex: 'class',
      //    key: 'class',
   
      //  },
      // {
      // title: 'Attendence',
      //   dataIndex: 'attendence',
      //   key: 'attendence',
      //   render: a => (
      //     <>
      //   <Progress percent={a} />
      //     </>
      //  ),
   
       // }
     ]

         const menu = (e) => {
        setMenuItem(e.key)
         }

     return(
      < > 
   { ShowCourseMenu
   ?  <>


<Row >
<Content
      className="site-layout-background"
      style={{
        margin: '20px 16px 0px 16px',
        borderRadius:'7px',
      }}
    >

     <Menu selectedKeys={[MenuItem]} mode="horizontal" onClick={(e)=>menu(e)}>
     <Menu.Item key="announcement"  icon={<MailOutlined />} >Announcement</Menu.Item>
      <Menu.Item key="quizassignment"  icon={<MailOutlined />}>Quiz/Assignment</Menu.Item>
      <Menu.Item key="attendence"  icon={<AppstoreOutlined />}>Attendance</Menu.Item>
      <Menu.Item key="marks"  icon={<AppstoreOutlined />}>Marks Summary</Menu.Item>
      <Menu.Item key="content" icon={<AppstoreOutlined />}>Course Content</Menu.Item>
      <a style={{color:'#fead01'}} onClick={handleBack}> Back</a>
      </Menu>

      <br/>
      <Row justify="space-around">
      <Col span={8}>
      <Text style={{fontSize:'18pt',fontWeight:'bold'}}>{Course.coursename}</Text> 
      </Col>
      <Col >
      <Text style={{fontSize:'12pt', fontWeight:'bold'}}>Credit Hours: </Text> {Course.courseCreditHours}
      </Col>
      <Col >
      <Text style={{fontSize:'12pt', fontWeight:'bold'}}>Taught by:</Text> {Course.instructor}
      </Col>
      
      </Row>
      

      </Content>

</Row>


   <Row >
      <Content
      className="site-layout-background"
      style={{
        margin: '20px 16px 20px 16px',
        borderRadius:'7px',
      }}
    >
    
       
   
        {MenuItem === 'quizassignment' ? <QuizAssignment Course={Course}/> : null}
        {MenuItem === 'marks' ? <Marks Course={Course}/> : null}
        {MenuItem === 'attendence' ? <Attendence Course={Course}/> : null}
        {MenuItem === 'content' ? <Contents Course={Course}/> : null}
        {MenuItem === 'announcement' ? <Announcements Course={Course}/> : null}
  </Content>


</Row> 
</>



:<Row justify='center'>
<Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        borderRadius:'7px',
         
        
      }}
    >

    <Col  style={{textAlign:'center'}}>
    <h1 style={{fontSize:'16pt',color:'#fead01', fontWeight:'bolder' }} >Registered Courses</h1>
    </Col>
    <Divider />
    <Table columns={columns} dataSource={data} loading={loaded}/>
</Content>
</Row>}
</>
  );
    }

export default fetchdata(RegCourseslist, `/user/courses`) ;
    