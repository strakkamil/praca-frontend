import React from 'react'
import '../styles/Nav.css'
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'

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
          <li><NavLink to="/edit">Moje dane</NavLink></li>
        </>
      )
    }
  }
  return (
    <nav>
      <img src={logo} alt="logo" /><span>Ka-Med</span>
      <ul>
        <li><NavLink to="/about">O nas</NavLink></li>
        <li><NavLink to="/tests">Badania</NavLink></li>
        <li><NavLink to="/doctors">Lekarze</NavLink></li>
        {check()}
      </ul>
    </nav>
  )
}

export default Nav