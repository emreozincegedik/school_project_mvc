import React,{useState,useEffect,useContext} from 'react'
import { Row,Dropdown,Col,Button,Accordion,Card,ListGroup,Table } from 'react-bootstrap'
import { Context} from "../index"

export function TeacherClassApprove() {
  const { id,days,classes } = useContext(Context).state
  const [classesToApprove, setClassesToApprove] = useState([])
  const [students, setStudents] = useState(["std1", "std2"])
  
  const classDecision = (decision,classesstdId) => {
    // console.log(decision, classesstdId)
    fetch('http://localhost:5000/classes/approve/decision', {
      method: 'POST',
      body: JSON.stringify({
        "id": classesstdId,
        "decision": decision
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
      .then(json => {
      if (res.status===200) {
        // setClassesToApprove(json)
        fetchClassesToApprove()
        console.log(json.msg)
      }
    })
    )
    
  }
  
  const fetchClassesToApprove = () => {
    fetch('http://localhost:5000/classes/approve/select', {
      method: 'POST',
      body: JSON.stringify({
        "id": id,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
      .then(json => {
      if (res.status===200) {
        setClassesToApprove(json)
        console.log(json)
      }
    })
    )
  }

  useEffect(() => {
    fetchClassesToApprove()
    return () => {
      
    }
  }, [])
  
  return (
    <div className="border " style={{ padding: "1rem" }}>
      <h4 style={{ "textAlign": "center" }}>Approve class</h4>
      <Accordion defaultActiveKey="0">
        <Card>
    <Card.Header>
      <Accordion.Toggle className="btn-block" as={Button} variant="link" eventKey="0">
        Show classes
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
              <Table  striped bordered hover>
                <thead>
                  <tr>

                  <th>student id</th>
                  <th>student name</th>
                  <th>class name</th>
                  <th>day</th>
                  <th>hour</th>
                  <th>Add/Drop</th>
                  </tr>
                </thead>
                <tbody>
{
              
            classesToApprove.map(classToApprove =>
              <tr key={classToApprove.classesstdId}>
                <td>
                  {classToApprove.stdId}
                </td>
                <td>
                  {classToApprove.stdName}
                </td> 
                <td>
                  {classToApprove.className}
                </td>
                <td>
                  {days[classToApprove.day+1]}
                </td>
                <td>

                  {classes[classToApprove.hour-9][0]}
                </td>
                <td>
                  <span>

                <Button style={{"width":"5rem","marginRight":"1rem"}} onClick={()=>classDecision(1,classToApprove.classesstdId)}>Add</Button>
                <Button style={{"width":"5rem"}} variant="danger" onClick={()=>classDecision(0,classToApprove.classesstdId)}>Drop</Button>
                  </span>
                </td>
              </tr>)
            }
                </tbody>
            </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        </Accordion>
      </div>
  )
}
