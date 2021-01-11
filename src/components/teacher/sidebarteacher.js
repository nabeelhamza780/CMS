import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Menu,Button, } from 'antd';
import {
  PlusCircleOutlined,
  BarChartOutlined,
  DashOutlined,
  FundOutlined,
  FileMarkdownOutlined,
  NotificationOutlined,
 
  } from '@ant-design/icons';

import {useHistory}  from 'react-router';
import axios from 'axios';


import logo2 from '../../assets/logo2.png';
const Text = styled.h1`
font-size:1.8rem;
font-weight:600;
color:white;
margin: 0px 20px 20px 10px;
`;

const SidebarTeacher = () => {




  const [User, setUser] = useState("");

  const [Log, setLog] = useState(false);

  useEffect(() => {
    let mounted = true
  axios.get("/user/").then(res => {
    if (mounted) 
    {
      setUser(res.data.user);
      setLog(true);
    
    }
    });
  
    return function cleanup() {
      mounted = false
  }

  },[]);

  
    const history = useHistory();


    const handleTaughtClick = () => {
       
      history.push('/teacher/teacherhome');
    
  }
    


    const handleFileClick = () => {
    
      history.push('/teacher/addfile');
       
        
        
    }

 
    const handleAttendenceClick = () => {
    
      history.push('/teacher/markattendence');
       
   
        
    }

    const handleShowAttendenceClick = () => {
    
      history.push('/teacher/showattendence');
       
   
        
    }
 
    const handleAddMarksClick =() =>{ 
      history.push('/teacher/addmarks')
      }

     const handleAddShowMarksClick = () => {
      history.push('/teacher/showmarks')
     }

      const handleAddAnnouncementClick = () => {
        history.push('/teacher/addannouncement')
      }
    
   

    const Login = () => {
    
      history.push('/admin-signin');
       
   
        
    }

    const Logout = () => {
      console.log("logout");
      axios.post("/user/logout").then((resp)=>{
        localStorage.adminLoggedIn = false;
        localStorage.userLoggedIn = false;
        history.push('/admin-signin');
       
  
      })
  }

  return (
      <div>
        
          ?<img src={logo2} style={{width:'80px' , margin: '20px 0px 0px 0px'}} alt="" />

        <Text >{User.fullname}</Text>
        {Log
        ?<div>
           <Button  type="danger" htmlType="button" onClick={() => Logout()}>
              Logout
            </Button>
        </div>
        
          :<div><Button  type="danger" htmlType="button" onClick={() => Login()}>
              Login
            </Button>
            </div>
}
      <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" onClick={handleTaughtClick} icon={<DashOutlined />}>
              Taught Courses
            </Menu.Item>
            <Menu.Item key="2" onClick={handleAttendenceClick} icon={<BarChartOutlined />}>
              Attendance
            </Menu.Item>
            <Menu.Item key="3" onClick={handleShowAttendenceClick} icon={<FundOutlined />}>
              Show Attendance
            </Menu.Item>
            <Menu.Item key="4" onClick={handleFileClick} icon={<PlusCircleOutlined />}>
              Add Quiz/Assignment
            </Menu.Item>
            <Menu.Item key="5" onClick={handleAddMarksClick} icon={<PlusCircleOutlined />}>
              Add Marks
            </Menu.Item>
            <Menu.Item key="6" onClick={handleAddShowMarksClick} icon={<FileMarkdownOutlined />}>
              Show Marks
            </Menu.Item>
            <Menu.Item key="7" onClick={handleAddAnnouncementClick} icon={<NotificationOutlined />}>
              Add Announcement
            </Menu.Item>
          </Menu> 
       
          
     
    
        </div>
  );
}

export default SidebarTeacher;
