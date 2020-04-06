import React, { Component } from 'react'
import '../styles/DoctorCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { Link } from 'react-router-dom'


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
        <FontAwesomeIcon icon={faUserMd} className="icon" />
        {this.props.role === 'admin' ? <><Link to='/doctors/edit' onClick={() => this.props.getDoctorId(this.props.id)}>Edytuj</Link><button onClick={this.deleteDoctor}>Usuń</button></> : this.props.role === 'patient' ? <Link to='doctor/visits'
          onClick={() => this.props.getDoctorId(this.props.id)}>Zapisz</Link> : null}
      </div>
    )
  }
}

export default DoctorCard