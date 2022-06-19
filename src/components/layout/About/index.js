import BigIcon from '../../BigIcon'
import { faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';

const About = () => {
    const icons = [faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular];
    const languageText = ['React:', 'JS:', 'CSS:', 'HTML:', 'SASS:', 'Python:', 'Java:', 'Angular:'];
    const aboutText = [
    "just couple of years with 16.x and 17.x",
    "since 2016",
    "Not that bad then I thought",
    "Must Be ;)",
    "Wonderfull mixup of styles and code",
    "Like Functional and Object Programming",
    "The Classic",
    "Just couple of months with it",

    "These are My Skills:"];

    const [selectedIndex, setSelectedIndex] = useState(8);

    const clickHandler = (e) => {
        setSelectedIndex(e);
    }

    return(
    <div className='about'>
            <div className='textArea active'>
                <div>{languageText[selectedIndex]}</div>
                <div>{aboutText[selectedIndex]}</div>
            </div>
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>
    </div>)
}

export default About