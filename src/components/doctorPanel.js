import React, { Component } from 'react'
import '../styles/doctorPanel.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import VisitCard from './visitCard'
import { Select, FormControl, InputLabel } from '@material-ui/core';

class doctorPanel extends Component {
  state = {
    visits: [],
    sortedVisits: [],
    sortValue: ''
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/visit/doctor/${this.props.id}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
      .then(res => this.setState({
        visits: res.data,
        sortedVisits: res.data
      }))
  }

  filter = (filter) => {
    if (filter === '' || filter === 'all') {
      this.setState({
        sortedVisits: this.state.visits
      })
    }
    else if (filter === 'busy') {
      const visits = this.state.visits.filter(visit => visit.patientId !== '')
      this.setState({
        sortedVisits: visits
      })
    }
    else if (filter === 'empty') {
      const visits = this.state.visits.filter(visit => visit.patientId === '')
      this.setState({
        sortedVisits: visits
      })
    }
    else if (filter === 'emptyDesc') {
      const visits = this.state.visits.filter(visit => visit.description === '')
      this.setState({
        sortedVisits: visits
      })
    }
    else if (filter === 'desc') {
      const visits = this.state.visits.filter(visit => visit.description !== '')
      this.setState({
        sortedVisits: visits
      })
    }
    else if (filter === 'done') {
      const dateNow = Date.now()
      const visits = this.state.visits
        .filter(visit => {
          const h = new Date(visit.hour).getHours()
          const m = new Date(visit.hour).getMinutes()
          const date = new Date(visit.date)
          date.setHours(h)
          date.setMinutes(m)
          return (
            date < dateNow
          )
        })
      this.setState({
        sortedVisits: visits
      })
    }
    else if (filter === 'undone') {
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
      this.setState({
        sortedVisits: visits
      })
    }
  }

  handleClick = (e) => {
    this.setState({
      sortValue: e.target.value
    })
    this.filter(e.target.value)
  }

  render() {
    const visits = this.state.sortedVisits.map(visit => (
      <VisitCard key={visit._id} id={visit._id} patientId={visit.patientId} date={visit.date} hour={visit.hour} isDoctor={this.props.isDoctor} getVisitId={this.props.getVisitId} />
    ))
    return (
      <div className="doctor-panel">
        <div>
          <div className="link">
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Sortuj wg</InputLabel>
              <Select
                native
                value={this.state.sortValue}
                onChange={this.handleClick}
                label="Sortuj wg"
                inputProps={{
                  name: 'Sortuj wg',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value='all'>Pokaż wszystkie</option>
                <option value='busy'>Zajęte</option>
                <option value='done'>Odbyte</option>
                <option value='undone'>Nieodbyte</option>
                <option value='empty'>Wolne</option>
                <option value='emptyDesc'>Brak opisu</option>
                <option value='desc'>Z opisem</option>
              </Select>
            </FormControl>
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