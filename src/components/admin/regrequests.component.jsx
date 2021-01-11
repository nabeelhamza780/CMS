import React, { useState}from 'react';


import {Table, Row, Col, TreeSelect,message, Typography,Space } from 'antd';

import axios from 'axios';

import fetchdata from '../HigherOrderComponent/fetchdata';

import {useHistory}  from 'react-router';
import 'antd/dist/antd.css';


const {Title, Text} = Typography;
const { TreeNode } = TreeSelect;

const { Column} = Table;
const Regrequest = ({allData}) => {

  

   //local States
    const [SortInfo, setSortInfo] = useState([]);
    const [Value, setValue] = useState();
   

    const history = useHistory();
    



// Function to handle sort
 


     console.log(allData);



      const data = [];
      let i=1;

      allData.map((res) => {
          
          
        data.push({
         key: i,
         courseno: res.coursecode,
         coursename: res.coursename,
         courseDescription: res.courseDescription,
         coursetype: res.coursetype,
         courseCreditHours: res.courseCreditHours,
         coursePrerequisites: res.coursePrerequisites ,
         coursestatus: res.coursestatus,
         status: res.status,
         user:res.user,
         regno:res.regno,
         semester:res.semester
       })
       i++;
       
       return data;
     });
       
      
     const  approve = (no, regno) => {
         console.log(regno);
         axios.post("/admin/approveresponse",{'no':no, regno:regno}).then((res)=>{
          message.info(res.data);
          setTimeout(()=>{window.location.reload()},1600)
          })
         
     }

     const  discard = (no, regno) => {
        console.log(no, regno);
        axios.post("/admin/discardresponse",{'no':no, regno:regno}).then((res)=>{
          message.info(res.data);
          setTimeout(()=>{window.location.reload()},1600)
     
         })
        
    }
         

     return (
     
         <div>   
           
          <Row gutter={[40, 0]}>
          <Col span={24}>
            <Title level={3}>
             Registration Requests
            </Title>
            </Col>
            </Row>


            <Row gutter={[40, 0]}>
           
            <Col className="gutter-row" >
            <Text>
            Sort by:
            </Text>
            </Col>
            <Col className="gutter-row"  span={6}>
         
        <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={Value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
    
      >
      
            <TreeNode value="debit"  title="Course name" />
            <TreeNode value="credit" title="Credit hours" />
            
        
      </TreeSelect>
      </Col>


     
          
            </Row>
            <br />
        
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table    dataSource={data}>

        <Column title="Course Code" dataIndex="courseno" key="courseno" />
      <Column title="Course Name" dataIndex="coursename" key="coursename" />
 
    <Column title="Course CreditHours" dataIndex="courseCreditHours" key="courseCreditHours" />
    <Column title="Semester" dataIndex="semester" key="semester" sorter={ (a, b) => a.semester - b.semester} />
    <Column title="Student" dataIndex="user" key="user" />
    <Column title="Registration no." dataIndex="regno" key="regno" />
    <Column title="Status" dataIndex="status" key="status" />
    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <a onClick={() => approve(record.courseno, record.regno)}>Approve </a>
          <a onClick={() => discard(record.courseno, record.regno)}>Discard </a>
        </Space>
      )}
    />

        </Table>
        </Col>
        </Row>
         
         </div>
        );



    }



export default fetchdata(Regrequest, `/admin/regrequests`) ;
    