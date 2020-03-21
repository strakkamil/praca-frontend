import React from 'react'
import '../styles/about.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const About = (props) => {
  return (
    <div className="about-container">
      <div className="map" onClick={props.onClick}>
        <div className="map-image">
        </div>
        <div className="map-image__hover">
          <div className="hover-info">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <span>Przejdź do mapy</span>
          </div>
        </div>
      </div>
      <div className="about">
        <h2>
          Dane adresowe
        </h2>
        <span>
          Ka-med Sp. z o.o.
        </span>
        <span>
          Plac Coraziego
        </span>
        <span>
          26-600 Radom
        </span>
        <h2>
          Dane rejestrowe
        </h2>
        <span>REGON: 121212121</span>
        <span>NIP: 123-12-12-123</span>
        <h2>Skontaktuj się z nami</h2>
        <span>48 123 12 12</span>
      </div>
    </div >
  )
}

export default About