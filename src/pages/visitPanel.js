import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/visitPanel.css'

class visitPanel extends Component {
  state = {
    visit: {},
    doctor: {},
    patient: {},
    date: '',
    hour: ''
  }

  componentDidMount() {
    this.getVisitAndDoctor()
  }

  getVisitAndDoctor = async () => {
    const res = await axios.get(`http://localhost:5000/visit/${this.props.visitId}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
    this.setState({
      visit: res.data[0]
    })
    if (!this.props.isDoctor) {
      this.getDoctor()
    } else {
      this.getPatient()
    }
    this.setDate()
    this.setHour()
  }

  getDoctor = async () => {
    const doctor = await axios.get(`http://localhost:5000/doctor/get/${this.state.visit.doctorId}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
    this.setState({
      doctor: doctor.data[0]
    })
  }

  getPatient = async () => {
    const patient = await axios.get(`http://localhost:5000/patient/get/${this.state.visit.patientId}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
    this.setState({
      patient: patient.data[0]
    })
  }

  setDate = () => {
    let date = this.state.visit.date
    date = date.slice(0, 10)
    this.setState({
      date
    })
  }

  setHour = () => {
    const takeTime = this.state.visit.hour
    let hour = new Date(takeTime).getHours()
    if (hour === 0) {
      hour = '00'
    }
    let minutes = new Date(takeTime).getMinutes()
    if (minutes === 0) {
      minutes = '00'
    }
    this.setState({
      hour: `${hour} : ${minutes}`
    })
  }


  render() {
    const { price, description } = this.state.visit
    const { firstname, lastname, specialization } = this.state.doctor
    const { isDoctor } = this.props
    return (
      <div className='visit-panel'>
        <div className="visit-panel-card">
          <h1>Panel wizyty</h1>
          <div className="left">
            <h2>Data</h2>
            <h2>Godzina</h2>
            <h2>Cena</h2>
            {isDoctor ? <h2>Pacjent</h2> : <h2>Lekarz</h2>}
            {!isDoctor ? <h2>Specjalizacja</h2> : <h2>Pesel</h2>}
            {isDoctor && <h2>Adres</h2>}
            {isDoctor && <h2>Numer</h2>}
            <h2>Opis</h2>
          </div>
          <div className="right">
            <span>{this.state.date}</span>
            <span>{this.state.hour}</span>
            <span>{price} zł</span>
            {isDoctor ? <span>{`${this.state.patient.firstname} ${this.state.patient.lastname}`}</span> : <span>{`${firstname} ${lastname}`}</span>}
            {isDoctor ? <span>{this.state.patient.pesel}</span> : <span>{specialization}</span>}
            {isDoctor && <span>{`${this.state.patient.street} ${this.state.patient.city}`}</span>}
            {isDoctor && <span>{this.state.patient.phone}</span>}
            <span>{description ? description : 'Brak opisu'}</span>
          </div>
          <div className="edit-description">
            <Link to='/visit/description' onClick={() => this.props.getVisitDescription(this.state.visit.description)}>{isDoctor ? 'Edytuj opis' : 'Pokaż opis'}</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default visitPanel