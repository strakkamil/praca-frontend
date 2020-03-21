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
import RegisterDoctor from '../pages/registerDoctors'
import DoctorEditPage from '../pages/doctorEditPage'
import MainDoctors from '../components/mainDoctors'
import DoctorPanel from '../components/doctorPanel'
import About from '../components/About'
import AddVisitPage from '../pages/addVisitPage'


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
    isDoctor: false,
    doctorId: '',
    doctors: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/doctor/main')
      .then(res => this.setState({
        doctors: res.data
      }))
  }

  getDoctorId = (id) => {
    const doctorId = id
    this.setState({
      doctorId
    })
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
    if (this.state.isDoctor) {
      axios.post('http://localhost:5000/doctor/login', user)
        .then(res => {
          this.setState({ id: res.data.id })
          localStorage.setItem('TOKEN_SECRET', res.data.token)
        })

      setTimeout(() => {
        axios.get('http://localhost:5000/doctor/login', { headers: { authorization: localStorage.TOKEN_SECRET } })
          .then(res => this.setState({
            isAccess: res.data.isAccess,
            role: res.data.role,
            path: 'doctor'
          }))
        setTimeout(() => {
          if (this.state.isAccess) this.closeModal()
        }, 500)
      }, 1000)
    }
    if (!this.state.isReceptionist && !this.state.isDoctor) {
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
      id: '',
      isDoctor: false,
      isReceptionist: false,
      doctorId: ''
    })
  }

  onChangeIsReceptionist = () => {
    this.setState({
      isReceptionist: !this.state.isReceptionist,
      isDoctor: false
    })
  }

  onChangeIsDoctor = () => {
    this.setState({
      isDoctor: !this.state.isDoctor,
      isReceptionist: false
    })
  }

  onClickMapOpen = () => {
    window.open('https://www.google.pl/maps/place/Plac+Corazziego/@51.4009817,21.1556939,17z/data=!3m1!4b1!4m5!3m4!1s0x47185fe2edfddc4b:0xf17fa83ca64af933!8m2!3d51.4009784!4d21.1578826')
  }

  render() {
    const { isModalOpen } = this.state
    return (
      <Router>
        <Nav
          openModalFn={this.openModal}
          handleLogout={this.handleLogout}
          isAccess={this.state.isAccess}
          role={this.state.role}
          isDoctor={this.state.isDoctor}
        />
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
          isDoctor={this.state.isDoctor}
          onChangeIsDoctor={this.onChangeIsDoctor}
        />}
        <Route path='/' exact component={Header} />
        <Route path='/' exact component={() => <MainDoctors doctors={this.state.doctors} />} />
        <Route path='/doctors' exact component={() => <DoctorsPage role={this.state.role} getDoctorId={this.getDoctorId} />} />
        <Route path='/doctors/register' component={() => <RegisterDoctor getDoctors={this.getDoctors} />} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/edit' component={() => <EditPage id={this.state.id} role={this.state.role} />} />
        <Route path='/doctors/edit' component={() => <DoctorEditPage id={this.state.doctorId} doctorId={this.state.id} isDoctor={this.state.isDoctor} />} />
        <Route path='/doctor' exact component={DoctorPanel} />
        <Route path='/visits/add' component={AddVisitPage} />
        <About onClick={this.onClickMapOpen} />
        <Footer />
      </Router>
    )
  }
}

export default App