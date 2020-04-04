import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers'
import { Alert } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns'
import pl from 'date-fns/locale/pl'
import '../styles/addVisitPage.css'
import axios from 'axios'

class addVisitPage extends Component {
  state = {
    selectedDate: '',
    selectedStartTime: '',
    selectedEndTime: '',
    error: false,
    doctorId: this.props.id
  }

  componentDidMount() {
    let selectedDate = new Date()
    const selectedStartTime = selectedDate.setHours(8, 0, 0)
    const selectedEndTime = selectedDate.setHours(16, 0, 0)
    selectedDate = selectedDate.getTime()
    this.setState({
      selectedDate,
      selectedStartTime,
      selectedEndTime
    })
  }

  handleDateChange = (date) => {
    const selectedDate = date.getTime()
    this.setState({
      selectedDate
    })
  }

  handleStartTimeChange = (date) => {
    const selectedStartTime = date.getTime()
    this.setState({
      selectedStartTime
    })
  }

  handleEndTimeChange = (date) => {
    const selectedEndTime = date.getTime()
    this.setState({
      selectedEndTime
    })
  }

  handleOnSubmit = () => {
    if (this.state.selectedStartTime > this.state.selectedEndTime) {
      this.setState({
        error: true
      })
    } else {
      const visitData = {
        doctorId: this.state.doctorId,
        selectedDate: this.state.selectedDate,
        selectedStartTime: this.state.selectedStartTime,
        selectedEndTime: this.state.selectedEndTime
      }
      this.setState({
        error: false
      })
      axios.post('http://localhost:5000/visit/add', visitData, { headers: { authorization: localStorage.TOKEN_SECRET } })
        .then(res => console.log(visitData))
    }

  }

  render() {
    return (
      <div className='add-visit' >
        <h1>Formularz generowania wizyt</h1>
        <h2>Wizyta trwa 20 minut</h2>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
          <>
            <span>Podaj dzień w którym przyjmujesz</span>
            <DatePicker
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              disablePast={true}
              cancelLabel='Cofnij'
              okLabel='Potwierdź'
            ></DatePicker>
            <span>Podaj godzinę od której przyjmujesz pacjentów</span>
            <TimePicker
              ampm={false}
              value={this.state.selectedStartTime}
              onChange={this.handleStartTimeChange}
              cancelLabel='Cofnij'
              okLabel='Potwierdź'
            ></TimePicker>
            <span>Podaj godzinę do której przyjmujesz</span>
            <TimePicker
              ampm={false}
              value={this.state.selectedEndTime}
              onChange={this.handleEndTimeChange}
              cancelLabel='Cofnij'
              okLabel='Potwierdź'
            ></TimePicker>
            <Link to='/doctor' onClick={this.handleOnSubmit}>Utwórz wizyty</Link>
            {this.state.error &&
              <div className='alert'>
                <Alert severity="error">
                  Chyba zaczynasz przyjmować przed wyjściem z pracy :)
            </Alert>
              </div>}
          </>
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default addVisitPage


