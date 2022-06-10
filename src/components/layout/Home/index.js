import './index.scss'
import BigIcon from '../../BigIcon'
import { faPersonHiking, faBiking, faPlateWheat, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const Home = () => {
    const icons = [faPersonHiking, faBiking, faCode, faPlateWheat, faMusic];
    const homeText1 = "Welcome to the Chaotec Portfolio!"
    const homeText2 = "And A Lot More"
    const homeText3 = "These are my hobbies:"

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const clickHandler = (e) => {
        setSelectedIndex(e);
    }

    return(
        <div className="home">
            <div className='textArea active'>
                <div>{homeText1}</div>
                <div>{homeText2}</div>
                <div>{homeText3}</div>
            </div>
            
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>
        </div>
        )
}

export default Home