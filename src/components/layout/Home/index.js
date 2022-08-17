import './index.scss'
import BigIcon from '../../BigIcon'
import { faKitchenSet, faPersonHiking, faBiking, faPlateWheat, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

const Home = () => {
    const [dayMode] = useOutletContext();
    const icons = [faPersonHiking, faBiking, faCode, faKitchenSet, faMusic];
    const homeText1 = ["I Love Mountain Hicking", "Cycling, cycling, ever cycling", "Coding is good for your brain",
     "Cooking is like an Alchemy", "Music production is the finest of the arts", "Welcome to the Chaotec Portfolio!"];

    const [selectedIndex, setSelectedIndex] = useState(5);
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
        <div className={"home " + dayMode}>
            <div className="description">
                <p>
                I am an application programmer with thirteen years of experience, 
                mostly front and a bit of back-end,
                being perfectly at work both independently or in a team. 
                I have created many games and applications for mobile devices 
                and participated in creation of desktop CMS services. 
                Last but not least I have an experience in Scrum methodology 
                and a bit of team management
                </p>
            </div>
            
            <div className='iconContainer' >
                {iconList()}
            </div>

            <div className='homeTextArea'>
                <h>{homeText1[selectedIndex]}</h>
            </div>
        </div>
        )
}

export default Home