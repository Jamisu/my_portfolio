import './index.scss'
import BigIcon from '../../BigIcon'
import { faPersonHiking, faBiking, faPlateWheat, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const Home = () => {
    const icons = [faPersonHiking, faBiking, faCode, faPlateWheat, faMusic];
    const homeText1 = ["I Love Mountain Hicking", "Cycling is the best", "Coding is one of m Hobbies",
     "Cooking is Important part of my life - Alchemy", "I am making electronic music since 1996", "Welcome to the Chaotec Portfolio!"]
    const homeText2 = ["", "", "", "", "", "These are my hobbies:"]

    const [selectedIndex, setSelectedIndex] = useState(5);
    let textClass = 'textArea active';

    const clickHandler = (e) => {
        setSelectedIndex(e);
    }

    return(
        <div className="home">
            <div className={textClass}>
                <div>{homeText1[selectedIndex]}</div>
                <div>{homeText2[selectedIndex]}</div>
            </div>
            
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>
        </div>
        )
}

export default Home