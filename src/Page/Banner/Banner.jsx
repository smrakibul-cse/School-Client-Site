import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import slider1 from '../../assets/slider/1637769815_sld1.jpg';
import slider2 from '../../assets/slider/slider-2.jpg';
import slider3 from '../../assets/slider/slider-3.jpg';
import slider4 from '../../assets/slider/slider-4.jpg';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hook/UseAxiosPublic';
import './banner.css'

const Banner = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [latestNews, setLatestNews] = useState({});
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every 1 second

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await axiosPublic.get('/news');
                const sortedNews = response.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
                setLatestNews(sortedNews[0]);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchLatestNews();

        // Cleanup function not needed here, as this effect doesn't set up any ongoing subscriptions
    }, [axiosPublic]);

    return (
        <div className="">


            <div className='my-2'>
                <div className="flex items-center text-center p-1">
                    <div>
                        <h1 className='md:text-xl text-white bg-red-800 p-2 uppercase md:w-40 w-20'>News</h1>
                    </div>
                    <div className="bg-white text-white p-2 font-face border">
                        <Marquee pauseOnHover={true}>
                            <Link to={'/news'} className='text-black'>
                                {latestNews.head}
                            </Link>
                        </Marquee>
                    </div>
                    <div className='flex'>
                        <h1 className='text-xl w-36 border-r md:block hidden text-white bg-red-800 p-2'>{currentTime.toLocaleTimeString()}</h1>
                        <h1 className='text-xl text-white bg-red-800 p-2 md:block hidden '>{currentTime.toLocaleDateString()}</h1>
                    </div>
                </div>
            </div>

            <div className="">
                <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false}>
                    <div>
                        <img className='rounded-lg md:h-[500px] h-72' src={slider1} alt="Slide 1" />
                    </div>
                    <div>
                        <img className='rounded-lg md:h-[500px] h-72' src={slider2} alt="Slide 2" />
                    </div>
                    <div>
                        <img className='rounded-lg md:h-[500px] h-72' src={slider3} alt="Slide 3" />
                    </div>
                    <div>
                        <img className='rounded-lg md:h-[500px] h-72' src={slider4} alt="Slide 4" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Banner;
