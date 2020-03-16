import React, { Component } from 'react'
import '../styles/registerPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


class editPage extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    pesel: '',
    city: '',
    street: '',
    specialization: ''
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/doctor/edit/${this.props.id}`, { headers: { authorization: localStorage.TOKEN_SECRET } })
      .then(res => this.setState({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        email: res.data.email,
        phone: res.data.phone,
        pesel: res.data.pesel,
        city: res.data.city,
        street: res.data.street,
        specialization: res.data.specialization
      }))
  }

  onSubmit = (e) => {
    e.preventDefault()

    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      pesel: this.state.pesel,
      city: this.state.city,
      street: this.state.street,
      specialization: this.state.specialization
    }

    axios.patch(`http://localhost:5000/doctor/edit/${this.props.id}`, user, { headers: { authorization: localStorage.TOKEN_SECRET } })
      .then(res => console.log(user))

  }

  onChange = (type, e) => {
    switch (type) {
      case 'firstname':
        this.setState({
          firstname: e.target.value
        })
        break
      case 'lastname':
        this.setState({
          lastname: e.target.value
        })
        break
      case 'email':
        this.setState({
          email: e.target.value
        })
        break
      case 'phone':
        this.setState({
          phone: e.target.value
        })
        break
      case 'pesel':
        this.setState({
          pesel: e.target.value
        })
        break
      case 'city':
        this.setState({
          city: e.target.value
        })
        break
      case 'street':
        this.setState({
          street: e.target.value
        })
        break
      case 'specialization':
        this.setState({
          specialization: e.target.value
        })
        break
      default:
    }
  }



  render() {
    const { firstname, lastname, email, phone, pesel, city, street, specialization } = this.state
    return (
      <div className='register-wrap'>
        <div className="register">
          <h1>Witaj na stronie edycji danych</h1>
          <h2>Twoje dane są niezbędne do korzystania z systemu</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form">
              <div className="login">
                <input type="text" name="login-input" value={firstname} required autoComplete="off" onChange={this.onChange.bind(this, 'firstname')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">imię</span>
                </label>
              </div>
              <div className="login">
                <input type="text" name="login-input" value={lastname} required autoComplete="off" onChange={this.onChange.bind(this, 'lastname')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">nazwisko</span>
                </label>
              </div>
              <div className="login">
                <input type="text" name="login-input" value={email} required autoComplete="off" onChange={this.onChange.bind(this, 'email')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">email</span>
                </label>
              </div>
              <div className="login">
                <input type="number" name="login-input" value={phone} required autoComplete="off" onChange={this.onChange.bind(this, 'phone')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">telefon</span>
                </label>
              </div>
              <div className="login">
                <input type="number" name="login-input" value={pesel} required autoComplete="off" onChange={this.onChange.bind(this, 'pesel')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">pesel</span>
                </label>
              </div>
              <div className="login">
                <input type="text" name="login-input" value={city} required autoComplete="off" onChange={this.onChange.bind(this, 'city')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">miasto</span>
                </label>
              </div>
              <div className="login">
                <input type="text" name="login-input" value={street} required autoComplete="off" onChange={this.onChange.bind(this, 'street')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">ulica</span>
                </label>
              </div>
              <div className="login">
                <input type="text" name="login-input" value={specialization} required autoComplete="off" onChange={this.onChange.bind(this, 'specialization')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">specjalizacja</span>
                </label>
              </div>
              <div className="button">
                <button onClick={this.onSubmit}>Edytuj dane</button>
                <Link to='/doctors'>Powrót</Link>
              </div>
            </div>
          </form>
        </div>
      </div >
    )
  }
}

export default editPage