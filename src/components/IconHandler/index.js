import BigIcon from '../BigIcon';
import { useEffect, useRef } from 'react';

const IconHandler = (params) => {
    const {icons, selectedIndex, setSelectedIndex} = params;
    let elemArr = [];

    useEffect(() => {
        const container = document.getElementsByClassName('iconContainer')[0]
        const iconsArrWidths = Array.from(container.children).map(e => e.getBoundingClientRect().width)
        let mouseStart;
        let containerLeft;
        let setIntervalID;
        let mouseX;

        let bounds = {};
        
        const timeoutHandler = e => {
            setContainerX();
        }

        const setBoundsAndStartPos = e => {
            console.log('setBoundsAndStartPos', e);
            bounds = {'left' : container.clientWidth/2 + window.innerWidth/2,
                    'right' : window.innerWidth/2 - container.clientWidth/2};

            mouseStart = mouseX = e.clientX || e.changedTouches[0].clientX;
            if (container.style.left) {
                containerLeft = parseInt(container.style.left)
            } else {
                containerLeft = window.innerWidth/2;
            }
        }

        const setContainerX = e => {
            const newLeft = containerLeft - mouseStart + mouseX;
             if (newLeft < bounds.left && newLeft > bounds.right) {
                container.style.left = newLeft  + 'px';
             }
        }
        
        /// DESKTOP MOUSE ///
        const handleDocumentMouseDown = e => {
            if(window.innerWidth > container.clientWidth) {
                return
            }

            setBoundsAndStartPos(e);
            console.log('mDown');   
            window.addEventListener('mouseup', handleDocumentMouseUp);
            window.onmousemove = function(e) {
                mouseX = e.x
            }
            setIntervalID = setInterval(timeoutHandler, 25)
        };
        const handleDocumentMouseUp = e => {
            console.log('mUp');
            window.removeEventListener('mouseup', handleDocumentMouseUp);
            window.onmousemove = null;
            clearInterval(setIntervalID)
        }

        /// MOBILE TOUCH MOUSE ///
        const handleTouchMove = e => {
            mouseX = e.changedTouches[0].clientX;
        }
        const handleTouchStart = e => {
            console.log('touchStart');
            setBoundsAndStartPos(e);
            setIntervalID = setInterval(timeoutHandler, 25)
        }
        const handleTouchEnd = e => {
            console.log('touchEnd');
            clearInterval(setIntervalID)
        }

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

    const clickHandler = e => {
        setSelectedIndex(e);
    }

    const iconList = () => {
        elemArr = icons.map((icon, i) => <BigIcon key={i} ease="bounceIn" selectedId={selectedIndex} index={i} 
            onClickHandler={clickHandler} onHoverHandler={e=>e} icon={icon}/>)
        return elemArr;
    }

    return (
        iconList()
    )
}

export default IconHandler