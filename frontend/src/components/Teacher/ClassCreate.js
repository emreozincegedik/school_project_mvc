import React,{useState,useContext} from 'react'
import { Row, Dropdown, Col, Button } from 'react-bootstrap'
import {Context} from '../Genel'


export function ClassCreate(props) {
  const [className, setclassName] = useState("")
  const [selectedDay, setselectedDay] = useState(-1)
  const [selectedHour, setSelectedHour] = useState(-1)
  const [selectedDayDropdown, setSelectedDayDropdown] = useState("Select Day")
  const [selectedHourDropdown, setSelectedHourDropdown] = useState("Select Hour")
  const [color, setColor] = useState("red")
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const { id,fetchClasses }=useContext(Context).state
  
  const hours = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
  ]
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ]

  const classNameChange = (e) => {
    setclassName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (className==="" || selectedHour===-1 || selectedDay===-1) {
      setError(true)
      setErrorMsg("Fill and select everything")
      return
    }
    setColor("blue")
    setError(true)
    setErrorMsg("Adding class...")

    fetch('http://localhost:5000/classes/insert',{
      method: 'POST',
      body: JSON.stringify({
        teacherId:id,
        className: className,
        hour: selectedHour,
        day: selectedDay
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        res.json().then(json => {
          if (res.status !== 200) {
            setColor("red")
            setError(true)
            setErrorMsg(JSON.stringify(json.msg))
            // setErrorMsg("a")
          }
          else {
            setError(true)
            setColor("blue")
            setErrorMsg(json.msg)
            fetchClasses()
            
        
          }
        }).catch(err => {
          setColor("red")
          setError(true)
          setErrorMsg("Server didn't respond")
        })
    })  
  }
  return (
    <div className="border " style={{ padding: "1rem" }}>
      <h4 style={{ "textAlign": "center" }}>Create class</h4>
      <form onSubmit={e=>handleSubmit(e)}>
      <Row>
        <Col>
          <label className="form-label" htmlFor="className">Class Name</label>  
          <input value={ className } onChange={(e)=>classNameChange(e)} placeholder="Class Name" className="form-control" id="className"/>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 style={{ "textAlign": "center" }}>Select Day</h5>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="btn btn-default btn-block">
              {selectedDayDropdown}
            </Dropdown.Toggle>

            <Dropdown.Menu  className="btn btn-default btn-block">
              {days.map((day,i) => 
                <Dropdown.Item onClick={() => {
                  setselectedDay(i)
                  setSelectedDayDropdown(days[(i)])
                }}>{day}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <h5 style={{ "textAlign": "center" }}>Select Hour</h5>
          <Dropdown >
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="btn btn-default btn-block">
              {selectedHourDropdown}
            </Dropdown.Toggle>

            <Dropdown.Menu className="btn btn-default btn-block">
              {hours.map((hour,i) => i!==3 &&
                <Dropdown.Item onClick={() => {
                  setSelectedHour(i+9)
                  setSelectedHourDropdown(hours[i])
                  //i+9 database'e
                }}>{hour}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col>
          {error ? <>
            <br />
          <h6 style={{"color":color, "textAlign": "center" }} >
            {errorMsg}
          </h6>
          </>
            :
            <></>
            }
          </Col>
        </Row>
        <Row>
            <Col>
                <br/>
                <button type="submit" className="btn btn-primary btn-block">Add Class</button>
                <br/>
            </Col>
          </Row>
      </form>
    </div>
  )
}
