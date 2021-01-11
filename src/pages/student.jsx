import React , {useState} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Divider, Row, Col, Typography, Dropdown,PageHeader,Button, Tag, Spin ,Space} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  LogoutOutlined,
  LoadingOutlined,
  EditTwoTone,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined
} from '@ant-design/icons';
import axios from 'axios';
import "../App.css"
import {useHistory} from 'react-router';
import {BrowserRouter as Router, Route, Switch, Redirect,} from "react-router-dom";

import Sidebar from '../components/student/sidebar';
import logo from '../assets/logouni.png';
import UserCourseslist from '../components/student/usercourses.component';
import Dashboard from '../components/student/studentdashboard.component';
import RegCourseslist from '../components/student/regcourses.component';
import Profile from '../components/student/profile.component';
import Result from '../components/student/results.component';
import Program from '../components/student/programinformation.component'
import Settings from '../components/student/settings.component'
import titleImg from '../assets/title2.png';


const {Header, Sider, Footer, Content,} = Layout;
const {Title, Text, Paragraph} = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

const Student = () => {


  const history = useHistory();
  const [collapsed, setcollapsed] = useState(true);
  const [logoutloading, setLogoutLoading] = useState(false);

  const data = JSON.parse(localStorage.getItem('userData'))
  const toggle = () => {
    setcollapsed(!collapsed)
  };

  const Update = () => {
      console.log('in update');
    history.push('/student/settings')
    history.go()
  }

  const Logout = () => {
    setLogoutLoading(true)
    axios.post("/user/logout").then((resp)=>{
        if(resp){setLogoutLoading(false)}
      localStorage.userLoggedIn = false;
      localStorage.userData = ''
      history.push('/student-signin')
      


    })
}

  const IconLink = ({ icon, text }) => (
    <a className="example-link">
      {icon}<text style={{marginLeft:'5px'}}>{text}</text>
    </a>
  );
  const content = (
    <>
      <Paragraph>
       {data.description ? data.description : 'Add your Motivation by updating your profile'}
      </Paragraph>
     
      <div>
        <IconLink
          icon= {<MailOutlined />}
          text={data.email}
        />
        <IconLink
          icon= {<PhoneOutlined />}
          text={data.contact}
        />
        <IconLink
          icon= {<HomeOutlined />}
          text={data.address}
        />
       
     
      </div>
    </>
  );
  const Content = ({ children, extraContent }) => {
    return (
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
      </Row>
    );
  };


  return (

      <Router>
        <Layout >
          <Sider trigger={null} collapsible collapsed={collapsed} theme="light">

            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            {collapsed ? null : <img src={logo} style={{width: '120px', margin: '20px 20px 20px 10px', background:'#ffffff'}} alt=''/>}


            <Divider style={{margin: '0px 10px 10px 20px', width: '80%', minWidth: '50%'}}/>
            {collapsed ? null :
                <Title level={4} style={{fontSize: '12pt', fontWeight: '900', margin: '10px 10px 10px 20px'}}> Student
                  Dashboard</Title>}
            <Sidebar/>

          </Sider>
          <Layout className="site-layout" style={{minHeight: '100vh'}}>

            


             <PageHeader
             title={data.fullname}
             className="site-layout-background"
             subTitle={data.regno}
             tags={<Tag color="orange">Running</Tag>}
             extra={[
                
              <Button className='custom' onClick={Update}><EditTwoTone twoToneColor="#fead01"/>  Update Contact</Button>,
              <Button className='custom' onClick={Logout} disabled={logoutloading}> 
                  <LogoutOutlined style={{ color:'#fead01'}}/>
                Logout
              <Spin spinning={logoutloading} indicator={antIcon}/>
              </Button>,
            ]}
            avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
            >
                
                {data.picture 
                ?<Content
                extraContent={
                  <img
                    src={`/profiles/${data.picture}`}
                    alt="content"
                    width="100px"
                    heigth="150px"
                  />
                }
                  >
                    {content}
                 </Content>
                 
                 :<Content
                extraContent={
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                    alt="content"
                    width="100px"
                    heigth="150px"
                  />
                }
                  >
                    {content}
                 </Content>
             }
          </PageHeader>
            <Switch>
              {/* <Route path="/student/home" component={Dashboard} /> */}
              <Route path="/student/profile" component={Profile} />
              <Route path="/student/courselist" component={UserCourseslist} />
              <Route path="/student/registeredcourses" component={RegCourseslist} />
              <Route path="/student/result" component={Result} />
              <Route path="/student/program" component={Program} />
              <Route exact path="/student/settings" component={Settings} />
               <Redirect to="/student/home" from="/" />
            </Switch>

          </Layout>
  
        </Layout>
      
      </Router>
  );


}


export default Student;



