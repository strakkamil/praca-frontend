import React, { Component } from 'react'
import VisitCard from '../components/visitCard'
import axios from 'axios'
import '../styles/doctorVisitPage.css'

class doctorVisitPage extends Component {
  state = {
    visits: [],
    id: this.props.id,
  }

  componentDidMount() {
    this.getVisits()
  }

  getVisits = async () => {
    const res = await axios.get(`http://localhost:5000/visit/doctor/${this.state.id}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
    this.setState({
      visits: res.data
    })
    const visits = [...this.state.visits]
    const filtredVisits = visits.filter(visit => visit.patientId === '')
    this.setState({
      visits: filtredVisits
    })
  }

  signUpToDoctor = (id) => {
    const visit = {
      patientId: this.props.patientId
    }
    axios.patch(`http://localhost:5000/visit/signup/${id}`, visit, { headers: { authorization: localStorage.TOKEN_SECRET } })
  }

  render() {
    const dateNow = Date.now()
    const visits = this.state.visits
      .filter(visit => {
        const h = new Date(visit.hour).getHours()
        const m = new Date(visit.hour).getMinutes()
        const date = new Date(visit.date)
        date.setHours(h)
        date.setMinutes(m)
        return (
          date > dateNow
        )
      })
      .map(visit => (
        <VisitCard key={visit._id} id={visit._id} patientId={visit.patientId} date={visit.date} hour={visit.hour} signup={this.signUpToDoctor} />
      ))
    return (
      <div className="visit-page">
        <div className='doctor-visit-page'>
          {visits}
        </div>
      </div>
    )
  }
}

export default doctorVisitPage