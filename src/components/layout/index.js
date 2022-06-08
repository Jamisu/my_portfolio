import { Outlet } from 'react-router-dom'
import Menu from '../layout/Menu'

const Layout = () => {
    return(
        <div className="App">
            <Menu />
            <div className="page">
                <Outlet />
                <span className="tags bottom-tags">
                    <br />
                </span>
            </div>
            
        </div>
        )
}

export default Layout