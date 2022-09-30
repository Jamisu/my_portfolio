import BigIcon from '../BigIcon';
import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

const IconHandler = (params) => {
    const {icons, selectedIndex, setSelectedIndex} = params;

    useEffect(() => {
        let mouseStart;
        let container = document.getElementsByClassName('iconContainer')[0]
        let containerLeft;
        let setIntervalID;
        let mouseX;

        let bounds = {};

        window.onmousemove = function(e) {
            mouseX = e.x
        }

        const timeoutHandler = (e) => {
            const newLeft = containerLeft - mouseStart + mouseX;
            if (newLeft < bounds.left && newLeft > bounds.right) {
                container.style.left = newLeft  + 'px';
            }
        }
        
        const handleDocumentMouseDown = event => {
            bounds = {'left' : container.clientWidth/2 + window.innerWidth/2,
                    'right' : window.innerWidth/2 - container.clientWidth/2};
                    
            mouseStart = mouseX
            if (container.style.left) {
                containerLeft = parseInt(container.style.left)
            } else {
                containerLeft = window.innerWidth/2;
            }

            setIntervalID = setInterval(timeoutHandler, 25)
        };
        const handleDocumentMouseUp = event => {
            clearInterval(setIntervalID)
            // gsap.to(container, {x:300, duration: 0.3})
        }
      
        container.addEventListener('mouseup', handleDocumentMouseUp);
        container.addEventListener('mousedown', handleDocumentMouseDown);

        return () => {
            container.removeEventListener('mouseup', handleDocumentMouseUp);
            container.removeEventListener('mousedown', handleDocumentMouseDown);
            window.onmousemove = null;
            clearTimeout(setIntervalID);
        };
    }, []);

    

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