import React, { useState}from 'react';


import {Table, Row, Col, TreeSelect,message, Typography,Space,Spin } from 'antd';

import axios from 'axios';

import fetchdata from '../HigherOrderComponent/fetchdata';

import {useHistory}  from 'react-router';
import 'antd/dist/antd.css';


const {Title, Text} = Typography;
const { TreeNode } = TreeSelect;

const { Column} = Table;
const AllUsers = ({allData}) => {

  console.log(allData);

   //local States
    const [SortInfo, setSortInfo] = useState([]);
    const [Value, setValue] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    

const deleteUser = (username, name) => {
   
  setLoading(true);
  axios.post("/admin/deleteuser", 
  {username:username, fullname:name}
)
.then(res => {
  setLoading(false);
  message.info(res.data.msg);
  setTimeout(()=>{window.location.reload()},2000)

}).catch(error => {
  setLoading(false);
  message.error(error);
})

}


      const admin = [];
      const teacher = [];
      const student = [];
      let i=1;

      allData.map((res) => {
          
          if(res.type === 'user'){
            student.push({
                key: i,
                address:res.address,
                contact: res.contact,
                email: res.email,
                fullname: res.fullname,
                regno: res.regno,
                semester: res.semester,
                username: res.username
            })
          }
          else if(res.type === 'admin'){
            admin.push({
                key: i,
                address:res.address,
                contact: res.contact,
                email: res.email,
                fullname: res.fullname,
                username: res.username
            })
          }
          else if (res.type === 'teacher'){
            teacher.push({
                key: i,
                address:res.address,
                contact: res.contact,
                email: res.email,
                fullname: res.fullname,
                username: res.username
            }) 
          }
       i++;
     });
       
      
    console.log(admin);
    console.log(teacher);
    console.log(student);
         

     return (
     
         <div>   
           <Spin spinning={loading}>
          <Row gutter={[40, 0]}>
          <Col span={24}>
            <Title level={2}>
            All Users
            </Title>
            </Col>
            </Row>

            <br />
        
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table    dataSource={admin}  title={() => <Title level={4}>Admins</Title>}>

        <Column title="Name" dataIndex="fullname" key="fullname" />
        <Column title="Contact" dataIndex="contact" key="contact" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Usename" dataIndex="username" key="username" />
         <Column title="Action" d      key="action"
         render={(text, record) => (
        <Space size="middle">
          <a onClick={() => deleteUser(record.username, record.fullname)}>Delete {record.fullname} </a>
          
        </Space>
      )} />

        </Table>
        </Col>
        </Row>

        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table    dataSource={teacher} title={() => <Title level={4}>Teachers</Title>}>

        <Column title="Name" dataIndex="fullname" key="fullname" />
        <Column title="Contact" dataIndex="contact" key="contact" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Usename" dataIndex="username" key="username" />
         <Column title="Action" d      key="action"
         render={(text, record) => (
        <Space size="middle">
          <a onClick={() => deleteUser(record.username, record.fullname)}>Delete {record.fullname} </a>
          
        </Space>
      )} />

        </Table>
        </Col>
        </Row>

        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table    dataSource={student} title={() => <Title level={4}>Students</Title>}>
         
        <Column title="Name" dataIndex="fullname" key="fullname" />
        <Column title="Contact" dataIndex="contact" key="contact" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Regestration" dataIndex="regno" key="regno" />
        <Column title="Semester" dataIndex="semester" key="semester" sorter={ (a, b) => a.semester - b.semester}  />
         <Column title="Action" d      key="action"
         render={(text, record) => (
        <Space size="middle">
          <a onClick={() => deleteUser(record.username, record.fullname)}>Delete {record.fullname} </a>
          
        </Space>
      )} />

        </Table>
        </Col>
        </Row>
        </Spin>
         </div>
        );

    }

export default fetchdata(AllUsers, `/admin/allusers`) ;
    