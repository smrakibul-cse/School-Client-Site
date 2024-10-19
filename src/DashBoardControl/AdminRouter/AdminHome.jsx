import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/AxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import './adminHome.css';
import { FaUsers, FaUserGraduate, FaChalkboardTeacher} from "react-icons/fa";
import { PiComputerTower, PiStudentBold } from "react-icons/pi";
import ResultBarChart from "../../AdminPanel/BarChart/ResultBarChart";
import { MdOutlineEvent } from "react-icons/md";

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState();
    const [student, setStudent] = useState();
    const [teacher, setTeacher] = useState();
    const [result, setResult] = useState();
    const [studentApply, setStudentApply] = useState();
    const [event, setEvents] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get('/users');
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [axiosSecure]);

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
        const fetchResultPerformance = async () => {
            try {
                const res = await axiosSecure.get('/generalTeacher');
                setTeacher(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchResultPerformance();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axiosSecure.get('results/publish');
                setResult(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchResult();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchApply = async () => {
            try {
                const res = await axiosSecure.get('admissionApply');
                setStudentApply(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApply();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosSecure.get('/getEvent');
                setEvents(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [axiosSecure]);

    return (
        <div className="lg:px-8 px-4">
            <div className='py-4 text-xl'>
                {user ? (
                    <p>Hi, Welcome {user.displayName}</p>
                ) : null}
            </div>
            <div className="lg:flex gap-6">
                <div className="border px-6 py-4 rounded-lg lg:w-[850px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
                    <div className="border px-4 py-4 rounded-lg mx-auto lg:w-[810px] bg-white shadow-inner">
                        <h1 className="text-2xl font-bold text-center mb-4 bg-blue-700 text-white rounded-lg py-2">School Insights</h1>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 justify-center px-11 md:px-0 lg:mr-4">
                            {[
                                { icon: <FaUsers />, count: users?.length, label: "Total Users", bgColor: "bg-blue-500" },
                                { icon: <FaUserGraduate />, count: student?.length, label: "Total Students", bgColor: "bg-green-500" },
                                { icon: <FaChalkboardTeacher />, count: teacher?.length, label: "Total Teachers", bgColor: "bg-red-500" },
                                { icon: <PiComputerTower />, count: result?.length, label: "Published Results", bgColor: "bg-purple-500" },
                                { icon: <PiStudentBold />, count: studentApply?.length, label: "Admission Applications", bgColor: "bg-orange-500" },
                                { icon: <MdOutlineEvent />, count: event?.length, label: "Total Events", bgColor: "bg-teal-500" },
                            ].map((item, index) => (
                                <div key={index} className={`${item.bgColor} w-64 h-32 text-center flex items-center justify-center gap-4 border rounded-lg shadow-md`}>
                                    <div className="text-4xl text-white">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white">{item.count}</h1>
                                        <span className="text-lg font-bold text-white">{item.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border px-4 py-4 rounded-lg lg:w-[320px] bg-gradient-to-r from-green-500 to-blue-500 shadow-lg mt-6 lg:mt-0">
                    <div className="border px-4 py-4 rounded-lg bg-white shadow-inner">
                        <h1 className="text-lg text-center text-black mb-4">Upcoming Events</h1>
                        <div>
                            {event?.length > 0 ? (
                                event.slice(0, 4).map(eventItem => (
                                    <div key={eventItem._id} className="event-item border px-4 py-2 rounded-lg mb-2 bg-gray-100 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-md text-black">Date: {eventItem.date}</h2>
                                            <h2 className="text-md text-black">Time: {eventItem.time}</h2>
                                        </div>
                                        <h2 className="text-md text-black">{eventItem.head}</h2>
                                    </div>
                                ))
                            ) : (
                                <p>No events available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <ResultBarChart />
            </div>
        </div>
    );
};

export default AdminHome;
