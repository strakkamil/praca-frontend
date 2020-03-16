import React, { Component } from 'react'
import '../styles/doctorsPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DoctorCard from '../components/DoctorCard'

class doctorsPage extends Component {
  state = {
    doctors: []
  }

  getDoctors = () => {
    axios.get('http://localhost:5000/doctor', { headers: { authorization: localStorage.TOKEN_SECRET } })
      .then(res => this.setState({ doctors: res.data }))
  }

  componentDidMount() {
    this.getDoctors()
  }
  render() {
    const doctorCard = this.state.doctors.map(doctor => (
      <DoctorCard key={doctor._id} id={doctor._id} name={doctor.firstname} surname={doctor.lastname} specialization={doctor.specialization} role={this.props.role} getDoctorId={this.props.getDoctorId} />
    ))
    return (
      <>
        {this.props.role === 'admin' ?
          <div className="panel"><Link to='/doctors/register'>Dodaj lekarza</Link></div> :
          this.props.role === 'patient' ? <div className="panel"><Link to='/patient/visits'>Moje wizyty</Link></div> :
            <div className="panel"><h1>Aby przejrzeć wizyty musisz się zalogować</h1></div>
        }
        <div className="doctors">
          <div className="cards">
            {doctorCard}
          </div>
        </div>
      </>
    )
  }
}

export default doctorsPage