import React, {useEffect, useState} from 'react';

import { Menu, Button, } from 'antd';
import {
  HomeOutlined,
  GlobalOutlined,
  SolutionOutlined,
  RadiusSettingOutlined,
  DiffOutlined

} from '@ant-design/icons';
import {useHistory}  from 'react-router';
import axios from 'axios';

import logo from '../../assets/logo.png';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';



const Sidebar = () => {
  const [Current, setCurrent] = useState("0");
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



  const handleHomeClick = () => {
    history.push('/student/home');
  }

  const handleGlobalClick = () => {
    history.push('/student/courselist');
  }

  const handleAddClick = () => {
    history.push('/student/registeredcourses');
  }

  const handleResultClick = () => {

    history.push('/student/result');
  }


  const Login = () => {

    history.push('/student/signin');



  }

  const Logout = () => {
    axios.post("user/logout").then((resp)=>{
      localStorage.adminLoggedIn = false;
      localStorage.userLoggedIn = false;
      history.push('/signin');


    })
  }

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };



  return (
      <div>
        
        <Menu theme="light"  onClick={handleClick} mode="inline" selectedKeys={[Current]}>
          <Menu.Item key="0" onClick={handleAddClick} icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="1" onClick={handleGlobalClick} icon={<GlobalOutlined />}>
            All Courses
          </Menu.Item>
          <Menu.Item key="3" onClick={handleResultClick} icon={<RadiusSettingOutlined />}>
            Result
          </Menu.Item>
          </Menu>
        </div>
  );
}

export default Sidebar;
