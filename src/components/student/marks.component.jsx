import React , {useEffect, useState} from 'react'
import { Row , List, Col, Typography, Divider, Table, Spin } from 'antd'
import axios from 'axios';

const { Title,Text, Link } = Typography;

const Marks = (props) => {
    const [Quizes, setQuizes] = useState([]);
    const [Assignments, setAssignment] = useState([]);
    const [Sessionals, setSessional] = useState([]);
    const [tableloading, setTableLoading] = useState(true);

    useEffect(() => {
        let mounted = true
         console.log(props.Course.coursename);
        axios.post("/user/getmarks",{course:props.Course.coursename}).then(res => {
          console.log(res.data);
              let Quiz = []
              let Assignment = []
              let Sessional = []

          res.data.forEach((data) => {
            if(data.type === 'Quiz'){
                Quiz.push({
                    date:data.date,
                    instructor:data.instructor,
                    type:data.type,
                    detail:data.detail,
                    user:data.user,
                    obtainedmarks:data.obtainedmarks,
                    totalmarks:data.totalmarks
    
                   })
            }
            else if(data.type === 'Assignment'){
                Assignment.push( {
                    date:data.date,
                    instructor:data.instructor,
                    type:data.type,
                    detail:data.detail,
                    user:data.user,
                    obtainedmarks:data.obtainedmarks,
                    totalmarks:data.totalmarks
    
                   })
            }
            else{
                Sessional.push( {
                    date:data.date,
                    instructor:data.instructor,
                    type:data.type,
                    detail:data.detail,
                    user:data.user,
                    obtainedmarks:data.obtainedmarks,
                    totalmarks:data.totalmarks
    
                   })
            }
           
              });
              setQuizes(Quiz)
              setSessional(Sessional)
              setAssignment(Assignment)
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
          key: 'date',
        },
        {
            title: 'Name',
            dataIndex: 'detail',
            key: 'detail',
          },
         
        {
            title: 'Obtained Marks',
            key: 'obtainedmarks',
            dataIndex: 'obtainedmarks',
          },
          {
            title: 'Total Marks',
            key: 'totalmarks',
            dataIndex: 'totalmarks',
          },
      ];

return(
    <Spin spinning={tableloading}>
    <div style={{margin:'30px 0px'}}>
           
           <Row justify='space-around'>
          <Col>
          <Text style={{fontSize:'18pt',fontWeight:'bold' }}>Marks Summry</Text>
          </Col>
          {/* <Col>
          <Text style={{fontSize:'18pt',marginLeft:'10px'}}>Bs Computer Science</Text>
          </Col> */}
        </Row>
        <Divider />
        <Row justify='space-around' style={{margin:'30px 0px'}}>
          <Col>
          <Text style={{fontSize:'14pt', }}>Quizes</Text>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={23}>
          <Table size={5} columns={columns} dataSource={Quizes}></Table>
          </Col>
        </Row>
        <Row justify='space-around' style={{margin:'30px 0px'}}>
          <Col>
          <Text style={{fontSize:'14pt', }}>Assignments</Text>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={23}>
          <Table size={5} columns={columns} dataSource={Assignments}></Table>
          </Col>
        </Row>
        <Row justify='space-around' style={{margin:'30px 0px'}}>
          <Col>
          <Text style={{fontSize:'14pt', }}>Sessionals</Text>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={23}>
          <Table size={5} columns={columns} dataSource={Sessionals} ></Table>
          </Col>
        </Row>

    </div>
    </Spin>
);

}
export default Marks