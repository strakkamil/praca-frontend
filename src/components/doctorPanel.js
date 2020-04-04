import React, { Component } from 'react'
import '../styles/doctorPanel.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import VisitCard from './visitCard'

class doctorPanel extends Component {
  state = {
    visits: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/visit/doctor/${this.props.id}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
      .then(res => this.setState({
        visits: res.data
      }))
  }

  render() {
    const visits = this.state.visits.map(visit => (
      <VisitCard key={visit._id} patientId={visit.patientId} date={visit.date} hour={visit.hour} />
    ))
    return (
      <div className="doctor-panel">
        <div>
          <div className="link">
            <Link to='/visits/add'>Dodaj wizyty</Link>
          </div>
          <div className='cards'>
            {visits}
          </div>
        </div>
        <div></div>
      </div>
    )
  }
}

export default doctorPanel