import React, { Component } from 'react'
import '../styles/registerPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

class registerDoctor extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    pesel: '',
    city: '',
    street: '',
    password: '',
    confirmPassword: '',
    specialization: ''
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
      case 'password':
        this.setState({
          password: e.target.value
        })
        break
      case 'confirmPassword':
        this.setState({
          confirmPassword: e.target.value
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

  onSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname, email, phone, pesel, city, street, password, confirmPassword, specialization } = this.state
    const doctor = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      pesel: pesel,
      city: city,
      street: street,
      password: password,
      specialization: specialization
    }

    if (password !== confirmPassword) return alert('hasła się rożnia')

    axios.post('http://localhost:5000/doctor/register', doctor)
      .then(res => console.log('udalo sie'))
  }

  render() {
    const { firstname, lastname, email, phone, pesel, city, street, password, confirmPassword, specialization } = this.state
    return (
      <div className='register-wrap'>
        <div className="register">
          <h1>Witaj na stronie rejestracji</h1>
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
              <div className="password">
                <input type="password" value={password} name="password-input" required autoComplete="off" onChange={this.onChange.bind(this, 'password')} />
                <label htmlFor="password-input" className="password-label">
                  <span className="password-content">hasło</span>
                </label>
              </div>
              <div className="password">
                <input type="password" value={confirmPassword} name="password-input" required autoComplete="off" onChange={this.onChange.bind(this, 'confirmPassword')} />
                <label htmlFor="password-input" className="password-label">
                  <span className="password-content">powtórz hasło</span>
                </label>
              </div>
              <div className="login">
                <input type="text" name="login-input" value={specialization} required autoComplete="off" onChange={this.onChange.bind(this, 'specialization')} />
                <label htmlFor="login-input" className="login-label">
                  <span className="login-content">specjalizacja</span>
                </label>
              </div>
              <div className="button">
                <button type="submit">Rejestruj</button>
                <Link to='/doctors'>Powrót</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default registerDoctor