import BigIcon from '../BigIcon';
import { useEffect, useRef } from 'react';

const IconHandler = (params) => {
    const {icons, selectedIndex, setSelectedIndex} = params;
    let elemArr = [];
    // FOR disabling standard onClick, after dragging
    const wasDragged = useRef(false);
    const containerRef = useRef();
    const iconsArrRef = useRef();

    useEffect(() => {
        const container = containerRef.current = document.getElementsByClassName('iconContainer')[0]
        const iconsArr = iconsArrRef.current = Array.from(container.children)
        let mouseStart;
        let containerLeft;
        let setIntervalID;
        let mouseX;
        let resizeId;
        let bounds = {};
        
        const dragHandler = e => {
            setContainerX();
        }

        const setBoundsAndStartPos = e => {
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
                setContainerLeft(newLeft);
             }
        }

        const setContainerLeft = nl => {
            container.style.left = nl  + 'px';
            console.log('container.style.left', container.style.left)
        }
        
        /// DESKTOP MOUSE ///
        const handleDocumentMouseDown = e => {
            setBoundsAndStartPos(e);   
            window.addEventListener('mouseup', handleDocumentMouseUp);
            if(window.innerWidth < container.clientWidth) {
                window.onmousemove = function(e) {
                    mouseX = e.x
                }  
                setIntervalID = setInterval(dragHandler, 25)
            }
        };
        const handleDocumentMouseUp = e => {
            window.removeEventListener('mouseup', handleDocumentMouseUp);
            window.onmousemove = null;
            clearInterval(setIntervalID)
            if(!isContentWide()) {
                return;
            }
            if(Math.abs(mouseStart - e.clientX) > 3) {
                wasDragged.current = true;
                return;
            } else {
                wasDragged.current = false;
            }
        }

        /// MOBILE TOUCH MOUSE ///
        const handleTouchMove = e => {
            mouseX = e.changedTouches[0].clientX;
        }
        const handleTouchStart = e => {
            setBoundsAndStartPos(e);
            setIntervalID = setInterval(dragHandler, 25)
        }
        const handleTouchEnd = e => {
            clearInterval(setIntervalID)
        }

        const handleResize = e => {
            clearTimeout(resizeId);
            resizeId = setTimeout(onResizeStop, 100);
        }
        const onResizeStop = e => {
                if(isContentWide()) {
                    // center to selected || center to client center
                    setContainerLeft(container.clientWidth/2);
                    snapToSelected();
                // Center container
                } else {
                    setContainerLeft(window.innerWidth/2);
                }
        }
        onResizeStop(null);

        container.addEventListener('mousedown', handleDocumentMouseDown);
        window.addEventListener('resize', handleResize);

        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mouseup', handleDocumentMouseUp);
            container.removeEventListener('mousedown', handleDocumentMouseDown);
            window.removeEventListener('resize', handleResize);

            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);

            window.onmousemove = null;
            clearInterval(setIntervalID);
            wasDragged.current = false;
        };
    });

    const isContentWide = e => {
        return containerRef.current.clientWidth > window.innerWidth;
    }

    const clickHandler = selected => {
        if(!wasDragged.current) {
           setSelectedIndex(selected)
           if(isContentWide()) { snapToSelected(selected) }
        }
    }

    const snapToSelected = (si = selectedIndex) => {
        if(si === iconsArrRef.current.length) {
            return;
        }
        containerRef.current.style.left = 
        window.innerWidth/2 + containerRef.current.clientWidth/2 - (iconsArrRef.current[si].offsetLeft +
            iconsArrRef.current[si].getBoundingClientRect().width/2) + 'px';
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