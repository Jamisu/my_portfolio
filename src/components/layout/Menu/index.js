import './index.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faBehance, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faEnvelope,
  faFileImage,
  faToggleOn,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Menu = (props) => {
    const dayMode = props.dayMode;
    const onSwitch = props.onSwitch;

    const [linksActive, setActiveLinks] = useState(false);
    const [toolVisible, setToolVisible] = useState(false);
    
    const dayNightMode = () => {
      let localState = (dayMode === 'day' && 'night') || 'day'
      onSwitch(localState);
    }

    const handleHamburger = (e) => {
      console.log('clicked', e);
      linksActive ? setActiveLinks(false) : setActiveLinks(true);
    }

    const showTool = (e) => {
      setToolVisible(true)
      const left = e.target.offsetLeft;
      console.log(left);
      document.getElementsByClassName('tooltip')[0].style.left = left + "px";
      console.log(e.target);
    }

    const hideTool = (e) => {
      setToolVisible(false)
    }

    return(
      <div className={"menu " + dayMode}>
        <div className='container'>
          <nav className="navigation">
            <NavLink exact="true" activeclassname="active" to="/my_portfolio/"  onMouseEnter={showTool} onMouseLeave={hideTool}>
              <FontAwesomeIcon icon={faHome} />
            </NavLink>

            <NavLink activeclassname="active" className="about-link" to="/my_portfolio/about"  onMouseEnter={showTool} onMouseLeave={hideTool}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>

            <NavLink
              activeclassname="active"
              className="gallery-link"
              to="/my_portfolio/gallery"
              onMouseEnter={showTool} onMouseLeave={hideTool}
            >
              <FontAwesomeIcon icon={faFileImage} />
            </NavLink>

            <NavLink
              activeclassname="active"
              className="contact-link"
              to="/my_portfolio/contact"
              onMouseEnter={showTool} onMouseLeave={hideTool}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </NavLink>
          </nav>

          {/* --LINKS */}

          <div className={'links ' + linksActive} onClick={e => handleHamburger(e)}>
            <button className='hamburger'>
              <FontAwesomeIcon icon={faBars} />
            </button>
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
            <div className={'toggle ' + dayMode} onClick={dayNightMode}>
              <FontAwesomeIcon icon={faToggleOn} />
            </div>
            
          </div>

          <div className={"tooltip " + toolVisible}>
            HOME
          </div>
        </div>
      </div>
    )
}

export default Menu