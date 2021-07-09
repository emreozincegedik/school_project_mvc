import React, { useContext } from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { Context,Calendar,ClassSelect } from '../components'
import {Error} from './index'

export function Student() {
  const { level} = useContext(Context).state

  if (level!==0) return <Error/>
  return (
    <Container >
      <Row>
        <Col>
            <Calendar/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ClassSelect/>
        </Col>
      </Row>
    </Container>
  )
}
