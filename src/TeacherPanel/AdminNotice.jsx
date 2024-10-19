import React, { useState, useEffect } from 'react';
import useAxiosSecure from "../Hook/AxiosSecure";
import { MdDateRange } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AdminNotice = () => {
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

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-900">
                Teacher Notices
            </h1>
            <div className="space-y-8">
                {notices.map(notice => (
                    <div key={notice._id} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-blue-800 mb-2">{notice.head}</h2>
                        <p className="text-gray-700 mb-4">{notice.news}</p>
                        <div className="flex items-center text-gray-500">
                            <MdDateRange className="mr-2" />
                            <span>{notice.dateTime}</span>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminNotice;
