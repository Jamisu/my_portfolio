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
    const [mobile, setMobile] = useState(false);
    let draggables = useRef();
    let itemListArray = [];

    const onHoverHandler = (e) => {
        // setSelectedIndex(e);
    }

    const handleResize = (e) => {
        if (window.innerWidth <= 768 && !mobile) {
            // const initIndex = selectedIndex < 8 ? selectedIndex : 0;
            // document.getElementsByClassName('iconContainer')[0].style.transform = "translate(0, -50%)"
            // const bigs = document.querySelectorAll('.bigIcon');
            // const offset = window.innerWidth/2 - bigs[initIndex].offsetLeft - bigs[initIndex].offsetWidth/2;
            // document.getElementsByClassName('iconContainer')[0].style.left = offset + 'px';
            // console.log('set mobile on resize', initIndex);
            draggables.current[0].enable()
            setMobile(true);

        } else if (window.innerWidth > 768 && mobile) {
            draggables.current[0].target.style.left = "50%";
            draggables.current[0].target.style.transform = "translate(-50%, -50%)";
            console.log('unset mobile', draggables.current[0]);
            draggables.current[0].disable()
            setMobile(false);
        }
    }

    useEffect(() => {
        gsap.registerPlugin(Draggable);
        draggables.current = Draggable.create(".iconContainer", {
                type: "x",
                onPress: function() {
                    if(!mobile) {draggables.current[0].disable()}
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
        console.log('about register resize, mobile:', mobile);
        window.addEventListener("resize", handleResize);
        window.dispatchEvent(new Event('resize'));
        return (e) => {
            window.removeEventListener("resize", handleResize);
        };
    })

    const clickHandler = (e) => {
        if (mobile) {
            // const bigs = document.querySelectorAll('.bigIcon');
            // const offset = window.innerWidth/2 - bigs[e].offsetLeft - bigs[e].offsetWidth/2;

            // document.getElementsByClassName('iconContainer')[0].style.left = offset + 'px';
        }
        
        setSelectedIndex(e);
    }

    const iconList = () => {
        itemListArray = icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
        onClickHandler={clickHandler} onHoverHandler={onHoverHandler} icon={icon}/>)

        return itemListArray;
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
                <div>{homeText1[selectedIndex]}</div>
            </div>
        </div>
        )
}

export default Home