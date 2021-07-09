import React,{useContext} from 'react'
import { Navbar, Button } from 'react-bootstrap'
import {NavLink,useHistory,useLocation } from 'react-router-dom'
import {Context} from './Genel'
import Logo from '../images/Toros_University_Logo.png'

export function Navbars() {
  const { name, logout,level } = useContext(Context).state;
  let history = useHistory()
  let location = useLocation()
  return (
    <Navbar bg="light" expand="lg">
      <NavLink to="/" className="navbar-brand"><img src={ Logo }alt="logo" width="40rem"/></NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" >
          <NavLink to="/" exact
            className="nav-link"
            activeStyle={{
            fontWeight: "bold",
            color: "blue"
            }}>
          Main Page
          </NavLink>
        {(level === 1 || level === 0) &&
          <NavLink to="/grades" exact
          className="nav-link"
          activeStyle={{
            fontWeight: "bold",
            color: "blue"
          }}>
            Grades
          </NavLink>
        }
        {(level !== null) &&
          <NavLink to="/settings" exact
          className="nav-link"
          activeStyle={{
            fontWeight: "bold",
            color: "blue"
          }}>
            Settings
          </NavLink>
        }
          
  </Navbar.Collapse>
  <Navbar.Collapse className="justify-content-end">
  {
          name == null ?
            <NavLink to={location.pathname === "/login" ? "/register" : "/login"} exact
              className="nav-link"
              activeStyle={{
              fontWeight: "bold",
              color: "blue"
              }}>
              {location.pathname==="/login"?"Register":"Login"}
            </NavLink >:
            <>
        <Navbar.Text>
                <span className="alert" style={{"color":"red"}}>
                {level === 0 ? "Student" : level === 1 ? "Teacher" : level === 2 ? "Admin" : ""}
                </span>
                <span  className="alert" style={{"color":"blue"}}>
                Signed in as: {name}
                </span>
            </Navbar.Text>
            <Button variant="outline-info" onClick={() => {
              logout();
              history.push("/")
            }}>Logout</Button>
            </>
          }
          </Navbar.Collapse>
</Navbar>
  )
}
