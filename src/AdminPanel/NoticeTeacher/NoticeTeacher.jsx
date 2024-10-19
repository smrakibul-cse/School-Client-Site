import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from "../../Hook/AxiosSecure";
import { MdDateRange, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const NoticeTeacher = () => {
    const axiosSecure = useAxiosSecure();
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axiosSecure.get('/teacherNotice');
                setNotices(response.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, [axiosSecure]);

    const handleDeleteNotice = async (noticeId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/teacherNotice/${noticeId}`);
                    setNotices(notices.filter(notice => notice._id !== noticeId));
                    Swal.fire(
                        "Deleted!",
                        "The notice has been deleted.",
                        "success"
                    );
                } catch (error) {
                    console.error("Error deleting notice:", error);
                    Swal.fire(
                        "Error!",
                        "There was an error deleting the notice.",
                        "error"
                    );
                }
            }
        });
    };


    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
            <div className="flex justify-center py-4 gap-4">
                <button className="border-2 border-black px-4 py-2 font-bold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
                    <Link to="/dashBoard/adminNoticeTeacher">Add Notice By Teacher</Link>
                </button>
            </div>

            <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                Notice By Admin
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map(notice => (
                    <div key={notice._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold mb-2 text-blue-800">{notice.head}</h2>
                            <p className="text-gray-700 mb-4 whitespace-pre-line overflow-ellipsis text-justify">{notice.news}</p>
                        </div>
                        <div className="flex items-center justify-between text-gray-500 mt-4">
                            <div className="flex items-center">
                                <MdDateRange className="mr-2" />
                                <span>{notice.dateTime}</span>
                            </div>
                            <button className="btn btn-outline text-xl text-red-500" onClick={() => handleDeleteNotice(notice._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeTeacher;
