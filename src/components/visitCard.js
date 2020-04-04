import React, { Component } from 'react'
import '../styles/DoctorCard.css'

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

  render() {
    return (
      <div className='card'>
        <span>{this.state.date}</span>
        <span>{this.state.hour}</span>
        <span className="description">{this.props.patientId ? this.props.description : 'Nikt się nie zapisał na wizyte'} </span>
        {/* {this.props.role === 'admin' ? <><Link to='/doctors/edit' onClick={() => this.props.getDoctorId(this.props.id)}>Edytuj</Link><button onClick={this.deleteDoctor}>Usuń</button></> : this.props.role === 'patient' ? <button>Zapisz</button> : null} */}
      </div>
    )
  }
}

export default visitCard