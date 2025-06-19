import React from 'react';
import BigIcon from '../BigIcon';
import { useEffect, useRef } from 'react';

interface IconHandlerProps {
    icons: any;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

const IconHandler = (params: IconHandlerProps) => {
    const {icons, selectedIndex, setSelectedIndex} = params;
    // FOR disabling standard onClick, after dragging
    const wasDragged = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const iconsArrRef = useRef<Element[]>();

    const isContentWide = () => {
        return containerRef.current.clientWidth > window.innerWidth;
    }

    const clickHandler = (selected: number) => {
        if(!wasDragged.current) {
           setSelectedIndex(selected)
           if(isContentWide()) { snapToSelected(selected) }
        }
    }

    const snapToSelected = (si: number = selectedIndex) => {
        console.log('si ' + si);

        if (!iconsArrRef.current || si >= iconsArrRef.current.length || !containerRef.current) {
            return;
        }
        
        const icon = iconsArrRef.current[si];
        const iconRect = icon.getBoundingClientRect();
        const iconCenter = iconRect.left + iconRect.width / 2;
        const delta = window.innerWidth / 2 - iconCenter;
        const currentContainerLeft = parseInt(containerRef.current.style.left || '0', 10);
        const newContainerLeft = currentContainerLeft + delta;

        containerRef.current.style.left = newContainerLeft + 'px';
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        iconsArrRef.current = Array.from(container.children);
        let mouseStart;
        let containerLeft;
        let setIntervalID;
        let mouseX;
        let resizeId;
        let bounds: { left: number; right: number } = { left: 0, right: 0 };
    
        const dragHandler = () => {
            setContainerX();
        };
    
        const setBoundsAndStartPos = (e: any) => {
            bounds = {
                'left': container.clientWidth / 2 + window.innerWidth / 2,
                'right': window.innerWidth / 2 - container.clientWidth / 2
            };
    
            mouseStart = mouseX = e.clientX || e.changedTouches[0].clientX;
            if (container.style.left) {
                containerLeft = parseInt(container.style.left);
            } else {
                containerLeft = window.innerWidth / 2;
            }
        };
    
        const setContainerX = () => {
            const newLeft = containerLeft - mouseStart + mouseX;
            if (newLeft < bounds.left && newLeft > bounds.right) {
                setContainerLeft(newLeft);
            }
        };
    
        const setContainerLeft = (nl: number) => {
            container.style.left = nl + 'px';
            console.log('container.style.left', container.style.left);
        };
    
        // DESKTOP MOUSE //
        const handleDocumentMouseDown = (e: any) => {
            setBoundsAndStartPos(e);
            window.addEventListener('mouseup', handleDocumentMouseUp);
            if (window.innerWidth < container.clientWidth) {
                window.onmousemove = function (e) {
                    mouseX = e.x;
                };
                setIntervalID = setInterval(dragHandler, 25);
            }
        };
        const handleDocumentMouseUp = (e: any) => {
            window.removeEventListener('mouseup', handleDocumentMouseUp);
            window.onmousemove = null;
            clearInterval(setIntervalID);
            if (!isContentWide()) {
                return;
            }
            if (Math.abs(mouseStart - e.clientX) > 3) {
                wasDragged.current = true;
                return;
            } else {
                wasDragged.current = false;
            }
        };
    
        // MOBILE TOUCH MOUSE //
        const handleTouchMove = (e: any) => {
            mouseX = e.changedTouches[0].clientX;
        };
        const handleTouchStart = (e: any) => {
            setBoundsAndStartPos(e);
            setIntervalID = setInterval(dragHandler, 25);
        };
        const handleTouchEnd = (e: any) => {
            clearInterval(setIntervalID);
        };
    
        const handleResize = (e: any) => {
            clearTimeout(resizeId);
            resizeId = setTimeout(onResizeStop, 100);
        };
        const onResizeStop = (e: any) => {
            if (isContentWide()) {
                // center to selected || center to client center
                setContainerLeft(container.clientWidth / 2);
                snapToSelected();
                // Center container
            } else {
                setContainerLeft(window.innerWidth / 2);
            }
        };
        onResizeStop(null);
    
        container.addEventListener('mousedown', handleDocumentMouseDown);
        window.addEventListener('resize', handleResize);
    
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
    
        return () => {
            if(container) {
                container.removeEventListener('mousedown', handleDocumentMouseDown);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
            }
            window.removeEventListener('mouseup', handleDocumentMouseUp);
            window.removeEventListener('resize', handleResize);
    
            window.onmousemove = null;
            clearInterval(setIntervalID);
            wasDragged.current = false;
        };
    }, [icons, selectedIndex]);

    return (
        <div className='iconContainer' ref={containerRef}>
            {icons.map((icon, i) => (
                <BigIcon
                    key={i}
                    ease="bounceIn"
                    selectedId={selectedIndex}
                    index={i}
                    onClickHandler={clickHandler}
                    onHoverHandler={(e) => e}
                    icon={icon}
                />
            ))}
        </div>
    )
}

export default IconHandler