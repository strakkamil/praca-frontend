import React, { Component } from 'react'
import '../styles/doctorsPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

class doctorsPage extends Component {
  state = {
    doctors: []
  }

  getDoctors = () => {
    axios.get('http://localhost:5000/doctor')
      .then(res => this.setState({ doctors: res.data }))
  }

  componentDidMount() {
    this.getDoctors()
  }
  render() {
    const doctors = this.state.doctors.map(doctor => (
      <div className="doctor" key={doctor._id}>
        <span>Imię: {doctor.firstname}</span>
        <span>Nazwisko: {doctor.lastname}</span>
        <span>Specjalizacja: {doctor.specialization}</span>
      </div>
    ))
    return (
      <div className="doctors" >
        <div className="nav"></div>
        <div className="panel">
          {this.props.role === 'admin' && <Link to='/doctors/register'>Dodaj lekarza</Link>}
        </div>
        {doctors}
      </div>
    )
  }
}

export default doctorsPage