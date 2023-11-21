import './index.scss'
import { faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import IconHandler from '../../IconHandler';

const About = () => {
    const [dayMode] = useOutletContext();
    const [selectedIndex, setSelectedIndex] = useState(8);
    const icons = [faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular];
    const languageText = ['React:', 'JS/TS:', 'CSS:', 'HTML:', 'SASS:', 'Python:', 'Java:', 'Angular:'];
    const aboutText = [
    "Advanced",
    "Advanced",
    "Intermediate",
    "Advanced",
    "Intermediate",
    "Intermediate",
    "Solid Basics + OOP",
    "Basics",

    "These are My Skills:"];

    return(
    <div className={'about ' + dayMode}>
            <div className={'aboutTextArea'}>
                <div>{languageText[selectedIndex]}</div>
                <div>{aboutText[selectedIndex]}</div>
            </div>
            <div className={'iconContainer'} >
                <IconHandler icons={icons} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            </div>
    </div>)
}

export default About