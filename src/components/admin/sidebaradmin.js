import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Menu,Button, } from 'antd';
import {
  UserAddOutlined,
  TranslationOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  ReadOutlined,
  SwitcherOutlined,
  UsergroupAddOutlined
 
  } from '@ant-design/icons';

import {useHistory}  from 'react-router';
import axios from 'axios';


import logo1 from '../../assets/logo1.png';

const Text = styled.h1`
font-size:1.8rem;
font-weight:600;
color:white;
margin: 0px 20px 20px 10px;
`;

const SidebarAdmin = () => {


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


    const handleAddCourseClick = () => {
    
      history.push('/admin/addcourse');
       
   
        
    }

    const handleAddUserClick = () => {
    
      history.push('/admin/adduser');
       
   
        
    }
    const handleAssignTeacherClick = () => {
    
      history.push('/admin/assignteacher');
       
   
        
    }

    const handleAddResultsClick = () => {
    
      history.push('/admin/addresults');
       
   
    }
   

    
    const handleAllResponsesClick = () => {
    
      history.push('/admin/responselist');
       
   
        
    }

    const handleAllcoursesClick = () => {
    
      history.push('/admin/allcourses');
       
   
        
    }


    const handleAllUsersClick = () => {
      history.push('/admin/allusers');
    }

    const Login = () => {
    
      history.push('/admin/signin');
       
   
        
    }

    const Logout = () => {
      axios.post("/user/logout").then((resp)=>{
        localStorage.adminLoggedIn = false;
        localStorage.userLoggedIn = false;
        history.push('/admin-signin');
       
  
      })
  }

  return (
      <div>
       
      
        <img src={logo1} style={{width:'80px' , margin: '20px 0px 0px 0px'}} alt="" />

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
       
        
        <Menu theme="dark" mode="inline">
        <Menu.Item key="0" onClick={handleAllResponsesClick} icon={<SwitcherOutlined />}>
        Reg Responses
        </Menu.Item>
        <Menu.Item key="1" onClick={handleAllcoursesClick} icon={<ReadOutlined />}>
        All Courses
        </Menu.Item>
        <Menu.Item key="2" onClick={handleAddCourseClick} icon={<PlusOutlined />}>
          Add Courses
        </Menu.Item>
        <Menu.Item key="3" onClick={handleAssignTeacherClick} icon={<ArrowLeftOutlined />}>
          Assign Teacher
        </Menu.Item>
        <Menu.Item key="4" onClick={handleAddResultsClick} icon={<TranslationOutlined />}>
          Add Results
        </Menu.Item>
        <Menu.Item key="5" onClick={handleAllUsersClick} icon={<UsergroupAddOutlined />}>
        All Users
        </Menu.Item>
        <Menu.Item key="6" onClick={handleAddUserClick} icon={<UserAddOutlined />}>
          Add user
        </Menu.Item>
      
      </Menu>

   

    
        </div>
  );
}



export default SidebarAdmin;
