import React, { useEffect } from 'react';
import { FaFacebook, FaInstagram, FaLocationDot, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Location = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    return (
        <div className="pb-4 px-2">
            <div className="border lg:h-[315px] mx-auto rounded-lg w-full px-2 py-2 bg-white" data-aos="fade-up">
                <div className="mx-auto bg-[#eae8e8] rounded-lg w-full">
                    <div className="lg:flex gap-4 mt-2 mx-auto justify-center lg:py-0 py-2">
                        <div className='px-2 pb-2'>
                            <h1 className="bg-[#382b56] p-2 text-center text-2xl font-bold text-white lg:w-[370px] w-full border rounded-lg">Location</h1>
                            <div className="bg-[#F6F6F6] h-[207px]">
                                <iframe
                                    className='mt-2 lg:w-[370px] h-[207px] w-full'
                                    title="Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26514.095348108435!2d89.8305352!3d25.5751103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd4dddeb9b0785%3A0xce76a6628f82b56c!2sRowmari%20CG%20Zaman%20Govt%20High%20School!5e0!3m2!1sen!2sbd!4v1619268601485!5m2!1sen!2sbd"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                        <div className="px-2" data-aos="fade-right">
                            <h1 className="bg-[#382b56] p-2 text-center text-2xl font-bold text-white lg:w-[370px] w-full border rounded-lg">Address</h1>
                            <div className="bg-[#F6F6F6] h-[207px] px-2">
                                <div className="flex items-center gap-2 mt-2 text-[17px] border-b-2 pb-2 pt-2">
                                    <FaLocationDot />
                                    <h1>Rowmari, Kurigram</h1>
                                </div>
                                <div className="flex items-center gap-2 mt-3 border-b-2 pb-2">
                                    <FaPhone />
                                    <h1 className="text-[17px]">01309122542</h1>
                                </div>
                                <div className="flex items-center gap-2 mt-3 border-b-2 pb-2">
                                    <FaPhone />
                                    <h1 className="text-[17px]">01712970894</h1>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-[17px] border-b-2 pb-2">
                                    <MdEmail />
                                    <h1>abuhurayrahm6925@gmail.com</h1>
                                </div>
                            </div>
                        </div>
                        <div className="px-2 lg:mt-0 mt-2" data-aos="fade-left">
                            <h1 className="bg-[#382b56] p-2 text-center text-2xl font-bold text-white lg:w-[370px] w-full border rounded-lg">Social Links</h1>
                            <div className="bg-[#F6F6F6] h-[207px] px-2">
                                <div className="flex items-center gap-2 mt-2 text-[17px] border-b-2 pb-2 pt-2">
                                    <FaFacebook />
                                    <a href="https://www.facebook.com/profile.php?id=61556014880761" target="_blank" rel="noopener noreferrer">Facebook</a>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-[17px] border-b-2 pb-2">
                                    <FaYoutube />
                                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-[17px] border-b-2 pb-2">
                                    <FaTwitter />
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-[17px] border-b-2 pb-2">
                                    <FaInstagram />
                                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
