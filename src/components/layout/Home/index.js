import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPersonHiking, faBiking, faPlateWheat, faCode } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    return(
        <div className="home">
            <div className='iconContainer' >
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faPersonHiking} color="#ffff00" size='10x'/>
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faBiking} color="#ffff00" size='10x'/>
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faCode} color="#ffff00" size='10x'/>
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faPlateWheat} color="#ffff00" size='10x'/>    
            </div>
        </div>
        )
}

export default Home