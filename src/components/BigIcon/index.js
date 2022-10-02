import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useRef} from 'react'

const BigIcon = (params) => {
    const { ease, index, icon, size='10x', onClickHandler, onHoverHandler, selectedId} = params;
    const FontAwe = <FontAwesomeIcon className='awe ' icon={icon} size={size}/>
    // const buttonRef = useRef();

    const thisIndex = index;

    // const getWidth = () => {
    //     return buttonRef.current.getBoundingClientRect().width
    // }

    const localOnClick = () => {
        onClickHandler(thisIndex);
    }

    const localOnHover = () => {
        onHoverHandler(thisIndex);
    }

    return(
        <button 
            className={"bigIcon "+ ease + " _" + (index + 1) + ' ' + (selectedId===index && "active") }
            onClick={localOnClick}
            onMouseOver={localOnHover}>

            {FontAwe}

        </button>
    )
}

export default BigIcon