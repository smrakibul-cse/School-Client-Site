import { useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";


const StudentInfo = () => {
    const axiosPublic = useAxiosPublic();
    const { data: students = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/students');
            return res.data;
        }
    })

    const [selectedClass, setSelectedClass] = useState("");
    const filteredStudents = selectedClass ? students.filter(student => student.class === selectedClass) : students;


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
                axiosPublic.delete(`/students/${studentId}`)
                    .then(res => {
                        refetch(); // Refresh the student data
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The student information has been deleted.",
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
        <div className="py-5">
            <h1 className="text-xl text-center font-bold py-3">Total Student: {filteredStudents.length}</h1>
            <div className="w-96 mb-4 flex gap-3 mx-auto">
                <label className="label">
                    <span className="label-text">Search Class</span>
                </label>
                <select
                    className="select select-bordered"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="" disabled>Select Class</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="Vocational">Vocational</option>
                </select>
            </div>
            <table className="mx-auto lg:w-[1200px] w-full">
                <thead>
                    <tr className="border">
                        <th className="border">No.</th>
                        <th className="border">Name</th>
                        <th className="border">Class</th>
                        <th className="border">Section</th>
                        <th className="border">Roll</th>
                        <th className="border">Gender</th>
                        <th className="border">DOB</th>
                        <th className="border">Email</th>
                        <th className="border">Phone</th>
                        <th className="border">Address</th>
                        <th className="border">Action</th>

                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredStudents.map((student, index) => (
                        <tr  key={student._id}>
                            <th className='border'>{index + 1}</th>
                            <td className="border">{student.name}</td>
                            <td className="border">{student.class}</td>
                            <td className="border">{student.section}</td>
                            <td className="border">{student.roll}</td>
                            <td className="border">{student.gender}</td>
                            <td className="border">{student.dateOfBirth}</td>
                            <td className="border">{student.email}</td>
                            <td className="border">{student.number}</td>
                            <td className="border">{student.address}</td>
                            <td className="border text-center">
                                <NavLink to={`update/${student._id}`}>
                                    <button className="text-xl">
                                        <FaEdit></FaEdit>
                                    </button>
                                </NavLink>
                                <button className="text-xl text-red-500 ml-2" onClick={() => handleDeleteStudent(student._id)}>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentInfo;
