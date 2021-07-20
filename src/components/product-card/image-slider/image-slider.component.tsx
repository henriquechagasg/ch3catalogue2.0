import  React, { useState } from 'react'
import {RiArrowLeftSLine, RiArrowRightSLine, RiContactsBookLine} from 'react-icons/ri';
import LazyLoad from 'react-lazyload';
import FileSaver, { saveAs } from 'file-saver';


import styles from'./image-slider.module.scss';

const ImageSlider = ({slides}) => {
    const [Current, setCurrent] = useState(0)
    const slidesLength = slides.length;

    const nextSlide = () => {
        setCurrent(Current == slidesLength - 1 ? 0 : Current + 1);
    };

    const prevSlide = () => {
        setCurrent(Current == 0 ? slidesLength - 1: Current - 1);
    };

    const saveImage = (image: string) => {
        const imageName = image.split("/");
        FileSaver.saveAs(image, imageName[imageName.length -1])
    }

    return (
        <div className={styles.sliderContainer}>
            <LazyLoad>
                <div className={styles.imageContainer}>
                    <img src={slides[Current]} alt="No Image =/"/>
                </div>
            </LazyLoad>
            {slidesLength > 1 ? (
                <div className={styles.iconsContainer}>
                <RiArrowLeftSLine className={styles.leftArrow} onClick={prevSlide}/>
                <RiArrowRightSLine className={styles.rightArrow} onClick={nextSlide}/>
                </div>
            ) : null}
            {/* Below is a button to save images, try this later */}
            {/* <button onClick={() => saveImage(slides[Current])}>click</button> */}
        </div>
    )
}

export default ImageSlider;