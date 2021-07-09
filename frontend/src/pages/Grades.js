import React,{useContext} from 'react'
import { Context, TeacherClassGrade,StudentClassGrade } from "../components"
import {Error} from './index'
import { Row, Container, Col } from 'react-bootstrap'

export function Grades() {
  const { level } = useContext(Context).state

  return <Container >
      <Row>
      <Col>
        {level === 0 ?
          <StudentClassGrade /> :
          level === 1 ?
            <TeacherClassGrade /> :
            <Error/>
        }
      </Col>
    </Row>
  </Container>
}
