import BigIcon from '../../BigIcon'
import { faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular } from '@fortawesome/free-brands-svg-icons'

const About = () => {
    const icons = [faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular];
    const aboutText = "These are My Skills:";

    let selectedIndex = 0;
    const clickHandler = (e) => {
        selectedIndex = e;
        console.log(selectedIndex);
        return;
    }

    return(
    <div className='about'>
            <div className='textArea active'>
                    <h>{aboutText}</h>
            </div>
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" index={i} 
                onClickHandler={clickHandler} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>
    </div>)
}

export default About