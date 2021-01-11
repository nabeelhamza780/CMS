import React, { useState}from 'react';


import {Table, Row, Col, TreeSelect,message, Typography,Space,Button, Radio } from 'antd';

import axios from 'axios';

import fetchdata from '../HigherOrderComponent/fetchdata';

import {useHistory}  from 'react-router';
import 'antd/dist/antd.css';


const {Title, Text} = Typography;
const { TreeNode } = TreeSelect;

const { Column} = Table;
const Courseslist = ({allData}) => {

  

   //local States
    const [SortInfo, setSortInfo] = useState([]);
    const [Value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

const deleteCourse = courseCode => {
  setLoading(true);
  axios.post("/admin/deletecourse", 
  {coursecode:courseCode}
)
.then(res => {
  setLoading(false);
  message.info(res.data.msg);
  setTimeout(()=>{window.location.reload()},2000)

}).catch(error => {
  setLoading(false);
  message.error("error");
})

}


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

const onRegChange = (e) => {
console.log(e.target.value);
setLoading(true);
  axios.post("/admin/togglereg", 
  {status:e.target.value}
)
.then(res => {
  setLoading(false);
  message.info(res.data.msg);

}).catch(error => {
  setLoading(false);
  message.error("error");
})

}
     



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
         instructor:res.instructor,
         regstatus:res.regstatus
       })
       i++;
       return data;
     });
       
    
     return (
     
         <div>   
           
          <Row gutter={[40, 0]}>
          <Col span={24}>
            <Title level={3}>
            Courses Available 
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
        onChange={onChange}
      >
      
            <TreeNode value="debit"  title="Course name" />
            <TreeNode value="credit" title="Credit hours" />
           
        
      </TreeSelect>
      </Col>
      <Col className="gutter-row" >
            <Text>
            Regestration:
            </Text>
            </Col>
         <Col>
          <Radio.Group buttonStyle="solid" onChange={onRegChange} optionType='button'>
          <Radio.Button value="opened">Open</Radio.Button>
          <Radio.Button value="closed">Close</Radio.Button>
         </Radio.Group>
         </Col>
     
          
            </Row>
            <br />
        
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table    dataSource={data} loading={loading}>

        <Column title="Course No" dataIndex="coursecode" key="coursecode" />
        <Column title="Course Name" dataIndex="coursename" key="coursename" />
      <Column title="CourseDescription" dataIndex="courseDescription" key="courseDescription" />
 
    <Column title="Course CreditHours" dataIndex="courseCreditHours" key="courseCreditHours" />
    <Column title=" Course Prerequisites" dataIndex="coursePrerequisites" key="coursePrerequisites" />
    <Column title="Course Type" dataIndex="coursetype" key="coursetype" />
    <Column title="Instructor Assigned" dataIndex="instructor" key="instructor" />
    <Column title="Action" d      key="action"
      render={(text, record) => (
        <Space size="middle">
          <a onClick={() => deleteCourse(record.coursecode)}>Delete Course </a>
          
        </Space>
      )} />

        </Table>
        </Col>
        </Row>
         
         </div>
        );



    }



export default fetchdata(Courseslist, `/admin/courses`) ;
    