import './index.scss'
import BigIcon from '../../BigIcon'
import { faReact, faJsSquare, faCss3, faHtml5, faSass, faPython, faJava, faAngular } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";


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
    let draggables = useRef();

    useEffect(() => {
        gsap.registerPlugin(Draggable);
        draggables.current = Draggable.create(".iconContainer", {
                type: "x",
                onPress: function() {
                    if(window.innerWidth > 768) {
                        draggables.current[0].disable()
                    } else {
                        draggables.current[0].enable()
                    }
                },
                onRelease: function() {
                    const endX = this.endX;
                    const currentScreenOffset = [...this.target.children].map((el, i) => (el.getBoundingClientRect().x + el.getBoundingClientRect().width/2))
                    const windowCenter = window.innerWidth/2;
                    let indexClosestToCenter = 0;
                    let lastClosestX = 10000;

                    for(var i=0; i < currentScreenOffset.length; i++) {
                        const currentItemDifference = Math.abs(currentScreenOffset[i] - windowCenter);
                        if (currentItemDifference < lastClosestX) {
                            lastClosestX = currentItemDifference;
                            indexClosestToCenter = i;
                        } else if (currentItemDifference >= lastClosestX) {
                            break;
                        }
                        indexClosestToCenter = i;
                    }
                    setSelectedIndex(indexClosestToCenter);
                    const correctionX = endX - currentScreenOffset[indexClosestToCenter] + windowCenter;

                    gsap.to(".iconContainer", {
                        x: correctionX,
                        duration: .5,
                        ease: "back"
                    })
                }
            });
        }
    );

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        window.dispatchEvent(new Event('resize'));
        return (e) => {
            window.removeEventListener("resize", handleResize);
        };
    })
    const handleResize = (e) => {
        if (window.innerWidth > 768) {
            draggables.current[0].target.style.left = "50%";
            draggables.current[0].target.style.transform = "translate(-50%, -50%)";
        }
    }

    const clickHandler = (e) => {
        setSelectedIndex(e);
    }
    const onHoverHandler = (e) => {
    }

    const iconList = () => {
        return icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
        onClickHandler={clickHandler} onHoverHandler={onHoverHandler} icon={icon}/>);
    }

    return(
    <div className={'about ' + dayMode}>
            <div className={'aboutTextArea'}>
                <div>{languageText[selectedIndex]}</div>
                <div>{aboutText[selectedIndex]}</div>
            </div>
            <div className={'iconContainer'} >
                {iconList()} 
            </div>
    </div>)
}

export default About