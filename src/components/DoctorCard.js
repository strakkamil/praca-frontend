import React, { Component } from 'react'
import '../styles/DoctorCard.css'
import FA from 'react-fontawesome'
import Axios from 'axios'

class DoctorCard extends Component {
  deleteDoctor = () => {
    Axios.delete(`http://localhost:5000/doctor/delete/${this.props.id}`)
  }
  render() {

    return (
      <div className='card'>
        <span>{this.props.name}</span>
        <span>{this.props.surname}</span>
        <span className="description">{this.props.specialization}</span>
        <FA name="fas fa-user-md" className='icon' />
        {this.props.role === 'admin' ? <><button>Edytuj</button><button onClick={this.deleteDoctor}>Usuń</button></> : <button>Zapisz</button>}
      </div>
    )
  }
}

export default DoctorCard