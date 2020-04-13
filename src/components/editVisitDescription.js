import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import axios from 'axios'
import '../styles/editVisitDescription.css'

class EditVisitDescription extends Component {
  state = {
    description: this.props.visitDescription
  }

  handleChangeVisitDescription = async () => {
    const description = {
      description: this.state.description
    }
    await axios.patch(`http://localhost:5000/visit/edit/${this.props.visitId}`, description, { headers: { authorization: localStorage.TOKEN_SECRET } })
  }

  getDescription = (e) => {
    const description = e.target.value
    this.setState({
      description
    })
  }

  render() {
    return (
      <div className='edit-field-description'>
        <h1>Wpisz opis dla tej wizyty</h1>
        <TextField
          id="descriptionn"
          label="Opis Wizyty"
          multiline
          fullWidth
          rows={20}
          defaultValue={this.state.description}
          variant="outlined"
          onChange={this.getDescription}
        />
        <div className="buttons">
          <button onClick={this.handleChangeVisitDescription}>Zapisz</button>
          <Link to='/doctor/visit/edit'>Powrót</Link>
        </div>
      </div>
    )
  }
}

export default EditVisitDescription