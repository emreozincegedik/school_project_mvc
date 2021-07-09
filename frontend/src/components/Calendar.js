import React,{useContext,useEffect} from 'react'
import {Context} from './index'
import { Table } from 'react-bootstrap'


export function Calendar() {
  
  const { classes,fetchClasses,days } = useContext(Context).state
  
  useEffect(() => {
    fetchClasses()
  }, [])
  return (
    <div className="border " style={{ padding: "1rem" }}>
      <h4 style={{ "textAlign": "center" }}>Calendar</h4>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
              {days.map((day,i) => <th key={i} style={{ "textAlign": "center" }}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            //calendarın içindekileri diz
            classes.map((hour, i) => <tr key={i}>
            {hour.map((theClass,j) => 
              <td key={j} style={{ "textAlign": "center" }}>{theClass}</td>
            )}
          </tr>)}
        </tbody>
      </Table>
      
    </div>
  )
}
