import React, { Component } from 'react'
import '../styles/DoctorCard.css'
import { Link } from 'react-router-dom'

class visitCard extends Component {
  state = {
    date: '',
    hour: ''
  }

  componentDidMount() {
    this.setDate()
    this.setHour()
  }

  setHour = () => {
    const takeTime = this.props.hour
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

  setDate = () => {
    let date = this.props.date
    date = date.slice(0, 10)
    this.setState({
      date
    })
  }

  checkIsDoctor = () => {
    if (this.props.patientId && this.props.isDoctor) {
      return (
        <Link to='/doctor/visit/edit' onClick={() => this.props.getVisitId(this.props.id)}>Otwórz</Link>
      )
    } else if (!this.props.patientId && this.props.isDoctor) {
      return (
        <span>Nikt się nie zapisał</span>
      )
    } else if (this.props.isPatient) {
      return (
        <>
          <span>{this.props.specialization}</span>
          <Link to='/patient/visit' onClick={() => this.props.getVisitId(this.props.id)}>Otwórz</Link>
        </>
      )
    }
    else {
      return (
        <Link to='/patient/visits' onClick={() => this.props.signup(this.props.id)}>Zapisz</Link>
      )
    }
  }

  render() {
    return (
      <div className='card'>
        <span>{this.state.date}</span>
        <span>{this.state.hour}</span>
        {this.checkIsDoctor()}
      </div>
    )
  }
}

export default visitCard