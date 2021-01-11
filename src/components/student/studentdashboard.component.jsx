import React from 'react';
import 'antd/dist/antd.css';
import '../../App.css';
import { Layout, Menu,Divider,Row, Col,Typography,Dropdown,Card ,Statistic, Button,Alert, Calendar,Carousel} from 'antd';
import TextLoop from 'react-text-loop';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
  InfoCircleTwoTone
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,

} from "recharts";
import {useHistory}  from 'react-router';
import slide1 from '../../assets/slide1.jpg'
import slide2 from '../../assets/slide2.jpg'
import slide3 from '../../assets/slide3.jpg'
import slide4 from '../../assets/slide4.jpg'

const { Content, } = Layout;
const { Title,Text, Link } = Typography;


const Dashboard = () => {

  const history = useHistory();

  const [user, setUser] = React.useState(  );
  const data = JSON.parse(localStorage.getItem('userData'))

  console.log(data);
  const TABLE_LIST = [
    { name: "Programming Fundamentals", pv: 12, amt: 100 },
    { name: "Opp", pv: 45, amt: 2210 },
    { name: "Data Structures", pv: 54, amt: 2290 },

 
  ];
  const handleProgramClick = () => {
    
    history.push('/program');
     
      
      
  }
  const contentStyle = {
    height: '150px',
    color: '#fff',
    lineHeight: '150px',
    textAlign: 'center',
    background: '#364d79',
  };


    return(
        < >
     

        <Row >
        <Content
        className="site-layout-background"
        style={{
            margin: '24px 16px',
            padding: '5px 5px',
          borderRadius:'7px',
        
        }}
      >
       
        <Row>
          <Col>
          <Text style={{fontSize:'18pt',marginLeft:'10px', fontWeight:'bold' }}>Program:</Text>
          </Col>
          <Col span={12}>
          <Text style={{fontSize:'18pt',marginLeft:'10px'}}>Bs Computer Science</Text>
          </Col>
          
          <Col >
          <span style={{fontSize:'18pt'}}>
          <InfoCircleTwoTone onClick={handleProgramClick}/>
          </span>
         
          </Col>

        </Row>
        <Divider />
        <Row>
          <Col>
          <Text style={{fontSize:'12pt',marginLeft:'10px', fontWeight:'bold' }}>Session:</Text>
          </Col>
          <Col span={12}>
          <Text style={{fontSize:'12pt',marginLeft:'10px'}}>Fall 2020</Text>
          </Col>
        

        </Row>
        

  
    </Content>
   
    <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
            padding: '5px 5px',
          borderRadius:'7px',
          
        }}
      >
        <Row justify='center'>
          <Col>
          <Text style={{fontSize:'18pt', fontWeight:'bold' }}>Calander </Text>
          </Col>
        </Row>
        <Divider />
        <Row  justify="center">
          <Col style={{width:'300px'}}>
          <Calendar fullscreen={false} />
          </Col>
        
        </Row>
     
    </Content>
    
     <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: '10px 10px',
          borderRadius:'7px',
          
        }}
      >
            <Row justify='center'>
          <Col>
          <Text style={{fontSize:'18pt',marginLeft:'10px', fontWeight:'bold' }}>Notice Board</Text>
          </Col>
        

        </Row>
        <Divider />
   
   <Row justify="space-around">
    
     <Alert
    banner
    message={
      <TextLoop >
        <div style={{width:'200px'}}>Assignment Due On Thursday </div>
        <div style={{width:'200px'}}>Check Your Quiz Marks</div>
        <div style={{width:'200px'}}>Days Until Exam: 47</div>
        <div style={{width:'200px'}}>Comecs Society Recruiting</div>
      </TextLoop>
    }
  />
  
        </Row>

    <Row justify='center' style={{minHeight:'300px',minWidth:'400px'}}>
      <Carousel autoplay style={{height:'100px',width:'400px', marginTop:'20px'}}>
    
      <img style={{Height:'100px',Width:'400px'}} src={slide1} alt="1"/>
   
   
    <img style={{Height:'100px',Width:'400px'}} src={slide2} alt="2"/>
   
    
    <img style={{Height:'100px',Width:'400px'}} src={slide3} alt="3"/>
 
 
    <img style={{Height:'100px',Width:'400px'}} src={slide4} alt="4"/>
 
  </Carousel>
  </Row>
   
    </Content>


</Row>

    
<Row justify='center'>
<Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          borderRadius:'7px',
           width:'37vw',
           
        }}
      >

 <Col  style={{textAlign:'center'}}>
      
      <h1 style={{fontSize:'14pt',color:'red' }} >Courses Registered</h1>
      </Col>
      <Divider />
  
    <Row>
        <Col span={12}>
    <h1 style={{ margin:'0px'}} >Programming Fundamentals</h1>
    <h1 style={{ margin:'0px'}} >OOP</h1>
    <h1 style={{ margin:'0px'}} >Discrete Structures</h1>
    </Col> 
    <Col span={12}>
    
    <h1 style={{ margin:'0px',}} >Fayyaz Shah</h1>
    <h1 style={{ margin:'0px',}} >Imran Abbas</h1>
    <h1 style={{ margin:'0px',}} >Muhammad Rashid</h1>
    
    </Col> 
    </Row>
</Content>

<Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          borderRadius:'7px',
          width:'37vw',
          
        
          
        }}
      >
           <Col style={{textAlign:'center'}}>
      
           <BarChart
        width={600}
        height={300}
        data={TABLE_LIST}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      
        <Bar dataKey="pv" fill="#1890ff" />
      </BarChart>

    </Col>
    <Divider />
    <Row>
      <Col span={12}>
    <h1 style={{ margin:'0px'}} >Total Attendence</h1>
  
    </Col> 
    <Col span={12}>
    <h1 style={{ margin:'0px',fontSize:'16pt',fontWeight:'800'}} >80%</h1>
    
    </Col > 
    </Row>

</Content>
</Row>
</>
    );
}
export default Dashboard;