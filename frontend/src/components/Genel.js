import React, { Component } from "react";

// import Cookie from "js-cookie";

export const Context = React.createContext();
export class Genel extends Component {
  
  state = {
    id:null,
    username: null,
    password: null,
    level: null,
    name: null,
    logout:()=>{this.setState({id:null,username:null,password:null,level:null,name:null})},
    login: (id, username, password, level, name) => { this.setState({ id, username, password, level, name }) },
    updatePassword: (password) => {
      this.setState({password})
    },


    classes:[
    ["9:00-10:00","","","","",""],
    ["10:00-11:00","","","","",""],
    ["11:00-12:00","","","","",""],
    ["12:00-13:00","Launch Break","Launch Break","Launch Break","Launch Break","Launch Break"],
    ["13:00-14:00","","","","",""],
    ["14:00-15:00","","","","",""],
    ["15:00-16:00","","","","",""],
    ["16:00-17:00","","","","",""],
    ],
    days:["Hours","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  fetchClasses: () => {
    fetch('http://localhost:5000/classes/select', {
      method: 'POST',
      body: JSON.stringify({
        "id": this.state.id,
        "level": this.state.level
      }),
      headers: { 'Content-Type': 'application/json' }
      
    })
      .then(res => res.json()
        .then(json => {
          var classesTmp=[...this.state.classes]
          console.log(json)
          //arraylerde öğrencinin/öğretmenin sınıflarını doğru gün ve saate atamak için yapılan foreach fonksiyonu
          json.forEach(eachclass => {
            classesTmp[parseInt(eachclass.hour - 9)][parseInt(eachclass.day + 1)] = eachclass.name + (eachclass.pending===0?"":" (pending)")
          });
          this.setState({classes:classesTmp})
        })
      )
  }
    
  }
  render() {
    return (
      <Context.Provider value={{ state: this.state, a: 5 }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}