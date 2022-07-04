import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import Menu from '../layout/Menu'
import Footer from '../layout/Footer'

const Layout = () => {
    const [mode, setDayNightState] = useState('day');
    const onClickCallback = (mode) => {
        console.log(mode);
        setDayNightState(mode);
    }
    return(
        <div className="App">
            <Menu onSwitch={onClickCallback}/>
            <div className="page">
                {console.log('mode', mode)}
                <Outlet context={mode}/>
            </div>
            <Footer mode={mode}/>
        </div>
        )
}

export default Layout