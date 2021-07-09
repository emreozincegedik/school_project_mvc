import React, { useState, useContext } from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap'
import { Context,ClassCreate,Calendar,TeacherClassApprove } from '../components'
import {Error} from './index'

export function Teacher() {
  const { level } = useContext(Context).state
  if (level!==1) return <Error/>

  

  return (
    <Container >
      {/* <h1 style={{ "textAlign": "center" }}>Admin page</h1> */}
      <Row>
        <Col>
            <Calendar/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ClassCreate />
        </Col>
      </Row>
      <Row>
        <Col>
          <TeacherClassApprove/>
        </Col>
      </Row>
    </Container>
  )
}
