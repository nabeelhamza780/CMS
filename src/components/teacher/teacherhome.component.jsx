import React, { useState}from 'react';


import {Table, Row, Col, TreeSelect,message, Typography,Space } from 'antd';

import axios from 'axios';

import fetchdata from '../HigherOrderComponent/fetchdata';

import {useHistory}  from 'react-router';
import 'antd/dist/antd.css';


const {Title, Text} = Typography;
const { TreeNode } = TreeSelect;

const { Column} = Table;
const TeacherHome = ({allData}) => {

  

   //local States
    const [SortInfo, setSortInfo] = useState([]);
    const [Value, setValue] = useState();
   

    const history = useHistory();
    
console.log(allData);


// Function to handle sort
      const  onChange = value => {
        setValue( value );
        switch(value){
            case'coursename':
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


     



      const data = [];
      let i=1;

      allData.map((res) => {
          
          
        data.push({
         key: i,
         coursecode: res.coursecode,
         coursename: res.coursename,
         courseDescription: res.courseDescription,
         coursetype: res.coursetype,
         courseCreditHours: res.courseCreditHours,
         coursePrerequisites: res.coursePrerequisites ,
         coursestatus: res.coursestatus,
         status: res.status,
       })
       i++;
       
       return data;
     });
       
      



         

     return (
     
         <div>   
           
                   <Row gutter={[40, 0]}>
          <Col span={24}>
            <Title level={3}>
            Courses Assigned To You
            </Title>
            </Col>
            </Row>


   
            <br />
        
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table    dataSource={data}>

        <Column title="Course Code" dataIndex="coursecode" key="coursecode" />
        <Column title="Course Name" dataIndex="coursename" key="coursename" />
     
 
    <Column title="Course CreditHours" dataIndex="courseCreditHours" key="courseCreditHours" />
    
    <Column title="Course Type" dataIndex="coursetype" key="coursetype" />
   


        </Table>
        </Col>
        </Row>
         
         </div>
        );



    }



export default fetchdata(TeacherHome, `/teacher/teachercourses`) ;
    