import React,{useContext} from 'react'
import { Context } from '../Genel'
import { Button } from 'react-bootstrap'

export function GradeRow(props) {
  const {classes,days,fetchClasses} = useContext(Context).state
  const dropClass = () => {
    fetch('http://localhost:5000/classes/delete', {
      method: 'POST',
      body: JSON.stringify({
        "id": props.id
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json()
      .then(json => {
        if (res.status === 200) {
          // console.log(json)
          props.dropClass()
          fetchClasses()
        // fetchClassesToApprove()
        // console.log(json)
      }
    })
    )
    
  }
  
  return (
    <tr>
      <td>
      {props.name}
      </td>
      <td>
      {props.teacherName}
      </td>
      <td>
        {days[props.day+1]}
      </td>
      <td>
        {classes[props.hour-9][0]}
      </td>
      <td>
      {props.pending?"pending":props.exam}
      </td>
      <td>
      {props.pending?"pending":props.final}
      </td>
      <td>
      {props.pending?"pending":(props.final*0.6+props.exam*0.4)}
      </td>
      <td>
        {props.pending ? <Button variant="danger" onClick={() => {
          dropClass()
        } }>Drop class</Button>:<></> }
      </td>
    </tr>
  )
}
