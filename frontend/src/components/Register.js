import React,{useState} from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import crypto from "crypto"
import { useHistory,NavLink } from 'react-router-dom'

export function Register() {
  
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [level, setLevel] = useState(0)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [color, setColor] = useState("red")
  let history = useHistory()
  

  const nameChange = (e) => {
    setName(e.target.value)
  }
  const usernameChange = (e) => {
    setUsername(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const passwordAgainChange = (e) => {
    setPasswordAgain(e.target.value)
  }
  const levelChange = (e) => {
    console.log(e.target.value)
    setLevel(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setColor("red")
    if (name==="") {
      setError(true)
      setErrorMessage("Fill Name and Surname")
      return
    }
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
    if (passwordAgain==="") {
      setError(true)
      setErrorMessage("Fill Confirm Password")
      return
    }
    if (password!==passwordAgain) {
      setError(true)
      setErrorMessage("Passwords don't match")
      return
    }
    setColor("blue")
    setError(true)
    setErrorMessage("Registering...")
    const pwd = crypto.createHash('sha256').update(password).digest('hex');
    // console.log(name, username, pwd, level)
    fetch('http://localhost:5000/register',{
      method: 'POST',
      body: JSON.stringify({
        "username":username,
        "password":pwd,
        "level":level,
        "pending": level,
        "name":name
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status !== 200) {
        setColor("red")
        setError(true)
        res.json().then(json=>setErrorMessage(json.msg))
        // setErrorMessage("a")
        }
      else {
        setErrorMessage("Successfully registered. You will be redirected to login page")
        setTimeout(() => {
          history.push("/login")
          
        }, 2000);
        }
    })    
  }
  return (
    <div className="vertical-center">
      <Container >
        <form onSubmit={e=>handleSubmit(e)}>
        <div className="border " style={{ padding: "3rem" }}>
          <h1>
            Register
          </h1>
          <Row>
            <Col className="form-group">
              <label className="form-label" htmlFor="name">Name and Surname</label>  
              <input value={ name } onChange={(e)=>nameChange(e)} placeholder="Name and Surname" className="form-control" id="name"/>
            </Col>
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
            <Col className="form-group">
              <label className="form-label" htmlFor="passwordAgain">Password Again</label>  
              <input type="password" value={ passwordAgain } onChange={(e)=>passwordAgainChange(e)} placeholder="Password Again" className="form-control" id="passwordAgain"/>
            </Col>
            </Row>
            {error? <Row>
              <Col style={{ "textAlign": "center" }}>
                <h5 style={{ color: color }}>{errorMessage}</h5>
              </Col>
            </Row>:<></>}
          <Row>
            <Col>
              <div onChange={(e)=>levelChange(e)} className="justify-content-around">
                <input type="radio" value="0" name="levels" defaultChecked /> Student
                <br/>
                <input type="radio" value="1" name="levels" /> Teacher
                <br/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
                <br/>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <br/>
            </Col>
          </Row>
          <Row >
            <Col style={{ "textAlign": "end" }}>
              <NavLink  to="/login" exact>Login</NavLink>
            </Col>
          </Row>
          </div>
        </form>
      </Container>
    </div>
  )
}
