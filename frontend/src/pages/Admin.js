import React, { useContext } from 'react'
import { Row,Container,Dropdown,Col,Button } from 'react-bootstrap'
import { Context, TeacherApprove,ClassApprove } from '../components'
import {Error} from './index'

export function Admin() {


  const { id,name,username,password,level} = useContext(Context).state
  
  
  if (level!==2) return <Error/>
  return (
    <Container >
      <h1 style={{ "textAlign": "center" }}>Admin page</h1>
      <Row>
        <Col>
            <TeacherApprove/>
        </Col>
        
        </Row>
      <Row>
        <Col>
            <ClassApprove/>
        </Col>
        
        </Row>
    </Container>
  )
}
