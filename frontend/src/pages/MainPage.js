import React,{useContext} from 'react'
import { Row,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from '../images/Toros_University_Logo.png'
import {Context} from '../components'
import {Student,Teacher,Admin} from './index'

export function MainPage() {
  const { level } = useContext(Context).state

  if (level===0) return <Student/>
  if (level===1) return <Teacher/>
  if (level===2) return <Admin/>
  return (
    <div className="vertical-center">
      <Container >
        <div className="border " style={{ padding: "3rem" }}>
          <div className="text-center">
            <img src={Logo} alt="Toros_University_Logo.png" width="200rem"/>
          </div>
          <br/>
          <h1 style={{"textAlign": "center"}}>Welcome to Toros University</h1>
          <br/>
          <br/>
          <Row>
            <Link to="/login" className="btn btn-outline-primary btn-block" >Login</Link>
          </Row>
          <br/>
          <br/>
          <Row>
            <Link to="/register" className="btn btn-outline-primary btn-block" >Register</Link>
          </Row>
        </div>
      </Container>
    </div>
  )
}
