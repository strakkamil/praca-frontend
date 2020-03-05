import React, { Component } from 'react'
import '../styles/App.css'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import EditPage from '../pages/editPage'
import DoctorsPage from '../pages/doctorsPage'
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
    id: '',
    isReceptionist: false,
    path: '',
    doctors: []
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

    const user = {
      email: this.state.login,
      password: this.state.password
    }

    if (this.state.isReceptionist) {
      axios.post('http://localhost:5000/receptionist/login', user)
        .then(res => {
          this.setState({ id: res.data.id })
          localStorage.setItem('TOKEN_SECRET', res.data.token)
        })

      setTimeout(() => {
        axios.get('http://localhost:5000/receptionist', { headers: { authorization: localStorage.TOKEN_SECRET } })
          .then(res => this.setState({
            isAccess: res.data.isAccess,
            role: res.data.role,
            path: 'receptionist'
          }))
        setTimeout(() => {
          if (this.state.isAccess) this.closeModal()
        }, 500)
      }, 1000)
    }
    if (!this.state.isReceptionist) {
      axios.post('http://localhost:5000/patient/login', user)
        .then(res => {
          this.setState({ id: res.data.id })
          localStorage.setItem('TOKEN_SECRET', res.data.token)
        })

      setTimeout(() => {
        axios.get('http://localhost:5000/patient', { headers: { authorization: localStorage.TOKEN_SECRET } })
          .then(res => this.setState({
            isAccess: res.data.isAccess,
            role: res.data.role,
            path: 'patient'
          }))
        setTimeout(() => {
          if (this.state.isAccess) this.closeModal()
        }, 500)
      }, 1000)
    }
  }

  handleLogout = () => {
    localStorage.clear()

    this.setState({
      login: '',
      password: '',
      isAccess: false,
      role: '',
      id: ''
    })
  }

  onChangeIsReceptionist = () => {
    this.setState({
      isReceptionist: !this.state.isReceptionist
    })
  }

  componentDidMount() {
    axios.get('http://localhost:5000/doctor')
      .then(res => this.setState({ doctors: res.data }))
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
          isReceptionist={this.state.isReceptionist}
          onChangeIsReceptionist={this.onChangeIsReceptionist}
          path={this.state.path}
        />}
        <Route path='/' exact component={Header} />
        <Route path='/doctors' component={() => <DoctorsPage doctors={this.state.doctors} />} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/edit' component={() => <EditPage id={this.state.id} role={this.state.role} />} />
        <Footer />
      </Router>
    )
  }
}

export default App