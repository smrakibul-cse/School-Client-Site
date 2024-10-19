import './Achievement.css';
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { FaFemale, FaUserNurse } from "react-icons/fa";
import { BsCalendar4Event } from "react-icons/bs";
import { FaUser } from 'react-icons/fa6';
import useAxiosPublic from '../../Hook/UseAxiosPublic';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';


const Achievement = () => {
    const axiosPublic = useAxiosPublic();
    const [totalStudents, setTotalStudents] = useState(0);
    const [morningShiftStudents, setMorningShiftStudents] = useState(0);
    const [dayShiftStudents, setDayShiftStudents] = useState(0);
    const [homePageTeacher, setHomePageTeacher] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/totalStudent");
                const data = response.data[0];

                setTotalStudents(data["Total Students"]);
                setMorningShiftStudents(data["Morning Shift"]["Total Students"]);
                setDayShiftStudents(data["Day Shift"]["Total Students"]);
            } catch (error) {
                console.error("Error fetching total student information:", error);
            }
        };

        fetchData();
    }, [axiosPublic]);

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

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosPublic.get('/getEvent');
                setEvents(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [axiosPublic]);

    return (
        <div className="px-2 my-4 " data-aos="fade-up">
            <div className="border rounded-lg bg-[#f7f3f3]">
                <div className="mx-2 my-2 rounded-lg px-2 bg-[#eae8e8] pb-2">
                    <h1 className="text-xl text-center border rounded-lg mt-1 bg-[#382b56] text-white mb-3 p-1 uppercase" data-aos="fade-down">Our Achievement</h1>

                    <div className="lg:flex justify-center gap-2 mx-auto">
                        <div className="achievement-circle mx-auto mb-2 lg:mb-0">
                            <div className='border-b-2 border-b-[#382b56] w-24 mx-auto'>
                                <p className='text-[#382b56] text-5xl flex justify-center -mt-4 pb-2'><GiTeacher /></p>
                            </div>
                            <p className='text-6xl font-bold mt-2 text-black text-center'>
                                <CountUp end={homePageTeacher.length} duration={5.5} />
                            </p>
                            <h1 className='text-xl roboto'>Total Teacher</h1>
                        </div>

                        <div className="achievement-circle mx-auto mb-2 lg:mb-0">
                            <div className='border-b-2 border-b-[#382b56] w-24 mx-auto'>
                                <p className='text-[#382b56] text-5xl flex justify-center -mt-4 pb-2'><FaUser /></p>
                            </div>
                            <p className='text-6xl font-bold mt-2 text-black text-center'>
                                <CountUp end={totalStudents} duration={5.5} />
                            </p>
                            <h1 className='text-xl roboto'>Total Student</h1>
                        </div>

                        <div className="achievement-circle mx-auto mb-2 lg:mb-0">
                            <div className='border-b-2 border-b-[#382b56] w-24 mx-auto'>
                                <p className='text-[#382b56] text-5xl flex justify-center -mt-4 pb-2'><FaUserNurse /></p>
                            </div>
                            <p className='text-6xl font-bold mt-2 text-black text-center'>
                                <CountUp end={morningShiftStudents} duration={5.5} />
                            </p>
                            <h1 className='text-xl text-center roboto'>Morning Shift Student</h1>
                        </div>

                        <div className="achievement-circle mx-auto mb-2 lg:mb-0">
                            <div className='border-b-2 border-b-[#382b56] w-24 mx-auto'>
                                <p className='text-[#382b56] text-5xl flex justify-center -mt-4 pb-2'><FaUserNurse /></p>
                            </div>
                            <p className='text-6xl font-bold mt-2 text-black text-center'>
                                <CountUp end={dayShiftStudents} duration={5.5} />
                            </p>
                            <h1 className='text-xl roboto'>Day Shift Student</h1>
                        </div>

                        <div className="achievement-circle mx-auto mb-2 lg:mb-0">
                            <div className='border-b-2 border-b-[#382b56] w-24 mx-auto'>
                                <p className='text-[#382b56] text-5xl flex justify-center -mt-4 pb-2'><BsCalendar4Event /></p>
                            </div>
                            <p className='text-6xl font-bold mt-2 text-black text-center'>
                                <CountUp end={events.length} duration={5.5} />
                            </p>
                            <h1 className='text-xl roboto'>Total Event</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Achievement;
