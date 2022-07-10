import './index.scss'
import BigIcon from '../../BigIcon'
import { faKitchenSet, faPersonHiking, faBiking, faPlateWheat, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const [dayMode] = useOutletContext();
    const icons = [faPersonHiking, faBiking, faCode, faKitchenSet, faMusic];
    const homeText1 = ["I Love Mountain Hicking", "Cycling, cycling, ever cycling", "Coding is good for your brain",
     "Cooking is like an an Alchemy", "Music production is the finest of the arts", "Welcome to the Chaotec Portfolio!"];

    const [selectedIndex, setSelectedIndex] = useState(5);

    const clickHandler = (e) => {
        setSelectedIndex(e);
    }

    return(
        <div className={"home " + dayMode}>
            <div className="description">
                <div>
                <br/>
                I am an application programmer with thirteen years of experience. 
                mostly front and a bit of back-end. 
                Being perfectly at work both independently or in a team. 
                I have created many games and applications for mobile devices. 
                and participated in creation of desktop CMS services. 
                Last but not least I have an experience in Scrum methodology. 
                and a bit of team management :)
                </div>
            </div>
            
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} onHoverHandler={e=>e} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>

            <div className='homeTextArea'>
                <div>{homeText1[selectedIndex]}</div>
            </div>
        </div>
        )
}

export default Home