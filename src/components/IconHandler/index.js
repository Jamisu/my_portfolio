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

        const timeoutHandler = (e) => {
            setContainetX();
        }

        const setBoundsAndStartPos = e => {
            console.log('setBoundsAndStartPos');
            bounds = {'left' : container.clientWidth/2 + window.innerWidth/2,
                    'right' : window.innerWidth/2 - container.clientWidth/2};
                    
            mouseStart = mouseX
            if (container.style.left) {
                containerLeft = parseInt(container.style.left)
            } else {
                containerLeft = window.innerWidth/2;
            }
        }

        const setContainetX = e => {
            const newLeft = containerLeft - mouseStart + mouseX;
            if (newLeft < bounds.left && newLeft > bounds.right) {
                console.log('set container x');
                container.style.left = newLeft  + 'px';
            }
        }
        
        // DESKTOP MOUSE
        const handleDocumentMouseDown = event => {
            console.log('mDown');

            setBoundsAndStartPos();

            window.onmousemove = function(e) {
                mouseX = e.x
                console.log('move', mouseX);
            }

            setIntervalID = setInterval(timeoutHandler, 25)
        };
        const handleDocumentMouseUp = event => {
            console.log('mUp');
            window.onmousemove = null;
            clearInterval(setIntervalID)
        }

        // MOBILE TOUCH MOUSE
        const handleTouchMove = e => {
            mouseX = e.changedTouches[0].clientX;
            setContainetX();
            console.log('touchMove', mouseX);
        }
        const handleTouchStart = e => {
            console.log('touchStart');
            setBoundsAndStartPos();
        }
        const handleTouchEnd = e => {
            console.log('touchEnd');
        }
      
        window.addEventListener('mouseup', handleDocumentMouseUp);
        container.addEventListener('mousedown', handleDocumentMouseDown);

        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mouseup', handleDocumentMouseUp);
            container.removeEventListener('mousedown', handleDocumentMouseDown);

            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);

            window.onmousemove = null;
            clearInterval(setIntervalID);
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