import React,{useState,useEffect} from 'react'
import { Row,Dropdown,Col,Button } from 'react-bootstrap'

export function TeacherApprove() {
  const [teachers, setTeachers] = useState([])
  const [teacherForApprovalID, setTeacherForApprovalID] = useState(null)
  const [teacherForApprovalName, setTeacherForApprovalName] = useState("Select new teacher")
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [errorColor, setErrorColor] = useState("red")


  const fetchTeachers = () => {
    fetch('http://localhost:5000/approval/teachers/select', {
      method: 'POST',
    })
      .then(res => res.json()
        .then(json => {
          setTeachers(json)
        })
      )
  }
  //öğretmeni kabul et ya da deny yap, sonra dropdownu güncelle
  //sonra mesaj koy
  const teacherDecision = (pending) => {
    fetch('http://localhost:5000/approval/teachers/update', {
      method: 'POST',
      body: JSON.stringify({
        "pending": pending,
        "id":teacherForApprovalID
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json()
        .then(json => {
          if (res.status!==200) {
            //router teacher update yap, pending değişikliğine göre mesaj koy, teachers listesini yeniden fetch et
            setError(true)
            setErrorMsg(JSON.stringify(json))
            setErrorColor("red")
          }
          else {
            setError(true)
            setTeacherForApprovalName("Select new teacher")
            setErrorMsg(json.msg)
            setErrorColor("blue")
            setTeacherForApprovalID(null)
            fetchTeachers()
            
          }
        })
      )
  }
  
  useEffect(() => {
    fetchTeachers()
  }, [])


  return (
    <div className="border " style={{ padding: "1rem" }}>
            <h4 style={{ "textAlign": "center" }}>Teachers pending for approval</h4>
            <Row>
              <Col>
                <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Teachers Waiting for approval
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {teachers.map((teacher) => 
                      <Dropdown.Item onClick={() => {
                        setTeacherForApprovalID(teacher.id)
                        setTeacherForApprovalName(teacher.name)
                        setError(false)
                      }}>{teacher.name}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col style={{ "textAlign": "center", "top": "50%" }} className="">
                <h5>Teacher Name</h5>
                {teacherForApprovalName}
              </Col>
              <Col>
                <Button className="btn-block" variant="success" disabled={teacherForApprovalID===null} onClick={()=>teacherDecision(0)}>Approve</Button>
                <Button className="btn-block" variant="danger"  disabled={teacherForApprovalID===null} onClick={()=>teacherDecision(2)}>Deny</Button>
              </Col>
            </Row>
            <Row>
              <Col  style={{ "textAlign": "center", "top": "50%" }}>
                {error?<div style={{"color":errorColor}}>{errorMsg}</div>:<></>}
              </Col>
            </Row>

            </div>
  )
}
