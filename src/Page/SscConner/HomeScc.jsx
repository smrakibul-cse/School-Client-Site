import React, { useEffect } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import { CiViewTimeline } from "react-icons/ci";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeScc = () => {
    const axiosPublic = useAxiosPublic();

    const [sscData, setSscData] = React.useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/sscResult");
                const sortedData = response.data.sort((a, b) => b.year - a.year);
                setSscData(sortedData);
            } catch (error) {
                console.error("Error fetching SSC result:", error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    return (
        <div className="px-2">
            <div className="border rounded-lg bg-[#f7f3f3]">
                <div className=" mx-2 my-2 rounded-lg px-2    bg-[#eae8e8]">
                    <h1 className="text-xl text-center border rounded-lg mt-1 bg-[#382b56] text-white mb-3 p-2 uppercase">SSC Conner</h1>
                    <div>
                        <div className="px-2 py-1">
                            {sscData.slice(0, 6).map((result, index) => (
                                <div key={index} className={`mb-2 border p-2 rounded-lg ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-200'}`} data-aos="fade-up">
                                    <div className="flex items-center gap-2">

                                        <CiViewTimeline className="mt-[3px]" />

                                        <div className="hover:link">
                                            <a href={result.link} target="_blank" rel="noopener noreferrer">
                                                {result.description}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center pb-2" data-aos="fade-up">
                            <Link to={'/ssc'}> <button className="btn btn-outline w-40 ">See more</button></Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomeScc;
