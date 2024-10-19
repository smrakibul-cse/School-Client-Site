import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Media/Media.css';
import img1 from '../../assets/imgGalary/img.jpg';
import img2 from '../../assets/imgGalary/img2.jpg';
import img3 from '../../assets/imgGalary/img3.jpg';
import img4 from '../../assets/imgGalary/img4.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Media = () => {
    const images = [img1, img2, img3, img4];
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    const openModal = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setCurrentIndex(0);
        setModalOpen(false);
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
        setCurrentIndex(nextIndex);
    };

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
        setCurrentIndex(prevIndex);
    };

    return (
        <div className='mb-5 mt-6 px-2' data-aos="fade-up">
            <div className="border rounded-lg bg-[#f7f3f3]" data-aos="zoom-in">
                <div className='mx-2 my-2 rounded-lg px-2 bg-[#eae8e8]'>
                    <h1 className="text-xl text-center border rounded-lg mt-1 bg-[#382b56] text-white mb-3 p-2 uppercase">Institute Media</h1>

                    <div className="flex mx-auto justify-center mt-5 gap-4">
                        <div>
                            <Link to="/">
                                <button className="bg-[#382b56] w-32 py-3 rounded-lg font-bold text-white hover:bg-stone-400">
                                    All
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/images">
                                <button className="bg-[#382b56] w-32 py-3 rounded-lg font-bold text-white hover:bg-stone-400">
                                    Image
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/videos">
                                <button className="bg-[#382b56] w-32 py-3 rounded-lg font-bold text-white hover:bg-stone-400">
                                    Video
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='relative pb-[2px]'>
                        <Swiper
                            slidesPerView={3}
                            centeredSlides={true}
                            spaceBetween={30}
                            pagination={{
                                type: 'fraction',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper border absolute"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt="" onClick={() => openModal(image, index)} data-aos="flip-left" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" data-aos="zoom-in">
                    <div className="bg-white p-5 rounded-lg max-w-[80%] max-h-[80%] overflow-auto relative z-50">
                        <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black bg-white" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <button className="absolute top-1/2 -translate-y-1/2 left-0 p-2" onClick={prevImage}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black bg-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="absolute top-1/2 -translate-y-1/2 right-0 p-2" onClick={nextImage}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black bg-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <img src={selectedImage} alt="modal" className="max-w-full max-h-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Media;
