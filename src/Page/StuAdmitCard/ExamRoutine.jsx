import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import NavBar from "../../Navber/NavBar";
import "./stuAdmitCard.css";
import { FaDownload } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import logo from '../../assets/slider/cgzaman logo (1).png'

const ExamRoutine = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [examInfo, setExamInfo] = useState(null);
    const componentRef = useRef();

    useEffect(() => {
        if (selectedClass !== null) {
            axiosPublic.get(`/Admit/publish?classNumber=${selectedClass}`)
                .then(response => {
                    if (response.data.length === 0) {
                        toast.error('Routine is not published for the selected class');
                    }
                    setStudents(response.data);
                    if (response.data.length > 0) {
                        const { exam, shift, date, dayOfWeek, exam_time } = response.data[0];
                        setExamInfo({ exam, shift, date, dayOfWeek, exam_time });
                    }
                })
                .catch(error => {
                    console.error('Error fetching routine data:', error);
                    toast.error('Error fetching routine data');
                });
        }
    }, [selectedClass, axiosPublic]);


    const filteredStudents = students.filter(student => student.class === selectedClass);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div>
            <NavBar />
            <div className="exam-routine-container">

                <div className="exam-routine-content">
                    <h1 className="exam-routine-title">Exam Routine</h1>
                    <div className="class-select-container">
                        <label htmlFor="classSelect" className="class-select-label">Select Class:</label>
                        <select
                            id="classSelect"
                            className="class-select"
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    {selectedClass && (
                        <div className="routine-sheet" ref={componentRef}>

                            <div className='border-b-2 pb-4 mb-7'>
                                <div className='flex justify-center'>
                                    <img className='h-24 w-24' src={logo} alt="logo" />
                                </div>
                                <div className='text-center'>
                                    <h1 className='text-2xl font-bold'>Rowmari C.G Zaman Govt. High School</h1>
                                    <h1 className='font-bold text-gray-700'>Rowmari, Kurigram, Rangpur</h1>
                                    <h1 className='font-bold text-gray-700'>CBSE Affiliation No. 1030591, School Code.132043</h1>
                                    <h1 className='font-bold text-red-400'>Email: rcgzghs132043@gmail.com website: https://rcgzghs.edu.bd</h1>
                                    <div className='font-bold'>
                                        {examInfo && (
                                            <h2 className=""> <span className=''>Class {selectedClass}</span> {examInfo.exam} Routine</h2>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="routine-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>Subject</th>
                                            <th>Date</th>
                                            <th>Day of Week</th>
                                            <th className=''>Exam Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map((student, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{student.subject}</td>
                                                <td>{student.date}</td>
                                                <td>{student.dayOfWeek}</td>
                                                <td>{student.exam_time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
                <ToastContainer />
                <div className='flex mx-auto justify-center'>
                    <button className="download-btn" onClick={handlePrint}><FaDownload /></button>
                </div>
            </div>
        </div>
    );
};

export default ExamRoutine;
