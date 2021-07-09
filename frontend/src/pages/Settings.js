import React,{useContext,useState} from 'react'
import { Row, Container,Col,Button } from 'react-bootstrap'
import { Context } from '../components'
import crypto from "crypto"
import { Error } from "./index"

export function Settings() {
  const { level,username,name,password,updatePassword } = useContext(Context).state
  
  const [passwordInput, setPasswordInput] = useState("")
  const [newPasswordInput, setNewPasswordInput] = useState("")
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState("")
  
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [errorColor, setErrorColor] = useState("red")
  if (level===null) return <Error/>
  const passwordInputChange = (e) => {
    setPasswordInput(e.target.value)
  }
  const newPasswordInputChange = (e) => {
    setNewPasswordInput(e.target.value)
  }
  const confirmNewPasswordInputChange = (e) => {
    setConfirmNewPasswordInput(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const pwd = crypto.createHash('sha256').update(passwordInput).digest('hex');
    const pwdNew = crypto.createHash('sha256').update(newPasswordInput).digest('hex');
    setError(false)
    setErrorMsg("")
    setErrorColor("red")
    // console.log(password,passwordInput)
    
    if (pwd!==password) {
      setError(true)
      setErrorMsg("Old password is wrong")
      setErrorColor("red")
      return
    }
    if (newPasswordInput==="" || confirmNewPasswordInput==="") {
      setError(true)
      setErrorMsg("Fill new password and confirmation")
      setErrorColor("red")
      return
    }
    if (newPasswordInput!==confirmNewPasswordInput) {
      setError(true)
      setErrorMsg("New password and confirmation don't match")
      setErrorColor("red")
      return
    }
    fetch('http://localhost:5000/user/update', {
      method: 'POST',
      body: JSON.stringify({
        username: username, 
        oldPassword: pwd,
        newPassword: pwdNew
      }),
      headers: { 'Content-Type': 'application/json' }
      
    })
      .then(res => res.json()
        .then(json => {
          setError(true)
          setErrorColor(res.status === 200 ? "blue" : "red")
          // console.log(json)
          setErrorMsg(json.msg)
          updatePassword(pwdNew)
          setPasswordInput("")
          setNewPasswordInput("")
          setConfirmNewPasswordInput("")
        })
      )
  
    
  }

  return (
    <div className="vertical-center">
      <Container >
        
        <form onSubmit={e => handleSubmit(e)}>
          <div className="border " style={{ padding: "3rem" }}>
            <Row>
              <Col>
            <h1>
              User info
            </h1>
              <div>
        Username: {username }
        </div>
        <div>
        Level: {level===0?"Student":level===1?"Teacher":"Admin" }
        </div>

        <div>
        Name: {name }
        </div>
              </Col>
              <Col className="form-group">
            <h1>
              Change Password
            </h1>
                <label className="form-label" htmlFor="passwordOld">Old Password</label>  
                <input type="password" value={ passwordInput } onChange={(e)=>passwordInputChange(e)} placeholder="Old Password" className="form-control" id="passwordOld"/>
                <label className="form-label" htmlFor="passwordNew">New Password</label>  
                <input type="password" value={ newPasswordInput } onChange={(e)=>newPasswordInputChange(e)} placeholder="New Password" className="form-control" id="passwordNew"/>
                <label className="form-label" htmlFor="passwordNewConfirm">Confirm New Password </label>  
                <input type="password" value={ confirmNewPasswordInput } onChange={(e)=>confirmNewPasswordInputChange(e)} placeholder="Confirm New Password" className="form-control" id="passwordNewConfirm"/>
                <br />
                {error ? <><div style={{ "color": errorColor }}>{ errorMsg}</div><br /></>:""}
                
                <button type="submit" className="btn btn-primary btn-block">Update</button>
              </Col>
            </Row>
          </div>
        </form>
      </Container>
    </div>
  )
}
