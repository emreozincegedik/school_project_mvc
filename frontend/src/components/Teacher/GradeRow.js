import React,{useState} from 'react'
import { Row, Dropdown, Col, Button } from 'react-bootstrap'

export function GradeRow(props) {
  const [exam, setExam] = useState(props.exam)
  const [final, setFinal] = useState(props.final)
  const [fetchMsg, setFetchMsg] = useState("")

  const updateGrade = () => {
    fetch('http://localhost:5000/classesStd/grade/update', {
      method: 'POST',
      body: JSON.stringify({
        "id": props.stdClassId,
        "exam": exam,
        "final":final
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
      .then(json => {
        if (res.status === 200) {
        
        // fetchClassesToApprove()
          console.log(json)
          setFetchMsg(json.msg)
      }
    })
    )
  }

  const valueInsert = (func, value) => {
    setFetchMsg("")
    if (value<=100) {
      func(value)
    }
    else {
      func(100)
    }
  }
  return (
    <tr>
      <td>
        {props.id}
      </td>
      <td>
        {props.name}
      </td>
      <td>
        <input type="text" value={exam} onChange={e =>valueInsert(setExam,e.target.value.replace(/\D/,''))}/>
      </td>
      <td>
        <input type="text" value={final} onChange={e => valueInsert(setFinal,e.target.value.replace(/\D/,''))}/>
      </td>
      <td>
        {0.4*exam+0.6*final}
      </td>
      <td>
        <Button onClick={() => updateGrade()}>Update </Button> { fetchMsg }
      </td>
    </tr>
  )
}
