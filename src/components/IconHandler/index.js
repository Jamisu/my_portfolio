import BigIcon from '../BigIcon';
import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

const IconHandler = (params) => {
    const {icons, selectedIndex, setSelectedIndex} = params;
    let draggables = useRef();

    useEffect(() => {
        gsap.registerPlugin(Draggable);
        draggables.current = Draggable.create(".iconContainer", {
                type: "x",
                onPress: function() {
                    if(window.innerWidth > 768) {
                        draggables.current[0].disable()
                    } else {
                        draggables.current[0].enable()
                    }
                },
                onRelease: function() {
                    const endX = this.endX;
                    const currentScreenOffset = [...this.target.children].map((el, i) => (el.getBoundingClientRect().x + el.getBoundingClientRect().width/2))
                    const windowCenter = window.innerWidth/2;
                    let indexClosestToCenter = 0;
                    let lastClosestX = 10000;

                    for(var i=0; i < currentScreenOffset.length; i++) {
                        const currentItemDifference = Math.abs(currentScreenOffset[i] - windowCenter);
                        if (currentItemDifference < lastClosestX) {
                            lastClosestX = currentItemDifference;
                            indexClosestToCenter = i;
                        } else if (currentItemDifference >= lastClosestX) {
                            break;
                        }
                        indexClosestToCenter = i;
                    }
                    setSelectedIndex(indexClosestToCenter);
                    const correctionX = endX - currentScreenOffset[indexClosestToCenter] + windowCenter;

                    gsap.to(".iconContainer", {
                        x: correctionX,
                        duration: .5,
                        ease: "back"
                    })
                }
            });
        }
    );

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        window.dispatchEvent(new Event('resize'));
        return (e) => {
            window.removeEventListener("resize", handleResize);
        };
    })
    const handleResize = (e) => {
        if (window.innerWidth > 768) {
            draggables.current[0].target.style.left = "50%";
            draggables.current[0].target.style.transform = "translate(-50%, -50%)";
        }
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