import React, { Component } from 'react'
import '../styles/App.css'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'
import LoginPage from '../pages/loginPage'
import registerPage from '../pages/registerPage'
import EditPage from '../pages/editPage'
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
  state = {
    isModalOpen: false,
    closeModalClass: false,
    login: '',
    password: '',
    isAccess: false,
    role: '',
    id: ''
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
      closeModalClass: false
    })
  }

  closeModal = () => {
    this.setState({
      closeModalClass: true
    })
    setTimeout(() => {
      this.setState({
        isModalOpen: false
      })
    }, 300)
  }

  onChangeLogin = e => {
    const login = e.target.value
    this.setState({
      login
    })
  }

  onChangePassword = e => {
    const password = e.target.value
    this.setState({
      password
    })
  }

  onSubmit = e => {
    e.preventDefault()

    localStorage.clear()

    const patient = {
      email: this.state.login,
      password: this.state.password
    }

    axios.post('http://localhost:5000/patient/login', patient)
      .then(res => {
        this.setState({ id: res.data.id })
        localStorage.setItem('TOKEN_SECRET', res.data.token)
      })

    setTimeout(() => {
      axios.get('http://localhost:5000/patient/', { headers: { authorization: localStorage.TOKEN_SECRET } })
        .then(res => this.setState({
          isAccess: res.data.isAccess,
          role: res.data.role
        }))
      setTimeout(() => {
        if (this.state.isAccess) this.closeModal()
      }, 500)
    }, 1000)
  }

  handleLogout = () => {
    localStorage.clear()

    this.setState({
      login: '',
      password: '',
      isAccess: false,
      role: ''
    })
  }

  render() {
    const { isModalOpen } = this.state
    return (
      <Router>
        <Nav openModalFn={this.openModal} handleLogout={this.handleLogout} isAccess={this.state.isAccess} role={this.state.role} />
        {isModalOpen && <LoginPage
          closeModalFn={this.closeModal}
          closeClass={this.state.closeModalClass}
          onChangeLogin={this.onChangeLogin}
          login={this.state.login}
          onChangePassword={this.onChangePassword}
          password={this.state.password}
          onSubmit={this.onSubmit}
        />}
        <Route path='/' exact component={Header} />
        <Route path='/register' component={registerPage} />
        <Route path='/edit' component={() => <EditPage id={this.state.id} />} />
        <Footer />
      </Router>
    )
  }
}

export default App