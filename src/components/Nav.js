import React from 'react'
import '../styles/Nav.css'
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

const Nav = props => {
  const check = () => {
    if (!props.isAccess) {
      return (
        <>
          <li><NavLink to="/" onClick={props.openModalFn}>Logowanie</NavLink></li>
          <li><NavLink to="/register">Rejestracja</NavLink></li>
        </>
      )
    } else if (props.isAccess) {
      return (
        <>
          <li><NavLink to="/" onClick={props.handleLogout}>Wyloguj</NavLink></li>
          {props.isDoctor ? <li><NavLink to="/doctors/edit">Moje dane</NavLink></li> : <li><NavLink to="/edit">Moje dane</NavLink></li>}
        </>
      )
    }
  }
  return (
    <nav>
      <NavLink to="/" className="medical-logo">
        <img src={logo} alt="logo" />
        <span>Ka-Med</span>
      </NavLink>
      <ul>
        <li><ScrollLink to='about' smooth={true} duration={1000}>O nas</ScrollLink></li>
        <li><NavLink to="/tests">Badania</NavLink></li>
        {props.isDoctor ? <li><NavLink to="/doctor">Lekarze</NavLink></li> : <li><NavLink to="/doctors">Lekarze</NavLink></li>}
        {check()}
      </ul>
    </nav>
  )
}

export default Nav