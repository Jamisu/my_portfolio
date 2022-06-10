import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BigIcon = (params) => {
    const {ease, index, icon, color="#ffff00", size='10x'} = params;
    const FontAwe = <FontAwesomeIcon className='awe ' icon={icon} color={color} size={size}/>

    return(
        <button className={"bigIcon text-animate-hover "+ ease + " " + index}>
            {FontAwe}
        </button>
    )
}

export default BigIcon