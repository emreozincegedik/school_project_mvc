import React,{useState,useEffect,useContext} from 'react'
import { Row, Dropdown, Col,Table } from 'react-bootstrap'
import { Context } from "../index"
import {GradeRow} from './GradeRow'

export function TeacherClassGrade() {
  const [ownedClasses, setOwnedClasses] = useState([])
  const { id } = useContext(Context).state
  const [classStd, setClassStd] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  
  const fetchClassStd = (classId) => {
    fetch('http://localhost:5000/classesStd/select', {
      method: 'POST',
      body: JSON.stringify({
        "classId": classId,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
      .then(json => {
      if (res.status===200) {
        setClassStd(json)
        // fetchClassesToApprove()
        // console.log(json)
      }
    })
    )
  }

  const fetchOwnedClasses = () => {
    fetch('http://localhost:5000/classes/select', {
      method: 'POST',
      body: JSON.stringify({
        "id": id,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
      .then(json => {
      if (res.status===200) {
        setOwnedClasses(json)
        // fetchClassesToApprove()
        // console.log(json.msg)
      }
    })
    )
  }

  useEffect(() => {
    fetchOwnedClasses()
  }, [])

  return (
    <>
    <Row>
      <Col>
      <h4 style={{ "textAlign": "center" }}>Grade classes</h4>
      </Col>
    </Row>
    <Row>
      <Col>
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Select class
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {ownedClasses.map((eachClass) => 
                      <Dropdown.Item onClick={() => {
                        // console.log(eachClass)
                        setClassStd([])
                        fetchClassStd(eachClass.id)
                        setSelectedClass(eachClass.name)

                        // setTeacherForApprovalID(teacher.id)
                        // setTeacherForApprovalName(teacher.name)
                        // setError(false)
                      }}>{eachClass.name}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
        </Col>
        {selectedClass && <Col>
          <h4>{selectedClass}</h4>
        </Col>
          }
      </Row>
      {selectedClass &&
        <>
        
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                Student Id
              </th>
              <th>
                Name
              </th>
              <th>
                Exam %40
              </th>
              <th>
                Final %60
              </th>
              <th>
                Result
              </th>
              <th>
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {classStd.map(std => <GradeRow name={std.stdName} stdClassId={std.id} exam={std.exam} final={std.final} id={ std.studentId}/>)}

          </tbody>
        </Table>
        
        </>
      }
    </>
  )
}
