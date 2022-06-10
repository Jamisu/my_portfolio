import './index.scss'
import BigIcon from '../../BigIcon'
import { faPersonHiking, faBiking, faPlateWheat, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import React from 'react'

const Home = () => {
    const icons = [faPersonHiking, faBiking, faPlateWheat, faCode, faMusic];
    const homeText1 = "Welcome to the Chaotec Portfolio!"
    const homeText2 = "And A Lot More"
    const homeText3 = "These are my hobbies:"

    const [selectedIndex, setSelectedIndex] = useState(1000);

    const clickHandler = (e) => {
        console.log('e', e);
        console.log('set e', selectedIndex);
        setSelectedIndex(e);
    }

    return(
        <div className="home">
            <div className='textArea active'>
                <h>{homeText1}</h>
                <h>{homeText2}</h>
                <h>{homeText3}</h>
            </div>
            
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
                onClickHandler={clickHandler} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>
        </div>
        )
}

export default Home