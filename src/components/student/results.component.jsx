import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Row,Col,Typography,Layout,Timeline,Divider, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Parallax } from "rc-scroll-anim";
const {Title,Text} = Typography;
const { Content } = Layout;
const Result = () => {

    const [result, setResult] = useState([]);
    const [spin, setSpin] = useState(true);

    useEffect(() => {
        let mounted = true
      axios.get("/user/result").then(res => {
        if (mounted) 
        {
          
          setResult(res.data);
          setSpin(false)
        
        }
        });
      
        return function cleanup() {
          mounted = false
      }
    
      },[]);

      return(
       <Spin spinning={spin}>
        <Row>
       <Content
      className="site-layout-background"
      style={{
        margin: '20px 20px 20px 20px',
        padding:27,
        borderRadius:'7px',
      }}
    >
        <Col span={23}>
          <Title style={{textAlign: 'center'}} level={2}>
          Results
          </Title>
          {result.length
            ?<div>
          <Row style={{textAlign: 'center', marginBottom:'50px'}}>
            <Col span={8}>
              <Title level={4}>Name</Title>
              <Text>
                {result[0].user}
              </Text>
              
            </Col>
            <Col span={8}>
            <Title level={4}>Semester</Title>
              <Text>
                {result[0].semester}
              </Text>
            </Col>
            <Col span={8}>
            <Title level={4}>CGPA</Title>
              <Text>
                {result[0].cgpa}
              </Text>
            </Col>
          </Row>
          <Divider orientation="Center">Grade in All Courses</Divider>
          <Content >
           <div className="sta">
         <Timeline>
         <Timeline.Item dot={<ArrowDownOutlined/>}> </Timeline.Item> 
             { result[0].courses.map((res) => {
                 return <Timeline.Item color='#4257B2' >
                 <Row type="flex" justify="space-around" id="strat-1">
                 <Col xs={24} sm={10} md={12} >
                   <Parallax
                     animation={{ x: 0, opacity: 1, playScale: [0.3, 0.7] }}
                     style={{
                       transform: "translateX(-100px)",
                       opacity: 0
                     }}
                   >
                   <h2 >{res.course.toUpperCase()}</h2>
                   <h3 style={{ color:"#001529", }}>GPA "{res.gpa}"</h3> 
                   </Parallax>
                 </Col>
                 </Row>
             </Timeline.Item>
             })
             }
             <Timeline.Item dot={<ArrowUpOutlined />}> </Timeline.Item>  
             
         </Timeline>
             </div> 
         </Content>
          </div>
          : null
}
          </Col>
          </Content>
          </Row>
          
          </Spin>
      )

}

export default Result;