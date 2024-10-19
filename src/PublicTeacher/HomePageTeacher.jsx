import { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import NavBar from "../Navber/NavBar";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePageTeacher = () => {
    const axiosPublic = useAxiosPublic();
    const [homePageTeacher, setHomePageTeacher] = useState([]);

    useEffect(() => {
        const fetchOldHeadTeacher = async () => {
            try {
                const res = await axiosPublic.get('/homePageTeacher');
                const sortedData = res.data.sort((a, b) => a.SL - b.SL);
                setHomePageTeacher(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOldHeadTeacher();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar />
            <div className="bg-purple-900 text-white py-8 px-4 overflow-x-auto">
                <h1 className="text-center text-3xl font-bold uppercase mb-4">All Teacher Information</h1>
                <div className="max-w-4xl mx-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-purple-800">
                                <th className="px-4 py-2 md:py-3">SL</th>
                                <th className="px-4 py-2 md:py-3">Teacher Name</th>
                                <th className="px-4 py-2 md:py-3">Designation</th>
                                <th className="px-4 py-2 md:py-3">Picture</th>
                                <th className="px-4 py-2 md:py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homePageTeacher.map((teacher, index) => (
                                <tr key={teacher._id} className={index % 2 === 0 ? "bg-purple-700" : "bg-purple-800"}>
                                    <td className="px-4 py-2 md:py-3">{index + 1}</td>
                                    <td className="px-4 py-2 md:py-3">{teacher.name}</td>
                                    <td className="px-4 py-2 md:py-3">{teacher.Designation}</td>
                                    <td className="px-4 py-2 md:py-3">
                                        <img src={teacher.Picture} className="w-10 h-10 md:w-20 md:h-20 rounded-full mx-auto" alt="" />
                                    </td>
                                    <td className="px-4 py-2 md:py-3">
                                        <Link to={`/individualTeacher/${teacher._id}`}>
                                            <button className="px-3 py-1 flex items-center gap-1 bg-purple-600 rounded-lg hover:bg-purple-700 text-white">
                                                <FaEye />
                                                <span>View</span>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomePageTeacher;
