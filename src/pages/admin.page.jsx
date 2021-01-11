
import React from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Layout, } from 'antd';

import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";

import Regrequest from '../components/admin/regrequests.component';
import Courseslist from '../components/admin/allcourses.component';
import AllUsers from '../components/admin/allusers.components'
import SidebarAdmin from '../components/admin/sidebaradmin';
import Addcourse from '../components/admin/addcourse.component';
import Adduser from '../components/admin/adduser.component';
import AssignTeacher from '../components/admin/assignteacher.component';
import AddResults from '../components/admin/addresults.component'
import titleImg from '../assets/title2.png';

const { Header, Sider, Footer, Content } = Layout;

const Adminpage = () => {




    return (
        
<Layout>
        <Sider style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
  
        left: 0,
      }}>
           
             
        <SidebarAdmin/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          
             <img src={titleImg} style={{width:'450px' , margin: '0px 0px 0px 220px'}} alt="" />
        
          </Header>
          <Content style={{margin: '24px 0px 24px 200px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff"}}>
     
    
           
                <Switch>
                    <Route path="/admin/responselist" component={Regrequest} />
                    <Route path="/admin/allcourses" component={Courseslist} />
                    <Route path="/admin/addcourse" component={Addcourse} />
                    <Route path="/admin/adduser" component={Adduser} />
                    <Route path="/admin/assignteacher" component={AssignTeacher} />
                    <Route path="/admin/addresults" component={AddResults} />
                    <Route path="/admin/allusers" component={AllUsers} />

                </Switch> 


          </Content>
        <Footer style={{ margin: '0px 0px 0px 200px',textAlign: 'center' }}>  All Rights Preserved by SBBW University Peshawar</Footer>
        </Layout>
        
      </Layout>
    )

}
export default Adminpage;