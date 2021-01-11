import React,{useEffect, useState} from 'react'
import { Row , List, Col, Typography, Divider, Tag, Table, Card, Spin } from 'antd'
import axios from 'axios';

const { Title,Text, Link } = Typography;
const { Meta } = Card;

const Announcements = (props) => {

    const [records, setRecords] = useState([]);
    const [tableloading, setTableLoading] = useState(true);

    useEffect(() => {
        let mounted = true
         console.log(props.Course.coursename);
        axios.post("/user/getannouncements",{course:props.Course.coursename}).then(res => {
          console.log(res.data);
              const data=res.data.map((res) => (
               {title:res.title,
               description:res.description,
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
          <Text style={{fontSize:'18pt',fontWeight:'bold' }}>Announcements</Text>
          </Col>
          {/* <Col>
          <Text style={{fontSize:'18pt',marginLeft:'10px'}}>Bs Computer Science</Text>
          </Col> */}
        </Row>
        <Divider />
        {records.length > 0
        ?<Row justify='space-around'>
        {records.map(record=>(
          <Col>
          <Card
           hoverable
           style={{ width: 240 }}
           >
         <Meta title={record.title} description={record.description}/>
         </Card>
          </Col>)
)}
          
        </Row>
        : <Row><Text> No Announcements! </Text> </Row> }
    </div>
    </Spin>
);

}
export default Announcements