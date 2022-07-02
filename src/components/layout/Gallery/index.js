import './index.scss'
import React, { useState, useEffect, Fragment } from 'react';
import '../../../hooks/useImagePreloader'
import BigIcon from '../../BigIcon'
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

const Gallery = () => {

    // JSON loader ??in layout??
    // thumb display -> serialThumbLoader
    // main container
    //      slider -> imageLoader -> preloader
    //          zoomOnClick + description

    const [contentData, setData] = useState();
    const [currentImage, setCurrent] = useState(0);
    const [animationClass, setAnimationClass] = useState('imgFadeIn');
    const [buttonsActive, enableButtons] = useState(true);
    const [hoveredThumb, setHoveredThumb] = useState(-1);
    let animTimeout;

    const url = './images/gallery.json';

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setInitialData(data));
    },[url]);

    const setInitialData = (data) => {
        setData(data);
    }

    const clickHandler = (e) => {
        let current = 0;
        // if (buttonsActive === true) {
            if (e === 0) {
                if (currentImage > 0) {
                    current = currentImage-1;
                } else {
                    current = contentData.images.length-1;
                }
            } else {
                if (currentImage < contentData.images.length-1) {
                    current = currentImage+1;
                }
            }
            startChange(current);
        // }
    }

    const startChange = (current) => {
        console.log('cuurrent', current);
        setCurrent(current);
        enableButtons(false);
        setAnimationClass('imgFadeOut');
        animTimeout = setTimeout(endChange, 300);
    }

    const endChange = () => {
       setAnimationClass('imgFadeIn');
       animTimeout = setTimeout(activateButtons, 500);
    }

    const activateButtons = () => {
        enableButtons(true);
    }

    const thumbClick = (e) => {
        const id = Number(e.target.id);
        id !== currentImage && startChange(id);
    }

    return(
        !contentData ? (
            <div>Loading ...</div>
          ) : (<div className='gallery'>

                <div className='arrows'>
                    <div className={'arrowBackward ' + buttonsActive}>
                        <BigIcon key={0} ease="bounceIn" selectedId={-1} index={0}
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronLeft} color="#ffff00" size='6x'/>
                    </div>
                    <div className={'arrowForward ' + buttonsActive}>
                        <BigIcon key={1} ease="bounceIn" selectedId={-1} index={1}
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronRight} color="#ffff00" size='6x'/>
                    </div>
                </div> 
                
                <div className={'imageLayer ' + animationClass}>
                    <img src={'./images/' + contentData.images[currentImage].image} alt="project" />
                </div>

                <div className='thumbLayer'>
                { console.log('ret currentImage', currentImage) }
                    {contentData.images.map((img, i) => 
                        <div className={'thumb ' + ((currentImage === i) && 'active')} key={i}>
                            { console.log('ret i, cimg, act:', i, currentImage, (currentImage === i) && 'active') }
                            <img src={'./images/' + img.thumb} id={i} alt="project" onClick={thumbClick}/>
                        </div>
                        )}
                </div>
            </div>
          )        
    )
}

export default Gallery