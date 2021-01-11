import React,{useEffect, useState} from 'react'
import { Row , List, Col, Typography, Divider, Tag, Table, Card,Spin } from 'antd'
import {
    DownloadOutlined,
  } from '@ant-design/icons';
import axios from 'axios';

const { Title,Text, Link } = Typography;
const { Meta } = Card;

const Contents = (props) => {

    const [records, setRecords] = useState([]);
    const [tableloading, setTableLoading] = useState(true);

    useEffect(() => {
        let mounted = true
         console.log(props.Course.coursename);
        axios.post("/user/content",{course:props.Course.coursename}).then(res => {
          console.log(res.data);
              const data=res.data.map((res) => (
               {
                course:res.course,
                type:res.type,
                title:res.title,
                file:res.file
            }
              ));
              setRecords(data);
              setTableLoading(false);
           
            });
        return function cleanup() {
          mounted = false
      
      }
    
      },[]);

  
    
      
return(
    <Spin spinning={tableloading}>
    <div style={{margin:'30px 0px'}}>
           
           <Row justify='space-around'>
          <Col>
          <Text style={{fontSize:'18pt',fontWeight:'bold' }}>Content</Text>
          </Col>
          {/* <Col>
          <Text style={{fontSize:'18pt',marginLeft:'10px'}}>Bs Computer Science</Text>
          </Col> */}
        </Row>
        <Divider />
        {records.length>0
        ?<Row justify='space-around'>
          {records.map(record=>(<Col>
            <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <DownloadOutlined key="download" />,
            ,
          ]}
        >
  
            <Meta
             
             
              title={record.title}
              description={record.file}
            />
       
        </Card>
          </Col>)
          )}
        </Row>
        : <Row><Text> No Content! </Text> </Row> }
    </div>
    </Spin>
);

}
export default Contents