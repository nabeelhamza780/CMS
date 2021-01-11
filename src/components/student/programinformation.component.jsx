
import React, {useEffect, useState} from 'react';
import { Avatar, Button, Card, Input, List, Layout, Switch,Typography, Space  } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';

const {Content } = Layout;
const {Text,Title}=Typography;
const Program = () => {
    const listData = [{
        href: 'https://ant.design',
        title: `Introduction to Programming `,
        description:
          'begin to develop programming skills',
        content:
          'This one semester course introduces computational concepts and basic programming. Students will develop confidence in their ability to apply programming techniques to problems in a broad range of fields. This course uses the Python 3.5 programming language.',
          stars:102,
        },
        {
            href: 'https://ant.design',
            title: `Object Oriented Programming `,
            description:
              'concepts of Object Oriend Programming',
            content:
              'Course introduce you to some of the core concepts of 6.01. We will also focus on programming, in particular the object-oriented programming paradigm in Python. Topics include primitives, expressions, assignments, functions, environments, OOP, and inheritance.',
              stars:145,
            },
         {
            href: 'https://ant.design',
            title: `Data Structures `,
            description:
              'Arrays Lists and other types of Data + Algorithms',
            content:
              'This course provides an introduction to mathematical modeling of computational problems. It covers the common algorithms, algorithmic paradigms, and data structures used to solve these problems. The course emphasizes the relationship between algorithms and programming, and introduces basic performance measures and analysis techniques for these problems.',
              stars:126,
            },
            {
                href: 'https://ant.design',
                title: `Computer Networks `,
                description:
                  'connect with us through Computers',
                content:
                  'Topics include internetworking philosophies, unicast and multicast routing, congestion control, network quality of service, mobile networking, router architectures, network-aware applications, content dissemination systems, network security, and performance issues. ',
                  stars:126,
                },
    
    
    ];


    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );

return(
    <Content style={{padding: '1vh'}}>
              <Card bordered title="Program" >
                <Title>BS Computer Science</Title>
                <Text>The Bachelor’s of Science (BS) in Computer Science program at the Information Technology
                     University of the Punjab (ITU) aims to impart a research-oriented and design-centered education
                      producing individuals that would transform the IT industry of Pakistan. Our curriculum is
                       intelligently tailored to meet the knowledge and skills gap in the industry. In addition, 
                       courses are taught by renowned faculty with diverse national and international experiences. 
                       Research at ITU’s multiple research centers is rigorous and is undertaken in active collaboration
                        with foreign and local partners. By becoming involved with a diverse array of research projects, 
                        our students add to their classroom knowledge and, gain hands-on, practical work experience to 
                        sharpen their skills. Ultimately, the combination of our well-designed curriculum, highly experienced
                         and foreign qualified faculty, and opportunities to hone skills through practical research experience
                          means that our students graduate as highly skilled professionals ready for a competitive job market. </Text>
              </Card>
              
              <Card bordered title="Courses Offered" >
              <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
   
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text={item.stars} key="list-vertical-star-o" />,
         
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
         
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
              </Card>
              
              
            </Content>
)

}
export default Program;