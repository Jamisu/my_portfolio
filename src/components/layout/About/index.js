import './index.scss'
import BigIcon from '../../BigIcon'
import { faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";

const About = () => {
    const [dayMode] = useOutletContext();
    const icons = [faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular];
    const languageText = ['React:', 'JS:', 'CSS:', 'HTML:', 'SASS:', 'Python:', 'Java:', 'Angular:'];
    const aboutText = [
    "Intermediate",
    "Intermediate",
    "Intermediate",
    "Advanced",
    "Intermediate",
    "Intermediate",
    "Solid Basics + OOP",
    "Basics",

    "These are My Skills:"];

    const [selectedIndex, setSelectedIndex] = useState(8);

    const onHoverHandler = (e) => {
        setSelectedIndex(e);
    }

    const clickHandler = (e) => {
        const bigs = document.querySelectorAll('.bigIcon');
        const offset = window.innerWidth/2 - bigs[e].offsetLeft - bigs[e].offsetWidth/2;

        document.getElementsByClassName('iconContainer')[0].style.left = offset + 'px';
        setSelectedIndex(e);
    }

    return(
    <div className={'about ' + dayMode}>
            <div className={'aboutTextArea'}>
                <div>{languageText[selectedIndex]}</div>
                <div>{aboutText[selectedIndex]}</div>
            </div>
            <div className={'iconContainer'} >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} onHoverHandler={onHoverHandler} icon={icon}/>)} 
            </div>
    </div>)
}

export default About