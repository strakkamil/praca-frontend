import React from 'react'
import '../styles/doctorsPage.css'

const doctorsPage = (props) => {
  const doctors = props.doctors.map(doctor => (
    <div className="doctor" key={doctor._id}>
      <span>Imię: {doctor.firstname}</span>
      <span>Nazwisko: {doctor.lastname}</span>
      <span>Specjalizacja: {doctor.specialization}</span>
    </div>
  ))
  return (
    <div className="doctors" >
      <div className="nav"></div>
      {doctors}
    </div>
  )
}

export default doctorsPage