import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers'
import { Alert } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns'
import pl from 'date-fns/locale/pl'
import '../styles/addVisitPage.css'

class addVisitPage extends Component {
  state = {
    selectedDate: '',
    selectedStartTime: '',
    selectedEndTime: '',
    error: false
  }

  componentDidMount() {
    const selectedDate = new Date()
    const selectedStartTime = selectedDate.setHours(8, 0, 0)
    const selectedEndTime = selectedDate.setHours(16, 0, 0)
    this.setState({
      selectedDate,
      selectedStartTime,
      selectedEndTime
    })
  }

  handleDateChange = (date) => {
    const selectedDate = date
    this.setState({
      selectedDate
    })
  }

  handleStartTimeChange = (date) => {
    const selectedStartTime = date
    this.setState({
      selectedStartTime
    })
  }

  handleEndTimeChange = (date) => {
    const selectedEndTime = date
    this.setState({
      selectedEndTime
    })
  }

  handleOnSubmit = () => {
    if (this.state.selectedStartTime > this.state.selectedEndTime) {
      this.setState({
        error: true
      })
      return
    } else {
      this.setState({
        error: false
      })
    }

  }

  render() {
    return (
      <div className='add-visit' >
        <h1>Formularz generowania wizyt</h1>
        <h2>Wizyta trwa 20 minut</h2>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
          <span>Podaj dzień w którym przyjmujesz</span>
          <DatePicker
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            disablePast={true}
          ></DatePicker>
          <span>Podaj godzinę od której przyjmujesz pacjentów</span>
          <TimePicker
            ampm={false}
            value={this.state.selectedStartTime}
            onChange={this.handleStartTimeChange}
          ></TimePicker>
          <span>Podaj godzinę do której przyjmujesz</span>
          <TimePicker
            ampm={false}
            value={this.state.selectedEndTime}
            onChange={this.handleEndTimeChange}
          ></TimePicker>
          <Link to='/visits/add' onClick={this.handleOnSubmit}>Utwórz wizyty</Link>
          {this.state.error &&
            <div className='alert'>
              <Alert severity="error">
                Chyba zaczynasz przyjmować przed wyjściem z pracy :)
            </Alert>
            </div>}
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default addVisitPage


