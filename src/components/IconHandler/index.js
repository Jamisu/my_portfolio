import BigIcon from '../BigIcon';
import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

const IconHandler = (params) => {
    const {icons, selectedIndex, setSelectedIndex} = params;
    let mouseX;

    useEffect(() => {
        let mouseStart;
        let container = document.getElementsByClassName('iconContainer')[0]
        let containerLeft = 0;
        const timeoutHandler = (e) => {
            container.style.left = containerLeft - mouseStart + mouseX + 'px';
            console.log(container.style.left, 'container', containerLeft + mouseStart - mouseX );
        }
        let setIntervalID;
        
        const handleDocumentMouseDown = event => {
            console.log('mouseDown', mouseStart, mouseX)
            mouseStart = mouseX
            containerLeft = container.style.left || window.innerHeight/2;
            setIntervalID = setInterval(timeoutHandler, 10)
        };
        const handleDocumentMouseUp = event => {
            console.log('mouseUp', mouseX)
            clearTimeout(setIntervalID)
        };
      
        document.addEventListener('mouseup', handleDocumentMouseUp);
        document.addEventListener('mousedown', handleDocumentMouseDown);

        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
            document.removeEventListener('mousedown', handleDocumentMouseDown);
            onmousemove = null;
            clearTimeout(setIntervalID);
        };
    }, [mouseX]);

    onmousemove = function(e) {
        mouseX = e.x
    }

    const clickHandler = (e) => {
        setSelectedIndex(e);
    }
    const onHoverHandler = (e) => {
    }

    const iconList = () => {
        return icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
        onClickHandler={clickHandler} onHoverHandler={onHoverHandler} icon={icon}/>);
    }

    return (
        iconList()
    )
}

export default IconHandler