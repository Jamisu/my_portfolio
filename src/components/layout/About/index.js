import BigIcon from '../../BigIcon'
import { faReact, faJs, faCss3, faHtml5, faSass, faPython, faJava } from '@fortawesome/free-brands-svg-icons'

const About = () => {
    const icons = [faReact, faJs, faCss3, faHtml5, faSass, faPython, faJava];

    return(
    <div className='about'>
        <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon ease="bounceIn" index={"_"+(i+1)} icon={icon} color="#ffff00" size='10x'/>)}    
            </div>
    </div>)
}

export default About