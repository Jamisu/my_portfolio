import './index.scss'
import BigIcon from '../../BigIcon'
import { faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react';
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
    const [mobile, setMobile] = useState(false);

    const onHoverHandler = (e) => {
        setSelectedIndex(e);
    }

    const handleResize = (e) => {
        if (window.innerWidth <= 768 && !mobile) {
            const initIndex = selectedIndex < 8 ? selectedIndex : 0;
            document.getElementsByClassName('iconContainer')[0].style.transform = "translate(0, -50%)"
            const bigs = document.querySelectorAll('.bigIcon');
            const offset = window.innerWidth/2 - bigs[initIndex].offsetLeft - bigs[initIndex].offsetWidth/2;
            document.getElementsByClassName('iconContainer')[0].style.left = offset + 'px';
            console.log('set mobile on resize', initIndex);
            setMobile(true);

        } else if (window.innerWidth > 768 && mobile) {
            document.getElementsByClassName('iconContainer')[0].style.left = "50%";
            document.getElementsByClassName('iconContainer')[0].style.transform = "translate(-50%, -50%)";
            console.log('unset mobile');
            setMobile(false);
        }
    }

    useEffect(() => {
        console.log('about register resize, mobile:', mobile);
        window.addEventListener("resize", handleResize);
        window.dispatchEvent(new Event('resize'));
        return (e) => {
            window.removeEventListener("resize", handleResize);
        };
    })

    const clickHandler = (e) => {
        if (mobile) {
            const bigs = document.querySelectorAll('.bigIcon');
            const offset = window.innerWidth/2 - bigs[e].offsetLeft - bigs[e].offsetWidth/2;

            document.getElementsByClassName('iconContainer')[0].style.left = offset + 'px';
        }
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