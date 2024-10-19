import React, { useState, useEffect } from 'react';
import './styles.css';
import NavBar from '../../Navber/NavBar';
import img1 from '../../assets/imgGalary/img.jpg';
import img2 from '../../assets/imgGalary/img2.jpg';
import img3 from '../../assets/imgGalary/img3.jpg';
import img4 from '../../assets/imgGalary/img4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const images = [img1, img2, img3, img4];

const ImageGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div className=''>
                <NavBar />
            </div>

            <div className='bg-[#1d2548] min-h-screen px-8 py-4'>
                <div className='border rounded-lg bg-[#f7f3f3]' data-aos="fade-in">
                    <div className='border rounded-lg px-4 py-2 bg-[#f7f0f0]' data-aos="fade-up">
                        <h1 className="text-xl text-center border rounded-lg mt-1 bg-[#382b56] text-white mb-3 p-2 uppercase" data-aos="zoom-in">Image Gallery</h1>
                        <div className="flex justify-center items-center">
                            <button onClick={handlePrev} className="px-4 py-2 bg-[#382b56] text-white rounded-l-lg" data-aos="fade-right">Previous</button>
                            <img src={images[currentIndex]} alt="Gallery" className="w-80 h-80 object-cover mx-2 border" data-aos="zoom-in" />
                            <button onClick={handleNext} className="px-4 py-2 bg-[#382b56] text-white rounded-r-lg" data-aos="fade-left">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
