import React, { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import NavBar from "../../Navber/NavBar";
import Swal from "sweetalert2";
import logo from '../../assets/slider/cgzaman logo (1).png'
import { FaDownload } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';


const ExamAdmitCard = () => {
    const axiosPublic = useAxiosPublic();
    const [studentData, setStudentData] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedRoll, setSelectedRoll] = useState("");
    const [loading, setLoading] = useState(true);
    const [routineData, setRoutineData] = useState([]);
    const [showData, setShowData] = useState(false);
    const componentRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/students");
                setStudentData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student information:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosPublic]);

    const fetchRoutineData = async () => {
        try {
            const response = await axiosPublic.get("/Admit/publish");
            if (response.data.length === 0) {
                Swal.fire("Cannot Publish Admit", "Admit data is not available.", "error");
                setShowData(false);
                return;
            }

            const filteredRoutineData = response.data.filter(item => (
                item.class === selectedClass
            ));
            setRoutineData(filteredRoutineData);
            setShowData(true);
        } catch (error) {
            console.error("Error fetching routine information:", error);
            setRoutineData([]);
            setShowData(false);
        }
    };

    const handleViewClick = () => {
        if (selectedClass) {
            fetchRoutineData();
        } else {
            setRoutineData([]);
            setShowData(false);
        }
    };

    const filteredStudents = studentData
        .filter((student) => (
            (!selectedClass || student.class === selectedClass) &&
            (!selectedSection || student.section === selectedSection) &&
            (!selectedRoll || student.roll.toString() === selectedRoll)
        ));

    // Filter subjects for the first table (showing 5 subjects)
    const firstTableSubjects = routineData.slice(0, 5);
    // Filter subjects for the second table (showing the remaining subjects)
    const secondTableSubjects = routineData.slice(5);


    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div>
            <NavBar />
            <div className="overflow-auto">

                <div className="lg:flex justify-center mx-auto container lg:h-52 ">
                    <div className="lg:flex justify-center gap-3 my-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Class</span>
                            </label>
                            <select
                                name="class"
                                className="select select-bordered md:w-48"
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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Section</span>
                            </label>
                            <select
                                name="section"
                                className="select select-bordered md:w-48"
                                onChange={(e) => setSelectedSection(e.target.value)}
                            >
                                <option value="">Select Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Roll</span>
                            </label>
                            <input
                                onChange={(e) => setSelectedRoll(e.target.value)}
                                type="number"
                                name="roll"
                                placeholder="Enter Class Roll"
                                className="input input-bordered"
                            />
                        </div>
                        <button className="btn btn-primary mt-9" onClick={handleViewClick} disabled={!selectedClass || loading}>View</button>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : showData ? (
                    <div ref={componentRef} className="w-[750px] mx-auto border rounded-lg mt-8 overflow-x-auto">
                        <div className=' text-white py-2 flex justify-center'>
                            <div className="bg-slate-100 rounded-l-lg">
                                <img className="w-32" src={logo} alt="" />
                            </div>
                            <div className="bg-[#2462b9] p-1 border rounded-r-lg">
                                <h1 className='text-center text-2xl font-bold mt-3'>Rowmari C.G Zaman High School,Rowmai,Kurigram</h1>

                                {routineData.length > 0 && (
                                    <h2 className="text-xl font-bold text-center"> {routineData[0].exam}</h2>
                                )}

                                <h1 className="text-xl font-bold text-center uppercase">Admit Card</h1>
                            </div>
                        </div>
                        {filteredStudents.length === 0 ? (
                            <p className="text-center">No data available</p>
                        ) : (
                            <div>
                                <h1 className="text-center font-bold text-2xl my-2 ">Student Information</h1>
                                <table className="mx-auto w-[700px]">

                                    <tbody>
                                        {filteredStudents.map((student, index) => (
                                            <React.Fragment key={index}>
                                                <tr className="">
                                                    <th className="border w-20 bg-slate-100">Roll</th>
                                                    <td className="border w-20 text-center bg-slate-100">{student.roll}</td>
                                                    <th className="border bg-slate-100">Name</th>
                                                    <td className="border text-center bg-slate-100 p-2"> {student.name}</td>
                                                    <th className="border bg-slate-100">Section</th>
                                                    <td className="border bg-slate-100 text-center p-2"  > {student.section}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border">Class</th>
                                                    <td className="border text-center p-2"  > {student.class}</td>
                                                    <th className="border">Father's Name</th>
                                                    <td className="border text-center p-2"  > {student.fName}</td>
                                                    <th className="border">Mother's Name</th>
                                                    <td className="border text-center p-2"  >{student.mName}</td>

                                                </tr>
                                                <tr>
                                                    <th className="border p-2 bg-slate-100">Examination</th>
                                                    <td colSpan={2} className="border text-center p-2 w-24 bg-slate-100"  >{routineData[0].exam}</td>


                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div>
                            <h1 className="text-2xl font-bold text-center my-2">Exam Routine</h1>
                            <div className="flex w-[700px] mx-auto">

                                <div className="mx-auto ">
                                    <table className="mx-auto w-[350px]">
                                        <thead>
                                            <tr className="border text-center p-1">
                                                <th className="border text-center p-1 bg-slate-100">Date</th>
                                                <th className="border text-center p-1">Subject</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {firstTableSubjects.map((routine, index) => (
                                                <tr key={index}>
                                                    <td className="border text-center p-1 bg-slate-100">{routine.date}</td>
                                                    <td className="border text-center p-1">{routine.subject}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mx-auto">
                                    <table className="mx-auto w-[350px] ">
                                        <thead>
                                            <tr className="border text-center p-1">
                                                <th className="border text-center p-1 bg-slate-100">Date</th>
                                                <th className="border text-center p-1">Subject</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {secondTableSubjects.map((routine, index) => (
                                                <tr key={index}>
                                                    <td className="border text-center p-1 bg-slate-100">{routine.date}</td>
                                                    <td className="border text-center p-1">{routine.subject}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="border w-[700px] mx-auto p-2">
                            <p><li>Admit card must be brought to the exam hall.</li></p>
                            <p><li>Must enter the exam hall 30 minutes before the start of the exam.</li></p>
                        </div>
                        <div className="border mt-4 h-16 w-[720px] mx-auto mb-3 bg-[#EEEEEE] rounded-lg">
                            <p className="border w-[720px] h-5 rounded-t-lg bg-[#2462b9]">
                                <span className="flex justify-center mt-7">©2011-2024 RCGZHS, All rights reserved.</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500 text-xl text-center">Please select class, section, and roll to view student information.</p>

                )}

                <div>
                    <button onClick={handlePrint} className="btn flex mx-auto mt-3"><FaDownload></FaDownload></button>
                </div>
            </div>
        </div>
    );
};

export default ExamAdmitCard;
