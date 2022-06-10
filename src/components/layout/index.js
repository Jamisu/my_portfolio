import { Outlet } from 'react-router-dom'
import Menu from '../layout/Menu'

const Layout = () => {
    return(
        <div className="App">
            <Menu />
            <div className="page">
                <Outlet />
            </div>
        </div>
        )
}

export default Layout