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
import { NavLink, useOutletContext } from 'react-router-dom'
import { useState } from 'react'

const Menu = (props) => {
    let dayMode = props.dayMode;
    const onSwitch = props.onSwitch;
    const [dayNightState, setDayNightState] = useState('day');
    
    const dayNightMode = () => {
      console.log('from props', dayMode);
      let localState = (dayNightState === 'day' && 'night') || 'day'
      setDayNightState(localState);
      onSwitch(localState);
      document.body.className = localState;
    }

    return(
      <div className={"menu " + dayNightState}>
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
    )
}

export default Menu