import React,{useState,useEffect,useContext} from 'react'
import { Context } from "../index"
import { Row,Dropdown,Col,Button } from 'react-bootstrap'

export function ClassApprove() {
  const [pendingClasses, setPendingClasses] = useState([])
  const [selectedClassName, setSelectedClassName] = useState("Class Name")
  const [selectedTeacherName, setSelectedTeacherName] = useState("Teacher Name")
  const [selectedDay, setSelectedDay] = useState("Class Day")
  const [selectedHour, setSelectedHour] = useState("Class Hour")
  const [selectedClassId, setSelectedClassId] = useState(null)

  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [color, setColor] = useState("red")
  
  const {days,classes}=useContext(Context).state
  const fetchPendingClasses = () => {
    fetch('http://localhost:5000/classes/select', {
      method: 'POST',
      body: JSON.stringify({
        "pending": 1,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json()
        .then(json => {
          setPendingClasses(json)
          console.log(json)
        })
      )
  }
  const classDecision = (pending) => {
    fetch('http://localhost:5000/classes/update', {
      method: 'POST',
      body: JSON.stringify({
        "pending": pending,
        "id": selectedClassId,
        "name":selectedClassName
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json()
        .then(json => {
          if (res.status!==200) {
            setError(true)
            setErrorMsg(JSON.stringify(json))
            setColor("red")
          }
          else {
            setError(true)
            setSelectedClassId(null)
            setSelectedClassName("Class Name")
            setSelectedTeacherName("Teacher Name")
            setSelectedDay("Class Day")
            setSelectedHour("Class Hour")
            setErrorMsg(json.msg)
            setColor("blue")
            fetchPendingClasses()
            
          }
        })
      )
  }
  useEffect(() => {
    fetchPendingClasses()
  }, [])
  return (
    <div className="border " style={{ padding: "1rem" }}>
            <h4 style={{ "textAlign": "center" }}>Classes pending for approval</h4>
            <Row>
              <Col>
                <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Classes Waiting for approval
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {pendingClasses.map((eachClass) => 
                      <Dropdown.Item onClick={() => {
                        setSelectedClassName(eachClass.name)
                        setSelectedTeacherName(eachClass.tname)
                        setSelectedDay(days[eachClass.day])
                        setSelectedHour(classes[eachClass.hour-9][0])
                        setSelectedClassId(eachClass.id)

                        // setTeacherForApprovalID(teacher.id)
                        // setTeacherForApprovalName(teacher.name)
                        // setError(false)
                      }}>{eachClass.name}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col style={{ "textAlign": "center", "top": "50%" }} className="">
                <h5>Teacher Name</h5>
                {selectedTeacherName}
              </Col>
              <Col style={{ "textAlign": "center", "top": "50%" }} className="">
                <h5>Class Name</h5>
                {selectedClassName}
              </Col>
              <Col style={{ "textAlign": "center", "top": "50%" }} className="">
                <h5>Day</h5>
                {selectedDay}
              </Col>
              <Col style={{ "textAlign": "center", "top": "50%" }} className="">
                <h5>Hour</h5>
                {selectedHour}
              </Col>
              <Col>
                <Button className="btn-block" variant="success" disabled={selectedClassId===null} onClick={()=>classDecision(0)}>Approve</Button>
                <Button className="btn-block" variant="danger"  disabled={selectedClassId===null} onClick={()=>classDecision(2)}>Deny</Button>
              </Col>
            </Row>
            <Row>
              <Col  style={{ "textAlign": "center", "top": "50%" }}>
                {error?<div style={{"color":color}}>{errorMsg}</div>:<></>}
              </Col>
            </Row>

            </div>
  )
}
