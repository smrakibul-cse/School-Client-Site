import { Link } from "react-router-dom";
import img1 from '../../assets/slider/1637769815_sld1.jpg';
import Banner from "../Banner/Banner";
import '../Home/home.css';
import Message from "../Message/Message";
import Ideal from "../Ideal/Ideal";
import Media from "../Media/Media";
import NavBar from "../../Navber/NavBar";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import HomeScc from "../SscConner/HomeScc";
import Location from "../Location/Location";
import './home.css';
import Achievement from "../Achievement/Achievement";

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axiosPublic.get('/news');
                setNews(response.data);
                setLoading(false); // Set loading to false after fetching news
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [axiosPublic]);

    // Show loader if loading is true
    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-ring text-7xl h-72 w-72"></span>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="relative z-10">
                <NavBar />
            </div>
            <div>
                <Banner />
            </div>
            <div className="px-2 py-5" data-aos="fade-up">
                <div className="border rounded-lg bg-[#f7f3f3] flex item-center gap-2">
                    <div className="lg:flex gap-1">
                        <div className="lg:w-[76%]">
                            <div className="mx-2 my-2 rounded-lg px-2 bg-[#eae8e8]">
                                <h1 className="text-xl text-center border rounded-lg mt-1 bg-[#382b56] text-white mb-3 p-2 uppercase">About School</h1>
                                <div className="lg:flex items-center gap-2 py-1 mx-auto">
                                    <div className="lg:w-[50%]">
                                        <img className="h-[270px] w-[400px] rounded-lg" src={img1} alt="" />
                                    </div>
                                    <div className="lg:w-[50%]">
                                        <p className="text-justify">
                                            Rowmari C. G. Zaman High School is a prominent government institution, known for its vast campus and commitment to quality education. Situated in a spacious area, the school stands as an impressive structure, offering a conducive environment for learning. With a student body of around 500 per class, it accommodates a significant number of young minds, fostering a diverse and vibrant educational community.The school prides itself on its dedicated faculty and ensuring holistic development for all students.The campus buzzes with activity, offering a myriad of extracurricular opportunities that complement the academic curriculum. From sports competitions to cultural events, students have ample avenues <span>
                                                <Link className="text-[#259a5c] link-hover" to='/about'>
                                                    Read More
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[38%]">
                            <div className="mx-2 my-2 rounded-lg px-2 bg-[#eae8e8] pb-1">
                                <h1 className="text-center border rounded-lg mt-1 bg-[#382b56] text-white p-2 uppercase text-xl">NOTICE BOARD</h1>
                                <div className="marquee-container">
                                    <div className="marquee ">
                                        {news.map((item, index) => (
                                            <Link key={index} to={'/news'}>
                                                <div className="border-b-2   bg-[#d7d6d5] flex">
                                                    <p className="px-4 text-sm flex my-auto ">{new Date(item.dateTime).toLocaleDateString()}</p>
                                                    <h1 className="px-4 py-3   text-justify">
                                                        {item.head}
                                                    </h1>

                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#d7d6d5] border rounded-lg flex justify-end mb-1 h-14">
                                    <Link to={'/news'}>
                                        <button className="hover:text-violet-500 mt-8 text-[#259a5c]">Load More...</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Message />
            </div>
            <div>
                <Ideal />
            </div>
            <div>
                <Achievement />
            </div>
            <div>
                <HomeScc />
            </div>
            <div>
                <Media />
            </div>
            <div>
                <Location />
            </div>
        </div>
    );
};

export default Home;
