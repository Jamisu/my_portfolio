import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BigIcon = (params) => {
    const {ease, index, icon, color="#ffff00", size='10x', onClickHandler, selectedId} = params;
    const FontAwe = <FontAwesomeIcon className='awe ' icon={icon} color={color} size={size}/>

    let thisIndex = index;

    const localOnClick = () => {
        onClickHandler(thisIndex);
    }

    return(
        <button className={"bigIcon "+ ease + " _" + (index + 1) + ' ' + (selectedId===index && "active") } onClick={localOnClick}>
            {FontAwe}
        </button>
    )
}

export default BigIcon