import { useState, useEffect } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import Marquee from "react-fast-marquee";
import './model.css'
import { Link } from "react-router-dom";

const AdmissionNoticePublic = () => {
    const axiosPublic = useAxiosPublic();
    const [news, setNews] = useState([]);


    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axiosPublic.get("/admissionNews");
            setNews(response.data);
        } catch (error) {
            console.error("Error fetching admission news:", error);
        }
    };



    // Sort news by dateTime in descending order to show the latest news first
    const sortedNews = [...news].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    // Get the latest news
    const latestNews = sortedNews[0];

    return (
        <div className="flex items-center md:px-4">
            <h1 className="border px-4 py-2 rounded-l-lg bg-white">News</h1>
            {sortedNews.length > 0 && (
                <div className="bg-white text-black p-2 font-face border">
                    <Marquee pauseOnHover={true}>
                        <p>{latestNews.head}</p>
                    </Marquee>
                </div>
            )}
            <Link to={'/admissionNotice'}> <button
                className="border px-4 py-2 rounded-r-lg bg-white hover:bg-black hover:text-white"

            >
                Details
            </button></Link>

        </div>
    );
};

export default AdmissionNoticePublic;
