import React,{useState,useEffect,useContext} from 'react'
import { Row,Dropdown,Col,Button } from 'react-bootstrap'
import { Context} from "../index"

export function ClassSelect() {
  const {days,classes,id,fetchClasses} = useContext(Context).state
  const [mainClasses, setMainClasses] = useState([
    {
      "id": 1,
      "name": "Computer Science",
      "day": 0,
      "hour": 9,
      "teacherName":"te"
    }
  ])
  const fetchUnselectedClasses = () => {
    fetch('http://localhost:5000/classes/stdClass/select', {
      method: 'POST',
      body: JSON.stringify({
        "id": id,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
    .then(json => {
      setMainClasses(json)
      // console.log(json)
    })
    )
  }
  const addClass = (selectedClassId) => {
    setError(false)
    fetch('http://localhost:5000/classes/stdClass/insert', {
      method: "POST",
      body: JSON.stringify({
        "studentId":id,
	      "classId":selectedClassId
      }),
      headers: { 'Content-Type': 'application/json' }
      
    })
      .then(res => res.json()
        .then(json => {
        if (res.status!==200) {
          setError(true)
          setErrorMsg(json.msg)
          setColor("red")
          }
        else {
          setError(true)
          setErrorMsg(json.msg)
          setColor("blue")
          fetchClasses()
          fetchUnselectedClasses()
          setSelectedClassName("Class Name")
          setSelectedTeacherName("Teacher Name")
          setSelectedDay("Class Day")
          setSelectedHour("Class Hour")
          setSelectedClassId(null)
          }
      }))
  }
  useEffect(() => {
    //mainClasses öğrencinin sahip olmadığı sınıfları çekecek
    fetchUnselectedClasses()
    return
  }, [])
  const [selectedClassName, setSelectedClassName] = useState("Class Name")
  const [selectedTeacherName, setSelectedTeacherName] = useState("Teacher Name")
  const [selectedDay, setSelectedDay] = useState("Class Day")
  const [selectedHour, setSelectedHour] = useState("Class Hour")
  const [selectedClassId, setSelectedClassId] = useState(null)

  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [color, setColor] = useState("red")
  
  return (
    <div className="border " style={{ padding: "1rem" }}>
            <h4 style={{ "textAlign": "center" }}>Add class for semester</h4>
            <Row>
              <Col>
                <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Add class for semester
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {mainClasses.map((eachClass) => 
                      <Dropdown.Item onClick={() => {
                        setSelectedClassName(eachClass.name)
                        setSelectedTeacherName(eachClass.teacherName)
                        setSelectedDay(days[eachClass.day+1])
                        // console.log(days,eachClass.day)
                        setSelectedHour(classes[eachClass.hour-9][0])
                        setSelectedClassId(eachClass.id)
                        setError(false)

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
                <Button className="btn-block" variant="success" disabled={selectedClassId===null} onClick={()=>addClass(selectedClassId)} /* onClick={()=>classDecision(0)} */>Add class</Button>
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
