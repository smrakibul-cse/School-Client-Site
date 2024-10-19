import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import './news.css'
import NavBar from "../Navber/NavBar";

const PublicNotice = () => {
    const axiosPublic = useAxiosPublic();
    const [publicNotice, setPublicNotice] = useState([]);

    useEffect(() => {
        const fetchPublicNotice = async () => {
            try {
                const res = await axiosPublic.get('/admissionNews');
                setPublicNotice(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPublicNotice();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar></NavBar>
            <div className="public-notice-container">
                <h1 className="text-xl text-center border rounded-lg mt-1 bg-[#382b56] text-white mb-3 p-1 uppercase" >Admission News</h1>
                {publicNotice.map((notice, index) => (
                    <div key={index} className="admission-news-card">
                        <h1 className="text-xl text-center py-2 ">News Heading</h1>
                        <h3 className="text-justify">{notice.head}</h3>
                        <h1 className="text-xl text-center py-2">Details</h1>
                        <p className="text-justify">{notice.news}</p>
                        <p>Date & Time: {notice.dateTime}</p>

                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublicNotice;
