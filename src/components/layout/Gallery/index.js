import './index.scss'
import React, { useState, useEffect } from 'react';
import BigIcon from '../../BigIcon'
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from "react-router-dom";

const Gallery = () => {
    const [dayMode] = useOutletContext();

    const [contentData, setData] = useState();
    const [currentImage, setCurrent] = useState(0);
    const [animationClass, setAnimationClass] = useState('imgFadeIn');
  
    let animTimeout;
    const baseUrl = './images/';
    const url = './images/gallery.json';

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setInitialData(data));
    },[url]);

    const setInitialData = (data) => {
        const urlList = [];
        data.images.map((img, i) => {
            urlList.push(baseUrl +img.image);
            urlList.push(baseUrl +img.thumb);
            return {}
        });
        preloadAllImages(data, urlList);
    }

    const preloadAllImages = (data, urlList) => {
        async function preload() {
                console.log('PRELOAD');
            
                const imagesPromiseList = [];
                for (const i of urlList) {
                    imagesPromiseList.push(preloadImage(i))
                }
            
                await Promise.all(imagesPromiseList)
                
                initialise(data);
            }
        
            preload();
    }

    const preloadImage = (src) => {
        console.log('PRELOAD image', src);
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = function() {
            resolve(img);
          }
          img.onerror = img.onabort = function() {
            reject(src);
          }
          img.src = src;
        })
    }

    const initialise = (data) => {
        console.log('INIT');
        setData(data);
    }

    const clickHandler = (e) => {
        let current = 0;
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
    }

    const startChange = (current) => {
        console.log('cuurrent', current);
        setAnimationClass('imgFadeOut');
        animTimeout = setTimeout(endChange, 300, current);
    }

    const endChange = (current) => {
        setCurrent(current);
        setAnimationClass('imgFadeIn');
    }

    const thumbClick = (e) => {
        const id = Number(e.target.id);
        id !== currentImage && startChange(id);
    }

    return(
        !contentData ? (
            <div className='preloader'>
                <div className={'preloaderCss ' + dayMode}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
          ) : (
            <div className={'gallery ' + dayMode}>
                <div className='arrows'>
                    <div className={'arrowBackward ' + dayMode}>
                        <BigIcon key={0} ease="bounceIn" selectedId={-1} index={0}
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronLeft} color="#ffff00" size='6x'/>
                    </div>
                    <div className={'arrowForward ' + dayMode}>
                        <BigIcon key={1} ease="bounceIn" selectedId={-1} index={1}
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronRight} color="#ffff00" size='6x'/>
                    </div>
                </div> 
                
                <div className={'imageLayer ' + animationClass}>
                    <img src={baseUrl + contentData.images[currentImage].image} alt="project" />
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
                            <img className={'_' + i} src={baseUrl + img.thumb} id={i} alt="project" onClick={thumbClick}/>
                        </div>
                    )}
                </div>
            </div>
          )        
    )
}

export default Gallery