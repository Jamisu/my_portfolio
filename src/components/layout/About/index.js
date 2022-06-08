import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faPython, faJava, faJs, faHtml5, faCss3, faSass } from '@fortawesome/free-brands-svg-icons'

const About = () => {
    return(
    <div>
        <div className='iconContainer' >
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faReact} color="#ffff00" size='10x'/>
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faJs} color="#ffff00" size='10x'/>
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faCss3} color="#ffff00" size='10x'/>
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faHtml5} color="#ffff00" size='10x'/>    
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faSass} color="#ffff00" size='10x'/>    
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faPython} color="#ffff00" size='10x'/>    
                <FontAwesomeIcon className="bigIcon bounceIn" icon={faJava} color="#ffff00" size='10x'/>    
            </div>
    </div>)
}

export default About