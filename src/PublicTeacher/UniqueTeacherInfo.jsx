import { useLoaderData } from "react-router-dom";
import NavBar from "../Navber/NavBar";

const UniqueTeacherInfo = () => {
    const teacher = useLoaderData();
    return (
        <div>
            <NavBar></NavBar>
            <div className="my-6 overflow-x-auto">
                <div>
                    <div>
                        <h1 className="text-2xl text-center my-4 uppercase font-bold">Teacher Information</h1>

                        <table className="border border-gray-400 mx-auto lg:w-[1110px] md:w-[600px] w-[320px]">
                            <tbody>
                                <tr className="bg-slate-200">
                                    <td colSpan={4} className="text-center p-4">
                                        <img src={teacher?.Picture} alt="Teacher" className="md:w-40 w-10 h-10 md:h-40 rounded-full mx-auto" />
                                    </td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.name}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Designation</td>
                                    <td className="border border-gray-400 p-2">{teacher.Designation}</td>
                                </tr>

                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">Father Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.Father}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Mother Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.Mother}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Spouse Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.Spouse}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Date of Birth</td>
                                    <td className="border border-gray-400 p-2">{teacher.Birth}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">Gadget No</td>
                                    <td className="border border-gray-400 p-2">{teacher.Gadget}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Religion</td>
                                    <td className="border border-gray-400 p-2">{teacher.Religion}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Blood Group</td>
                                    <td className="border border-gray-400 p-2">{teacher.bloodGroup}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Gender</td>
                                    <td className="border border-gray-400 p-2">{teacher.gender}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">Marital Status</td>
                                    <td className="border border-gray-400 p-2">{teacher.Marital}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Shift</td>
                                    <td className="border border-gray-400 p-2">{teacher.Shift}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Qualification</td>
                                    <td className="border border-gray-400 p-2">{teacher.Qualification}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Teaching</td>
                                    <td className="border border-gray-400 p-2">{teacher.Teaching}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">First Join Date</td>
                                    <td className="border border-gray-400 p-2">{teacher.Join}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Present Address</td>
                                    <td className="border border-gray-400 p-2">{teacher.Present}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Permanent Address</td>
                                    <td className="border border-gray-400 p-2">{teacher.Permanent}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Phone Number</td>
                                    <td className="border border-gray-400 p-2">{teacher.number}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueTeacherInfo;
