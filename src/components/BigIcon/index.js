import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BigIcon = (params) => {
    const {ease, index, icon, size='10x', onClickHandler, onHoverHandler, selectedId} = params;
    const FontAwe = <FontAwesomeIcon className='awe ' icon={icon} size={size}/>

    const thisIndex = index;

    const localOnClick = () => {
        onClickHandler(thisIndex);
    }

    const localOnHover = () => {
        onHoverHandler(thisIndex);
    }

    return(
        <button className={"bigIcon "+ ease + " _" + (index + 1) + ' ' + (selectedId===index && "active") } onClick={localOnClick} onMouseOver={localOnHover}>
            {FontAwe}
        </button>
    )
}

export default BigIcon