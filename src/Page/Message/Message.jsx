import { Link } from 'react-router-dom';
import head from '../../assets/head.jpg';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hook/UseAxiosPublic';
import { IoLinkSharp } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Message = () => {
    const [links, setLinks] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        AOS.init({ duration: 1200 });

        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('/links');
                setLinks(response.data.slice(0, 7));
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    return (
        <div className='px-2' data-aos="fade-up">
            <div className='border rounded-lg bg-[#f7f3f3] lg:flex gap-1 mx-auto'>
                {/* Message div */}
                <div className='lg:w-[68%]' data-aos="fade-right">
                    <div className='mx-2 my-2 rounded-lg px-2 bg-[#eae8e8] pb-2'>
                        <h1 className="text-xl text-center border rounded-lg mt-1 uppercase bg-[#382b56] text-white p-2">Head Teacher Message</h1>

                        {/* message  */}
                        <div className='lg:flex bg-[#F1F3F5] py-2 px-6 rounded-lg mt-2 mx-auto gap-6'>
                            <div className='border mx-auto h-60 w-64'>
                                <img className='h-60 w-64' src={head} alt="" />
                            </div>
                            <div className=''>
                                <h1 className='text-3xl text-[#797b7c] font-bold'>Headmaster's <br /> Message:</h1>
                                <h1 className='border-b-2 w-40 lg:ml-40'></h1>
                                <h1 className='text-gray-500 font-semibold text-xl mt-4'>Dear inhabitants of Rowmari,<br /> Assalamualaikum</h1>

                                <h1 className='text-gray-500 font-semibold text-xl mt-8'>By the grace of almighty Allah, this school...
                                    <Link to={'/message'}>
                                        <button className='text-gray-600  border px-3 py-[10px] rounded-lg font-semibold mt-6 text-xl hover:bg-black hover:text-white'>Read More..</button>
                                    </Link></h1>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Links div */}
                <div className='lg:w-[34%]' data-aos="fade-left">
                    <div className='mx-2 my-2 rounded-lg px-2 bg-[#eae8e8] pb-2'>
                        <h1 className="text-xl text-center border rounded-lg mt-1 uppercase bg-[#382b56] text-white mb-3 p-2">Important Links</h1>
                        <div>
                            {links.map((link) => (
                                <div key={link._id} className='border lg:w-[370px] mx-auto mt-[6px] px-2 py-1 bg-gray-200 rounded-lg'>
                                    <div className='flex items-center gap-3'>
                                        <IoLinkSharp />
                                        <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                    </div>
                                </div>
                            ))}

                            <Link to={'/links'}>
                                <button className='border px-3 py-2 uppercase mt-1 flex mx-auto rounded-lg border-gray-800 hover:bg-yellow-500'>See More</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
