import React, { Component } from 'react'
import axios from 'axios'
import VisitCard from '../components/visitCard'
import '../styles/patientVisits.css'

class patientVisits extends Component {
  state = {
    visits: [],
    isPatient: true
  }

  componentDidMount() {
    this.getVisits()
  }

  getVisits = async () => {
    const res = await axios.get(`http://localhost:5000/visit/patient/${this.props.id}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
    this.setState({
      visits: res.data
    })

  }

  render() {
    const visits = this.state.visits.map(visit => (
      <VisitCard key={visit._id} id={visit._id} patientId={visit.patientId} date={visit.date} hour={visit.hour} isDoctor={this.props.isDoctor} isPatient={this.state.isPatient} specialization={visit.specialization} getVisitId={this.props.getVisitId} />
    ))
    return (
      <div className="patient-visits-container">
        <div className='patient-visits'>
          {this.state.visits.length === 0 ? <h1>Brak wizyt</h1> : visits}
        </div>
      </div>

    )
  }
}

export default patientVisits