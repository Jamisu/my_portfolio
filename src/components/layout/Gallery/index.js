import './index.scss'
import React, { useState, useEffect } from 'react';
import '../../../hooks/useImagePreloader'
// import Loader from 'react-loaders'
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
  
    let animTimeout;

    const url = './images/gallery.json';

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setInitialData(data));
    },[url]);

    const setInitialData = (data) => {
        const tempDelay = setInterval(delayedInit, 2000, data);
        // setData(data);
    }
    const delayedInit = (data) => {
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
        
        enableButtons(false);
        setAnimationClass('imgFadeOut');
        animTimeout = setTimeout(endChange, 300, current);
    }

    const endChange = (current) => {
        setCurrent(current);
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
            <div className='preloader'>
                {/* <Loader type="line-scale-pulse-out-rapid" /> */}
                <div className='preloaderCss'>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
          ) : (
            <div className='gallery'>

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
                    <div className='description'>
                        <div className='txtCont1'>
                            <div className='title'>Project: </div>
                            <div className='desc'>{contentData.images[currentImage].desc}</div>
                        </div>
                        
                        <div className='txtCont2'>
                            <div className='title'>Technologies: </div>
                            <div className='desc'>{contentData.images[currentImage].tech}</div>
                        </div>
                        
                    </div>
                    
                </div>

                <div className='thumbLayer'>
                    {contentData.images.map((img, i) => 
                        <div className={'thumb ' + ((currentImage === i) && 'active') } key={i}>
                            <img className={'_' + i} src={'./images/' + img.thumb} id={i} alt="project" onClick={thumbClick}/>
                        </div>
                    )}
                </div>
            </div>
          )        
    )
}

export default Gallery