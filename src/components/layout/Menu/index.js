import './index.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faBehance, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faEnvelope,
  faFileImage,
  faToggleOn
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Menu = () => {
    const [dayNightState, changeDayNightState] = useState('day')
    const dayNightMode = (e) => {
      changeDayNightState((dayNightState==='day' && 'night') || 'day');
    }

    return(
        <>
      <div className="menu">
        <div className='container'>
          <nav className="navigation">
            <NavLink exact="true" activeclassname="active" to="/">
              <FontAwesomeIcon icon={faHome} />
            </NavLink>

            <NavLink activeclassname="active" className="about-link" to="/about">
              <FontAwesomeIcon icon={faUser} />
            </NavLink>

            <NavLink
              activeclassname="active"
              className="gallery-link"
              to="/gallery"
            >
              <FontAwesomeIcon icon={faFileImage} />
            </NavLink>

            <NavLink
              activeclassname="active"
              className="contact-link"
              to="/contact"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </NavLink>
          </nav>

          {/* --LINKS */}

          <div className='links'>
            <div className='link'>
              <a
                href="https://www.linkedin.com/in/adam-pocentek-9725967b/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>

            <div className='link'>
              <a
                href="https://github.com/Jamisu"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>

            <div className='link'>
              <a
                href="https://www.behance.net/chaotec"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faBehance} />
              </a>
            </div>

            <div className='link'>
              <a
                href="https://soundcloud.com/chaotec"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faSoundcloud} />
              </a>
            </div>

            <div className={'toggle ' + dayNightState} onClick={dayNightMode}>
              <FontAwesomeIcon icon={faToggleOn} />
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default Menu