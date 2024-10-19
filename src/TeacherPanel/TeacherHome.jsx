import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hook/AxiosSecure";
import { FaUserGraduate } from "react-icons/fa";
import { MdDateRange, MdOutlineEvent } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";

const TeacherHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [student, setStudent] = useState([]);
    const [result, setResult] = useState([]);
    const [event, setEvents] = useState([]);
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axiosSecure.get('/students');
                setStudent(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStudent();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axiosSecure.get('/results/publish');
                setResult(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchResult();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosSecure.get('/getEvent');
                const sortedEvents = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setEvents(sortedEvents);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axiosSecure.get('/teacherNotice');
                setNotices(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotices();
    }, [axiosSecure]);

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
            <div className="text-center py-4 text-2xl font-bold text-blue-900">
                {user && <p>Hi, Welcome {user.displayName}</p>}
            </div>

            <div className="lg:flex gap-4">
                <div className="border px-5 py-4 rounded-lg lg:w-[850px] bg-white shadow-lg">
                    <div className="border px-2 py-2 pr-4 rounded-lg mx-auto lg:w-[810px] bg-blue-50 shadow-md">
                        <h1 className="text-2xl font-bold text-center border w-[200px] mx-auto mb-4 bg-blue-900 text-white rounded-lg py-1">School Insights</h1>
                        <div className="flex flex-col lg:flex-row justify-center gap-4 mx-auto">
                            <div className="bg-blue-500 w-full lg:w-[260px] h-32 text-center flex items-center justify-center gap-4 border rounded-lg shadow-md">
                                <FaUserGraduate className="text-4xl text-white" />
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{student.length}</h1>
                                    <span className="font-bold text-white">Total Students</span>
                                </div>
                            </div>
                            <div className="bg-purple-500 w-full lg:w-[260px] h-32 text-center flex items-center justify-center gap-4 border rounded-lg shadow-md">
                                <GrPersonalComputer className="text-4xl text-white" />
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{result.length}</h1>
                                    <span className="font-bold text-white">Published Results</span>
                                </div>
                            </div>
                            <div className="bg-green-500 w-full lg:w-[260px] h-32 text-center flex items-center justify-center gap-4 border rounded-lg shadow-md">
                                <MdOutlineEvent className="text-4xl text-white" />
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{event.length}</h1>
                                    <span className="font-bold text-white">Total Events</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border px-2 py-4 rounded-lg lg:w-[320px] bg-white shadow-lg">
                    <div className="border px-4 py-4 rounded-lg lg:w-[300px] bg-blue-50 shadow-md">
                        <h1 className="text-xl font-bold text-center text-blue-900 mb-4">Upcoming Events</h1>
                        {event.length > 0 ? (
                            event.slice(0, 2).map(ev => (
                                <div key={ev._id} className="event-item border px-2 py-2 rounded-lg mb-2 bg-blue-100 shadow-sm">
                                    <div className=" text-blue-900">
                                        <div className="flex gap-4">
                                            <h2 className="text-md">Date: {ev.date}</h2>
                                            <h2 className="text-md">Time: {ev.time}</h2>
                                        </div>
                                        <h2 className="text-md">{ev.head}</h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No events available</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-900">
                    Admin Notices
                </h1>
                <div className="space-y-6">
                    {notices.map(notice => (
                        <div key={notice._id} className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-blue-800 mb-2">{notice.head}</h2>
                            <p className="text-gray-700 mb-4 whitespace-pre-line overflow-hidden overflow-ellipsis max-h-[100px]">{notice.news}</p>
                            <div className="flex items-center text-gray-500">
                                <MdDateRange className="mr-2" />
                                <span>{notice.dateTime}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherHome;
