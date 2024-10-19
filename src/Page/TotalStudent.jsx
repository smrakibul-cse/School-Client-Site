import React, { useEffect, useState } from "react";
import NavBar from "../Navber/NavBar";
import useAxiosPublic from "../Hook/UseAxiosPublic"
import './total.css'

const TotalStudent = () => {
    const axiosPublic = useAxiosPublic();
    const [totalStudentData, setTotalStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/totalStudent");
                setTotalStudentData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching total student information:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar />
            <div className="bg-purple-500 py-4">
                <div className="flex ">
                    <h1 className=" font-bold mx-auto text-3xl text-white py-4">Student Summary</h1>
                </div>
                <div className="container mx-auto ">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        totalStudentData && (
                            <div className="lg:flex mx-auto justify-center px-4 lg:px-0 gap-6 mt-6">
                                <div>
                                    <h2 className="text-center font-bold text-xl mb-2">Morning Shift</h2>
                                    <table className="lg:w-[500px] w-full border-collapse border border-gray-800 text-center">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-800 p-2">SL</th>
                                                <th className="border border-gray-800 p-2">Class</th>
                                                <th className="border border-gray-800 p-2">Section</th>
                                                <th className="border border-gray-800 p-2">Students</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalStudentData[0]["Morning Shift"].Students.map((student, index) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-800 p-2">{student.SL}</td>
                                                    <td className="border border-gray-800 p-2">{student.Class}</td>
                                                    <td className="border border-gray-800 p-2">{student.Section}</td>
                                                    <td className="border border-gray-800 p-2">{student.Student}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="border   border-gray-800 p-2 font-bold text-end" colSpan="4">
                                                    Total Student of Morning Shift: {totalStudentData[0]["Morning Shift"]["Total Students"]}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <h2 className="text-center font-bold text-xl mb-2">Day Shift</h2>
                                    <table className="lg:w-[500px] w-full text-center border-collapse border border-gray-800">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-800 p-2">SL</th>
                                                <th className="border border-gray-800 p-2">Class</th>
                                                <th className="border border-gray-800 p-2">Section</th>
                                                <th className="border border-gray-800 p-2">Students</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalStudentData[0]["Day Shift"].Students.map((student, index) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-800 p-2">{student.SL}</td>
                                                    <td className="border border-gray-800 p-2">{student.Class}</td>
                                                    <td className="border border-gray-800 p-2">{student.Section}</td>
                                                    <td className="border border-gray-800 p-2">{student.Student}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="border   border-gray-800 p-2 font-bold text-end" colSpan="4">
                                                    Total Students: {totalStudentData[0]["Day Shift"]["Total Students"]}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="border h-14 mx-auto mt-6 bg-[#4c2a7d] rounded-md ">

                                        {totalStudentData && (
                                            <div className="text-center text-white mt-2 text-2xl">
                                                <p className="font-bold">Total Students: {totalStudentData[0]["Total Students"]}</p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

        </div>
    );
};

export default TotalStudent;
