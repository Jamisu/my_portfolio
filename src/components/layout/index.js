import { Outlet } from 'react-router-dom'
import Menu from '../layout/Menu'
import Footer from '../layout/Footer'

const Layout = () => {
    return(
        <div className="App">
            <Menu />
            <div className="page">
                <Outlet />
            </div>
            <Footer />
        </div>
        )
}

export default Layout