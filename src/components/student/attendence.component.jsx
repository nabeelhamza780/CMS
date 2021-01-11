import React,{useEffect, useState} from 'react'
import { Row , List, Col, Typography, Divider, Tag, Table } from 'antd'
import axios from 'axios';

const { Title,Text, Link } = Typography;

const Attendence = (props) => {

    const [records, setRecords] = useState([]);
    const [tableloading, setTableLoading] = useState(true);

    useEffect(() => {
        let mounted = true
         console.log(props.Course.coursename);
        axios.post("/user/student-attendence",{course:props.Course.coursename}).then(res => {
          console.log(res.data);
              const data=res.data.map((res) => (
               {date:res.date,
               lecture:res.lecture,
               status:res.status}
              ));
              setRecords(data);
              setTableLoading(false);
           
            });
        return function cleanup() {
          mounted = false
      
      }
    
      },[]);

      const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          sorter: {
            compare: (a, b) => a.date - b.date,
            multiple: 1,
          },
          
        },
        {
            title: 'Lecture',
          dataIndex: 'lecture',
          
        },
        {
            title: 'Status',
          dataIndex: 'status',
          render: tag => (
            <span>
            {tag === 'present'?<Tag color="green">present</Tag> : <Tag color="red">absent</Tag>}
            </span>
          ),
          
        }
    ]
    
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
      
return(
    <div style={{margin:'30px 0px'}}>
           
           <Row justify='space-around'>
          <Col>
          <Text style={{fontSize:'18pt',fontWeight:'bold' }}>Attendance</Text>
          </Col>
          {/* <Col>
          <Text style={{fontSize:'18pt',marginLeft:'10px'}}>Bs Computer Science</Text>
          </Col> */}
        </Row>
        <Divider />
        <Row justify='space-around'>
          <Col>
          <Text style={{fontSize:'14pt', }}>Lecture Proceeding Details</Text>
          </Col>
          {/* <Col>
          <Text style={{fontSize:'18pt',marginLeft:'10px'}}>Bs Computer Science</Text>
          </Col> */}
        </Row>
    <Row justify='center'>
    <Table columns={columns} dataSource={records} style={{minWidth:'70vw'}} loading={tableloading} />
        
    </Row>
    </div>
);

}
export default Attendence