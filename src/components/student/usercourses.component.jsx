import React, { useState}from 'react';


import {Table, Row, Col, TreeSelect,message, Typography,Space,Layout,Divider } from 'antd';

import axios from 'axios';

import fetchdata from '../HigherOrderComponent/fetchdata';

import {useHistory}  from 'react-router';
import 'antd/dist/antd.css';


const {Title, Text} = Typography;
const { TreeNode } = TreeSelect;
const { Content } = Layout;

const { Column} = Table;
const UserCourseslist = ({allData, loaded}) => {

  

   //local States
    const [SortInfo, setSortInfo] = useState([]);
    const [Value, setValue] = useState();
   

    const history = useHistory();
    



// Function to handle sort
      const  onChange = value => {
        setValue( value );
        switch(value){
            case'debit':
            setSortInfo(
                {
                    order: 'descend',
                    columnKey: 'debit',
                  },
                );
                break
            case'credit':
        
                
            default:
                setSortInfo(
                    {
                        order: '',
                        columnKey: '',
                      },
                    );

         }
      };


     


 console.log(allData);
      const data = [];
      let i=1;

      allData.map((res) => {
          
          
        data.push({
         key: i,
         coursecode: res.coursecode,
         coursename:res.coursename,
         courseDescription: res.courseDescription,
         coursetype: res.coursetype,
         courseCreditHours: res.courseCreditHours,
         coursePrerequisites: res.coursePrerequisites ,
         coursestatus: res.coursestatus,
         status: res.status,
         instructor:res.instructor
       })
       i++;
       
       return data;
     });
       
      
     const  approve = (coursecode,coursename,courseCreditHours,instructor) => {
        
         axios.post("/user/register",{'coursecode':coursecode,"coursename":coursename,"courseCreditHours":courseCreditHours,"instructor":instructor}).then((res)=>{
    
          message.info(res.data.msg);
         
          history.push('/student/registeredcourses');
         
         
      
          })
         
     }

   
         

     return (
     
    <Row justify='center' >
      <Content
      className="site-layout-background"
      style={{
        margin: '20px 16px',
        padding: 24,
        borderRadius:'7px',
      }}
    >
          
           <Col  style={{textAlign:'center'}}>
          <h1 style={{fontSize:'16pt',color:'#fead01', fontWeight:'bolder' }} > Register Courses</h1>
          </Col>
           
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
       onChange={onChange}
     >
     
           <TreeNode value="coursename"  title="Course Name" />
           <TreeNode value="coursecode" title="Credit hours" />
      
       
     </TreeSelect>
     </Col>

     <Divider />
        <Table dataSource={data} loading={loaded}>
        <Column title="Course Code" dataIndex="coursecode" key="coursecode" />
        <Column title="Course Name" dataIndex="coursename" key="coursename" />
      <Column title="CourseDescription" dataIndex="courseDescription" key="courseDescription" />
     <Column title="Course CreditHours" dataIndex="courseCreditHours" key="courseCreditHours" />
    <Column title=" Course Prerequisites" dataIndex="coursePrerequisites" key="coursePrerequisites" />
    <Column title="Course Type" dataIndex="coursetype" key="coursetype" />

    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <a onClick={() => approve(record.coursecode,record.coursename,record.courseCreditHours,record.instructor)}>Register {record.coursename}</a>
         
        </Space>
      )}/>
    
        </Table>
    
         </Content>
           </Row>
        );



    }



export default fetchdata(UserCourseslist, `/user/coursesforreg`) ;
    