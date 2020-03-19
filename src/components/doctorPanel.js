import React from 'react'
import '../styles/doctorPanel.css'
import { Link } from 'react-router-dom'

const doctorPanel = (props) => {
  return (
    <div className="doctor-panel">
      <div>
        <Link to='/visits/add'>Dodaj wizyty</Link>
      </div>
      <div></div>
    </div>
  )
}

export default doctorPanel