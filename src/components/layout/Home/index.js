import './index.scss'
import BigIcon from '../../BigIcon'
import { faPersonHiking, faBiking, faPlateWheat, faCode } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    const icons = [faPersonHiking, faBiking, faPlateWheat, faCode];

    return(
        <div className="home">
            <div className='iconContainer' >
                {icons.map((icon, i) => <BigIcon ease="bounceIn" index={"_"+(i+1)} icon={icon} color="#ffff00" size='10x'/>)} 
            </div>
        </div>
        )
}

export default Home