import './index.scss'
import React, { useState, useEffect } from 'react';
import BigIcon from '../../BigIcon'
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from "react-router-dom";

const Gallery = () => {
    const baseUrl = './images/';
    const url = baseUrl + 'gallery.json';

    const [dayMode] = useOutletContext();

    const [contentData, setData] = useState();
    const [currentImage, setCurrent] = useState(0);
    const [animationClass, setAnimationClass] = useState('imgFadeIn');
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
 
            let imgSize = {width:window.innerWidth, height:window.innerHeight};

            imgSize.height = window.innerHeight - 300;
            imgSize.width = Math.floor(imgSize.height * 1.777);

            if (imgSize.width > window.innerWidth - 10) {
                imgSize.width = window.innerWidth - 10;
                imgSize.height = imgSize.width / 1.777;
            }

            setDimensions(imgSize);
        }, 100);

        window.addEventListener("resize", debouncedHandleResize);
        return (e) => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    });

    function debounce(fn, ms) {
        let timer;
        return (t) => {
            clearTimeout(timer);
            timer = setTimeout((t) => {
                timer = null;
                fn.apply(this, arguments);
            }, ms);
        };
    }

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
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
                        <BigIcon key={0} ease="" selectedId={-1} index={0}
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronLeft} color="#ffff00" size='6x'/>
                    </div>
                    <div className={'arrowForward ' + dayMode}>
                        <BigIcon key={1} ease="" selectedId={-1} index={1}
                        onClickHandler={clickHandler} onHoverHandler={e=>e} icon={faCircleChevronRight} color="#ffff00" size='6x'/>
                    </div>
                </div> 
                
                <div className={'imageLayer ' + animationClass}>
                    <img height={dimensions.height} width={dimensions.width} src={baseUrl + contentData.images[currentImage].image} alt="project" />

                    <div className='description'>
                        <div className='txtCont1'>
                            <div className='title'>Project</div>
                            <div className='desc'>{contentData.images[currentImage].desc}</div>
                        </div>
                        
                        <div className='txtCont2'>
                            <div className='title'>Technologies</div>
                            <div className='desc'>{contentData.images[currentImage].tech}</div>
                        </div>
                    </div>
                    
                </div>

                <div className='thumbLayer'>
                    {contentData.images.map((img, i) => 
                        <div className={'thumb ' + ((currentImage === i) && 'active _' + i) } key={i}>
                            <img src={baseUrl + img.thumb} id={i} alt="project" onClick={thumbClick}/>
                        </div>
                    )}
                </div>
            </div>
          )        
    )
}

export default Gallery