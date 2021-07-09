import React,{useState,useEffect,useContext} from 'react'
import { Row, Dropdown, Col, Table } from 'react-bootstrap'
import { GradeRow } from './index'
import {Context} from '../index'


export function StudentClassGrade() {

  const [classStd, setClassStd] = useState([])
  const {id,level} = useContext(Context).state
  const fetchClasses = () => {
    setClassStd([])
    fetch('http://localhost:5000/classes/select', {
      method: 'POST',
      body: JSON.stringify({
        "id": id,
        "level":level
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
      .then(json => {
      if (res.status===200) {
        setClassStd(json)
        console.log(json)
        // fetchClassesToApprove()
        // console.log(json)
      }
    })
    )
  }
  useEffect(() => {
    fetchClasses()
    
  }, [])
  return (<>
    <Row>
      <Col>
      <h4 style={{ "textAlign": "center" }}>Your grades</h4>
      </Col>
    </Row>
    <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                Class Name
              </th>
              <th>
            Teacher Name
              </th>
                
              <th>
              Day
              </th>
              <th>
                Hour
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
            (Can drop if pending)
          </th>
            </tr>
          </thead>
          <tbody>
        {classStd.map(std => <GradeRow
          id={std.id}
          teacherName={std.teacherName}
          name={std.name}
          exam={std.exam}
          final={std.final}
          hour={std.hour}
          day={std.day}
          pending={std.pending}
          dropClass={fetchClasses} />)}

          </tbody>
        </Table>
    </>
  )
}
