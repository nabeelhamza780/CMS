import React, { Component } from 'react';
import { GlobalStyles } from "../utils/util";
import styled from 'styled-components';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';


import Axios from 'axios';
  


  const Wrapper = styled.div`
  display:grid;
  grid-template-columns:60% 40%;
`;

const Fcol = styled.div`
 display:flex;
  flex-direction:column;
  justify-content:center;
 height:100vh;
 padding-left:4rem;
background:#061629;
`;

const HeroText = styled.h1`
font-size:${GlobalStyles.FontSize.lg};
font-weight:600;
color:white;
`;

const FormTitle = styled.h1`
font-size:${GlobalStyles.FontSize.lg};
font-weight:600;
color:${GlobalStyles.Colors.black};
margin-bottom:2.5rem;
`;

const Form = styled.div`
margin-top:4rem;
margin-left:3rem;
`;

const Input = styled.div`
  margin-top:2.5rem;
`;

const InputPlaceholder = styled.p`
  color:${GlobalStyles.Colors.black}
  font-weight:400;
  font-size:1rem;
  margin:0;
  margin-bottom:.8rem;
  opacity:80%;
`;

const InputField = styled.input`
  display:block;
  width:60%;
  border:none;
  outline:none;
  border-bottom:1.5px solid ${GlobalStyles.Colors.black};
  font-family:"Poppins";
  font-size:1.5rem;
`;

const ExtraText = styled.p`
  color:white;
  font-weight:300;
  text-align:left;
  font-size:${GlobalStyles.FontSize.md};
  margin:0;
`;

const Scol = styled.div``; 

const Button = styled.button`
font-size:${GlobalStyles.FontSize.sm};
color:white;
font-family:Poppins,sans-serif;
margin:0;
font-weight:500;
background:#061629;
border:none;
border-radius:2rem;
padding:.8rem 2rem;
margin-top:3rem;
width:60%;
display:block;
cursor: pointer;
`;

const ShowButton = styled.div`
position:absolute;
margin-top:3.5rem;
margin-left:18.8rem;
`;


const InfoText = styled.p`
color:${GlobalStyles.Colors.black};
display:inline-block;
font-weight:400;
text-align:left;
font-size:${GlobalStyles.FontSize.sm};
margin:0;
margin-top:2rem;
`;

const Link  = styled.p`
color:${GlobalStyles.Colors.primary_blue};
font-weight:500;
display:inline-block;
text-align:left;
font-size:${GlobalStyles.FontSize.sm};
margin:0;
`;


const ErrorMessage = styled.p`
color:${GlobalStyles.Colors.error};
font-weight:500;
text-align:left;
font-size:${GlobalStyles.FontSize.sm};
margin:0;
margin-top:.5rem;
display:block;
`;




export default class Signin extends Component {

    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            show_error:false,
            type:"password",
            selected:false,
        }
    }

    render() {

      
        return (
            <Wrapper>
               <Fcol>
                <HeroText>SBBW University Peshawar</HeroText>
                <ExtraText>Admin/Teacher Portal
                </ExtraText>
               </Fcol>

                <Scol>
                <Form>
                    <FormTitle>Sign in</FormTitle>

                    <Input>
                    <InputPlaceholder>username</InputPlaceholder>
                    <InputField onChange={(e)=>{this.setState({username:e.target.value})}}/>
                    </Input>

                    <ShowButton>
                        
                        <Switch checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={this.handleShowPass}/>
                        </ShowButton>

                    <Input>
                    <InputPlaceholder>Password</InputPlaceholder>
                    <InputField type={this.state.type} onChange={(e)=>{this.setState({password:e.target.value})}} />
                    </Input>


                    <Button onClick={()=>{this.Login()}}>Login</Button>
                    {this.state.show_error &&
                        <ErrorMessage >Invalid Credentials</ErrorMessage>
                      }     
                   
                </Form>
                </Scol>


            </Wrapper>
        )
    }

    handleShowPass=(event)=>{
     console.log(event);
        
      this.setState({selected:!(this.state.selected) })
      if( this.state.selected==false )
        this.setState({type:"text"})
      else{ this.setState({type:"password"})}
  }


  

    Login(){

      Axios.post("user/signin",{username:this.state.username,password:this.state.password}).then((resp,error)=>{

        console.log(error)

       if(resp.data)
       {
        console.log(resp.data)
        if(resp.data.type=='admin'){ 
        localStorage.adminLoggedIn = true;
        this.props.history.push("/admin/responselist");
       }
       else if(resp.data.type=='teacher'){
        this.props.history.push("/teacher/teacherhome");
       }
     
      }
        
  
     

      }).catch(error => {
        console.log('login error: ')
        console.log(error);
        this.setState({show_error:true})
        
    })

    }


}
