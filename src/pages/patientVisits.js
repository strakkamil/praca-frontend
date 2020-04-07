import React, { Component } from 'react'
import axios from 'axios'
import '../styles/patientVisits.css'

class patientVisits extends Component {
  state = {
    visits: []
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
    return (
      <div className='patient-visits'>dadassda</div>
    )
  }
}

export default patientVisits