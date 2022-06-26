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
    let thumbImages = [];
    let fullImages = [];
    let animating = false;
    let img;
    const url = './images/gallery.json';

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setInitialData(data));
    },[url]);

    const setInitialData = (data) => {
        console.log(contentData);
        setData(data);
        console.log(data);
    }

    const clickHandler = (e) => {

    }

    function imageLoader() {

    }

    return(<div className='gallery'>
        {!contentData ? (
            <div>Loading ...</div>
          ) : (
            <Fragment>
                <div className='arrows'>
                    <div className='arrowBackward'>
                        <BigIcon key={0} ease="bounceIn" selectedId={-1} index={0} 
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronLeft} color="#ffff00" size='10x'/>
                    </div>
                    <div className='arrowForward'>
                        <BigIcon key={1} ease="bounceIn" selectedId={-1} index={1} 
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronRight} color="#ffff00" size='10x'/>
                    </div>
                </div>
                
                <div className='imageLayer'>
                    <img src={'./images/' + contentData.images[0].image} alt="project" />
                </div>
                <div className='thumbLayer'>
                    {contentData.images.map((img, i) => <img src={'./images/' + contentData.images[0].thumb} alt="project" />)}
                </div>
            </Fragment>
          )}
    </div>
        
    )
}

export default Gallery