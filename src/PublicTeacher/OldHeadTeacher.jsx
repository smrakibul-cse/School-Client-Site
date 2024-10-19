import { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import NavBar from "../Navber/NavBar";
import './head.css';

const OldHeadTeacher = () => {
    const axiosPublic = useAxiosPublic();
    const [oldHeadTeacher, setOldHeadTeacher] = useState([]);

    useEffect(() => {
        const fetchOldHeadTeacher = async () => {
            try {
                const res = await axiosPublic.get('/oldHeadTeacher');
                const sortedData = res.data.sort((a, b) => a.SL - b.SL);
                setOldHeadTeacher(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOldHeadTeacher();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar />
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 pb-4">

                <div className="text-center py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Former Head Teachers</h1>
                </div>
                <div className="container mx-auto px-4">
                    <div className="overflow-x-auto">
                        <table className="lg:w-[1160px] bg-white rounded-lg overflow-hidden shadow-md mx-auto pb-3">
                            <thead className="bg-purple-700 text-white uppercase">
                                <tr>
                                    <th className="py-3 px-4">SL</th>
                                    <th className="py-3 px-4">Headmaster Name</th>
                                    <th className="py-3 px-4">From Date</th>
                                    <th className="py-3 px-4">To Date</th>
                                    <th className="py-3 px-4">Picture</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {oldHeadTeacher.map((headTeacher, index) => (
                                    <tr key={headTeacher._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                                        <td className="py-3 px-4 text-center">{headTeacher.SL}</td>
                                        <td className="py-3 px-4">{headTeacher['Headmaster Name']}</td>
                                        <td className="py-3 px-4">{headTeacher['From Date']}</td>
                                        <td className="py-3 px-4">{headTeacher['To Date']}</td>
                                        <td className="py-3 px-4">
                                            {headTeacher.Picture && (
                                                <img className="h-24 mx-auto rounded-full" src={headTeacher.Picture} alt="Headteacher" style={{ width: '100px' }} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OldHeadTeacher;
