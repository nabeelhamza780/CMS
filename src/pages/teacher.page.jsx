
import React from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Layout, } from 'antd';

import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";


import Addfile from '../components/teacher/addfileTeacher.component'
import SidebarTeacher from '../components/teacher/sidebarteacher'
import TeacherHome from '../components/teacher/teacherhome.component'
import Attendence from '../components/teacher/attendence.component'
import Addmarks from '../components/teacher/addmarks.component'
import Addannouncement from '../components/teacher/addannouncement.component'
import ShowAttendence from '../components/teacher/showattendence.component'
import ShowMarks from '../components/teacher/showmarks.component'

import titleImg from '../assets/title2.png';

const { Header, Sider, Footer, Content, } = Layout;

const Teacherpage = () => {




    return (
        
<Layout>
        <Sider style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
  
        left: 0,
      }}>
          
             
        <SidebarTeacher/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          
             <img src={titleImg} style={{width:'450px' , margin: '0px 0px 0px 220px'}} alt="" />
             
          </Header>
          <Content style={{margin: '24px 0px 24px 200px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff"}}>
     
        {/* <Responselist></Responselist> */}
        <Switch>
                    <Route path="/teacher/teacherhome" component={TeacherHome} />
                    <Route path="/teacher/markattendence" component={Attendence} />
                    <Route path="/teacher/addfile" component={Addfile} />
                    <Route path="/teacher/addmarks" component={Addmarks}/>
                    <Route path="/teacher/addannouncement" component={Addannouncement}/>
                    <Route path="/teacher/showattendence" component={ShowAttendence}/>
                    <Route path="/teacher/showmarks" component={ShowMarks}/>
                    {/* <Redirect to="/home" from="/" /> */}
                </Switch> 
                


          </Content>
        <Footer style={{ margin: '0px 0px 0px 200px',textAlign: 'center' }}>  All Rights Preserved by SBBW University Peshawar</Footer>
        </Layout>
        
      </Layout>
    )

}
export default Teacherpage;