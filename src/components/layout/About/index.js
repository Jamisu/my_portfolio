import BigIcon from '../../BigIcon'
import { faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';

const About = () => {
    const icons = [faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular];
    const aboutText = "These are My Skills:";
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const clickHandler = (e) => {
        setSelectedIndex(e);
    }

    return(
    <div className='about'>
            <div className='textArea active'>
                    <h>{aboutText}</h>
            </div>
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>
    </div>)
}

export default About