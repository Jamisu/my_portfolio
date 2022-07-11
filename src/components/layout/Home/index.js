import './index.scss'
import BigIcon from '../../BigIcon'
import { faKitchenSet, faPersonHiking, faBiking, faPlateWheat, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const [dayMode] = useOutletContext();
    const icons = [faPersonHiking, faBiking, faCode, faKitchenSet, faMusic];
    const homeText1 = ["I Love Mountain Hicking", "Cycling, cycling, ever cycling", "Coding is good for your brain",
     "Cooking is like an Alchemy", "Music production is the finest of the arts", "Welcome to the Chaotec Portfolio!"];

    const [selectedIndex, setSelectedIndex] = useState(5);
    const [mobile, setMobile] = useState(false);

    const handleResize = (e) => {
        if (window.innerWidth <= 768 && !mobile) {
            const initIndex = selectedIndex < 5 ? selectedIndex : 0;
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
        <div className={"home " + dayMode}>
            <div className="description">
                <div>
                I am an application programmer with thirteen years of experience, 
                mostly front and a bit of back-end,
                being perfectly at work both independently or in a team. 
                I have created many games and applications for mobile devices 
                and participated in creation of desktop CMS services. 
                Last but not least I have an experience in Scrum methodology 
                and a bit of team management
                </div>
            </div>
            
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} onHoverHandler={e=>e} icon={icon}/>)}
            </div>

            <div className='homeTextArea'>
                <div>{homeText1[selectedIndex]}</div>
            </div>
        </div>
        )
}

export default Home