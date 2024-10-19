import React, { useState } from 'react';
import NavBar from '../../Navber/NavBar';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Video = () => {
    const videos = [
        "https://www.youtube.com/embed/fUB0ix4zlQM?si=VnLRxziZcfKo0C7N",
        "https://www.youtube.com/embed/Y0S8gl1WECw?si=tyBRUvQaQtLm6dz8",   
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextVideo = () => {
        setCurrentIndex((currentIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentIndex((currentIndex - 1 + videos.length) % videos.length);
    };

    return (
        <div>
            <NavBar />

            <div className='py-5 bg-[#3a1f5e] '>
                <div className="lg:flex gap-2 mx-auto justify-center item-center">
                    <iframe
                        width="800"
                        height="500"
                        src={videos[currentIndex]}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="mr-4 px-4 py-2 bg-gray-300" onClick={prevVideo}>
                        <BsChevronLeft />  
                    </button>
                    <button className="px-4 py-2 bg-gray-300" onClick={nextVideo}>
                         <BsChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Video;
