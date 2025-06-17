import React from 'react';
import './index.scss'
import { faKitchenSet, faPersonHiking, faBiking, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import IconHandler from '../../IconHandler';

const Home = () => {
    const [dayMode] = useOutletContext<[string]>();
    const [selectedIndex, setSelectedIndex] = useState(5);
    const icons = [faPersonHiking, faBiking, faCode, faKitchenSet, faMusic];
    const homeText1 = ["I Love Mountain Hicking", "Cycling, cycling, ever cycling", "Coding is good for your brain",
     "Cooking is like an Alchemy", "Music production is the finest of the arts", "Welcome to the Chaotec Portfolio!"];

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
                <IconHandler icons={icons} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            </div>

            <div className='homeTextArea'>
                <span>{homeText1[selectedIndex]}</span>
            </div>
        </div>
        )
}

export default Home