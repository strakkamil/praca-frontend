import React, { Component } from 'react'
import DoctorCard from '../components/DoctorCard'
import '../styles/mainDoctors.css'

class mainDoctors extends Component {
  render() {
    const doctors = this.props.doctors.map(doctor => (
      <DoctorCard key={doctor._id} id={doctor._id} name={doctor.firstname} surname={doctor.lastname} specialization={doctor.specialization} />
    ))
    return (
      <>
        <h1 className="doctors-main-h1">Nasi najlepsi specjaliści</h1>
        <div className="doctors-main">
          {doctors}
        </div>
      </>
    )
  }
}

export default mainDoctors