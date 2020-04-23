import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import '../styles/backToTop.css'

const BackToTop = (props) => {
  return (
    <button className='back-to-top' onClick={props.scrollToTop}>
      <FontAwesomeIcon icon={faChevronUp} className="icon" />
      <FontAwesomeIcon icon={faChevronUp} className="icon" />
      <FontAwesomeIcon icon={faChevronUp} className="icon" />
    </button>
  )
}

export default BackToTop