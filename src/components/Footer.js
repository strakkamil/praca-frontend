import React from 'react'
import '../styles/Footer.css'

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer><span>&copy; {year} ka-med</span></footer>
  )
}

export default Footer