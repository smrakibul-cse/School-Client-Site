import React, { useState, useEffect } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdmissionData = () => {
    const axiosSecure = useAxiosSecure();
    const [newsData, setNewsData] = useState([]);
    const [admissionTimings, setAdmissionTimings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [newsRes, timingsRes] = await Promise.all([
                    axiosSecure.get('/admissionNews'),
                    axiosSecure.get('/admissionOpen')
                ]);
                setNewsData(newsRes.data);
                // Filter out entries that don't have the required fields
                const validTimings = timingsRes.data.filter(timing =>
                    timing.startDate && timing.startTime && timing.endDate && timing.endTime
                );
                setAdmissionTimings(validTimings);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosSecure]);

    const handleDeleteNews = (newsId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/admissionNews/${newsId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // Remove the deleted news item from the newsData state
                            setNewsData(newsData.filter(news => news._id !== newsId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The news item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting news item:", error);
                    });
            }
        });
    };

    const handleDeleteTime = (timeId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/admissionOpen/${timeId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // Remove the deleted timing item from the admissionTimings state
                            setAdmissionTimings(admissionTimings.filter(timing => timing._id !== timeId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The admission timing has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting admission timing:", error);
                    });
            }
        });
    };

    return (
        <div className="bg-[#5586c622] h-full">
            <h1 className="text-xl font-bold text-center py-2">Admission News</h1>
            {newsData.length === 0 ? (
                <p className="text-center">No news found</p>
            ) : (
                <table className="lg:w-[1200px] w-full border-collapse border border-gray-800 mx-auto mb-8">
                    <thead>
                        <tr>
                            <th className="border text-center border-gray-800 px-4 py-2">SL.</th>
                            <th className="border text-center border-gray-800 px-4 py-2">Head</th>
                            <th className="border text-center border-gray-800 px-4 py-2">Date & Time</th>
                            <th className="border text-center border-gray-800 px-4 py-2">News</th>
                            <th className="border text-center border-gray-800 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsData.map((newsItem, index) => (
                            <tr key={newsItem._id}>
                                <td className="border border-gray-800 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">{newsItem.head}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">{newsItem.dateTime}</td>
                                <td className="border border-gray-800 px-4 py-2">{newsItem.news}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">
                                    <button className="text-xl text-red-500" onClick={() => handleDeleteNews(newsItem._id)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h1 className="text-xl font-bold text-center py-2">Admission Timings</h1>
            {admissionTimings.length === 0 ? (
                <p className="text-center">No admission timings found</p>
            ) : (
                <table className="lg:w-[1200px] w-full border-collapse border border-gray-800 mx-auto">
                    <thead>
                        <tr>
                            <th className="border text-center border-gray-800 px-4 py-2">SL.</th>
                            <th className="border text-center border-gray-800 px-4 py-2">Start Date</th>
                            <th className="border text-center border-gray-800 px-4 py-2">Start Time</th>
                            <th className="border text-center border-gray-800 px-4 py-2">End Date</th>
                            <th className="border text-center border-gray-800 px-4 py-2">End Time</th>
                            <th className="border text-center border-gray-800 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admissionTimings.map((timing, index) => (
                            <tr key={timing._id}>
                                <td className="border border-gray-800 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">{timing.startDate}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">{timing.startTime}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">{timing.endDate}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">{timing.endTime}</td>
                                <td className="border border-gray-800 px-4 py-2 text-center">
                                    <button className="text-xl text-red-500" onClick={() => handleDeleteTime(timing._id)}>
                                        <MdDelete />
                                    </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Link to={'/dashboard/admissionShow'}>
                <button className="text-red-400 link-hover flex justify-center mx-auto py-6">Go Back To Admission Home Page</button>
            </Link>
        </div>
    );
};

export default AdmissionData;
