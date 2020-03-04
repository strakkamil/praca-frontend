import React, { Component } from 'react'
import '../styles/App.css'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'
import LoginPage from '../pages/loginPage'
import axios from 'axios'


class App extends Component {
  state = {
    isModalOpen: false,
    closeModalClass: false,
    login: '',
    password: '',
    isAccess: false
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

    const root = {
      login: this.state.login,
      password: this.state.password
    }

    axios.post('http://localhost:5000/root/login', root)
      .then(res => localStorage.setItem('TOKEN_ROOT', res.data))

    setTimeout(() => {
      axios.get('http://localhost:5000/root/', { headers: { authorization: localStorage.TOKEN_ROOT } })
        .then(res => this.setState({
          isAccess: res.data.isAccess
        }))
      setTimeout(() => {
        if (this.state.isAccess) this.closeModal()
      }, 500)
    }, 1000)
  }

  render() {
    const { isModalOpen } = this.state
    return (
      <>
        <Nav openModalFn={this.openModal} />
        <Header />
        <Footer />
        {isModalOpen && <LoginPage
          closeModalFn={this.closeModal}
          closeClass={this.state.closeModalClass}
          onChangeLogin={this.onChangeLogin}
          login={this.state.login}
          onChangePassword={this.onChangePassword}
          password={this.state.password}
          onSubmit={this.onSubmit}
        />}
      </>
    )
  }
}

export default App