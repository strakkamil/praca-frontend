import React from 'react'
import '../styles/Nav.css'
import logo from '../images/logo.png'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import registerPage from '../pages/registerPage'

const Nav = props => {
  return (
    <Router>
      <nav>
        <img src={logo} alt="logo" /><span>Ka-Med</span>
        <ul>
          <li><NavLink to="/about">O nas</NavLink></li>
          <li><NavLink to="/tests">Badania</NavLink></li>
          <li><NavLink to="/doctors">Lekarze</NavLink></li>
          <li><NavLink to="/" onClick={props.openModalFn}>Logowanie</NavLink></li>
          <li><NavLink to="/register">Rejestracja</NavLink></li>
        </ul>
      </nav>
      <Route path="/register" component={registerPage} />

    </Router>
  )
}

export default Nav