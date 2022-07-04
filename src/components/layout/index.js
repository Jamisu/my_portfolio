import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import Menu from '../layout/Menu'
import Footer from '../layout/Footer'

const Layout = () => {
    const [dayMode, setDayNightState] = useState('day');
    const onSwitch = (day) => {
        console.log('currently', dayMode);
        setDayNightState(day);
        console.log('setting', day);
        
    }
    return(
        <div className="App">
            <Menu onSwitch={onSwitch} dayMode={dayMode}/>
            <div className="page">
                {/* <Outlet context={dayMode}/> */}
                <Outlet context={[dayMode, setDayNightState]}/>
            </div>
            <Footer mode={dayMode}/>
        </div>
        )
}

export default Layout