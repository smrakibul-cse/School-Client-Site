import React, { useState, useEffect } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AdmissionShow = () => {
    const axiosSecure = useAxiosSecure();
    const [admissionData, setAdmissionData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAdmissionData();
    }, []);

    const fetchAdmissionData = async () => {
        try {
            const response = await axiosSecure.get("/admissionApply");
            setAdmissionData(response.data);
        } catch (error) {
            console.error("Error fetching admission data:", error);
        }
    };

    const handleStatusUpdate = async (studentId, status) => {
        try {
            await axiosSecure.put(`/admissionApply/${studentId}`, { status });
            // Update local state after successful update
            const updatedData = admissionData.map(student => {
                if (student._id === studentId) {
                    return { ...student, status };
                }
                return student;
            });
            setAdmissionData(updatedData);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Filter admission data based on search term
    const filteredData = admissionData.filter(student =>
        student.number && student.number.toString().includes(searchTerm)
    );


    const handleDeleteStudent = (studentId) => {
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
                axiosSecure.delete(`/admissionApply/${studentId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // Remove the deleted student from the admissionData state
                            setAdmissionData(admissionData.filter(student => student._id !== studentId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The student's information has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting student:", error);
                    });
            }
        });
    };


    return (
        <div className="bg-[#5586c622] h-full">
            <div className="flex justify-center py-4 gap-4">
                <button className="border px-4 py-2 border-black rounded-lg hover:bg-black hover:text-white">
                    <Link to="/dashBoard/admissionOpen">Open Admission</Link>
                </button>
                <button className="border px-4 py-2 border-black rounded-lg hover:bg-black hover:text-white">
                    <Link to="/dashBoard/admissionNews">Admission Notice</Link>
                </button>
                <button className="border px-4 py-2 border-black rounded-lg hover:bg-black hover:text-white">
                    <Link to="/dashBoard/showNewsData">Show News And Open Date</Link>
                </button>
            </div>
            <h1 className="text-xl font-bold text-center py-2">Admission Data</h1>

            <div className='flex justify-end mb-3 px-10'>
                <div className="border-black ">
                    <input
                        className='h-8 w-52 p-2 border-black'
                        type="number"
                        placeholder="Enter phone number"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className='border px-4 border-black rounded-r-lg hover:bg-gray-600'><IoSearch /></button>
            </div>
            {filteredData.length === 0 ? (
                <p className="text-center">No student found</p>
            ) : (
                <table className="lg:w-[1200px] w-full border-collapse border border-gray-800 mx-auto">
                    <thead>
                        <tr>
                            <th className="border border-gray-800 px-4 py-2">SL.</th>
                            <th className="border border-gray-800 px-4 py-2">Student Name</th>
                            <th className="border border-gray-800 px-4 py-2">Father's Name</th>
                            <th className="border border-gray-800 px-4 py-2">Mother's Name</th>
                            <th className="border border-gray-800 px-4 py-2">Date of Birth</th>
                            <th className="border border-gray-800 px-4 py-2">Gender</th>
                            <th className="border border-gray-800 px-4 py-2">Phone Number</th>
                            <th className="border border-gray-800 px-4 py-2">Status</th>
                            <th className="border border-gray-800 px-4 py-2">Action</th>
                            <th className="border border-gray-800 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((student, index) => (
                            <tr key={student._id}>
                                <td className="border border-gray-800 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-800 px-4 py-2">{student.NameBangla}</td>
                                <td className="border border-gray-800 px-4 py-2">{student.FNameBangla}</td>
                                <td className="border border-gray-800 px-4 py-2">{student.mNameBangla}</td>
                                <td className="border border-gray-800 px-4 py-2">{student.dateOfBirth}</td>
                                <td className="border border-gray-800 px-4 py-2">{student.gender}</td>
                                <td className="border border-gray-800 px-4 py-2">{student.number}</td>
                                <td className="border border-gray-800 px-4 py-2">{student.status}</td>
                                <td>
                                    <div className="flex gap-2 mx-auto justify-center">
                                        <button
                                            className="border border-black px-2 py-1 rounded-lg hover:bg-black hover:text-white"
                                            onClick={() => handleStatusUpdate(student._id, 'Selected')}
                                        >
                                            Selected
                                        </button>
                                        <button
                                            className="border border-black px-2 py-1 rounded-lg hover:bg-black hover:text-white"
                                            onClick={() => handleStatusUpdate(student._id, 'Not Selected')}
                                        >
                                            Not Selected
                                        </button>
                                        <button
                                            className="border border-black px-2 py-1 rounded-lg hover:bg-black hover:text-white"
                                            onClick={() => handleStatusUpdate(student._id, 'Pending')}
                                        >
                                            Pending
                                        </button>
                                    </div>
                                </td>
                                <td className="border border-gray-800 px-4 py-2">
                                    <button className="text-xl text-red-500" onClick={() => handleDeleteStudent(student._id)}>
                                        <MdDelete
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdmissionShow;
