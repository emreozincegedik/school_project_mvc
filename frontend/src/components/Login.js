import React,{useState,useContext} from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import crypto from "crypto"
import { useHistory,NavLink } from 'react-router-dom'
import { Context} from "./index"

export function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [color, setColor] = useState("red")

  const { login } = useContext(Context).state

  let history=useHistory()
  
  const usernameChange = e => {
    setUsername(e.target.value)
  }
    const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    setColor("red")
    if (username==="") {
      setError(true)
      setErrorMessage("Fill Username")
      return
    }
    if (password==="") {
      setError(true)
      setErrorMessage("Fill Password")
      return
    }
    const pwd = crypto.createHash('sha256').update(password).digest('hex');
    setError(true)
    setColor("blue")
    setErrorMessage("Logging in...")
    fetch('http://localhost:5000/login',{
      method: 'POST',
      body: JSON.stringify({
        "username":username,
        "password":pwd
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status!==200) {
        setColor("red")
        res.json().then(json => {
          // console.log(json)
          setErrorMessage(JSON.stringify(json.msg))
          return
        })
      }
      else {
        //login now

        res.json().then(json => {
          if (json.pending===1) {
            setColor("red")
            setErrorMessage("Your teacher registration is pending for admin approval")
            return
          } else if (json.pending === 2) {
            setColor("red")
            setErrorMessage("Your teacher registration has been denied by admin")
            return
          }
          else {
            var location = ""
            // console.log(json)
            login(json.id,json.username,json.password,json.level,json.name)
            switch (json.level) {
              case 2:
                location="/admin"
                break;
              case 1:
                location="/teacher"
                break;
              case 0:
                location="/student"
                break;
            
              default:
                break;
            }
            history.push(location)
          }
        })
      }
    })
    
    
    // console.log(username,pwd)
  }

  return (
    <div className="vertical-center">
      <Container >
        <form onSubmit={e => handleSubmit(e)}>
          <div className="border " style={{ padding: "3rem" }}>
            <h1>
              Login
            </h1>
            <Row>
              <Col className="form-group">
                <label className="form-label" htmlFor="username">Username</label>  
                <input value={ username } onChange={(e)=>usernameChange(e)} placeholder="Username" className="form-control" id="username"/>
              </Col>
            </Row>
            <Row>
              <Col className="form-group">
                <label className="form-label" htmlFor="password">Password</label>  
                <input type="password" value={ password } onChange={(e)=>passwordChange(e)} placeholder="Password" className="form-control" id="password"/>
              </Col>
            </Row>
            {error? <Row>
              <Col style={{ "textAlign": "center" }}>
                <h5 style={{ color: color }}>{errorMessage}</h5>
              </Col>
            </Row>:<></>}
            <Row>
              <Col>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <br/>
              </Col>
            </Row>

            <Row >
              <Col style={{ "textAlign": "end" }}>
                <NavLink  to="/register" exact>Register</NavLink>
              </Col>
            </Row>
            </div>
        </form>
      </Container>
    </div>

  )
}
