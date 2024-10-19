import { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import NavBar from "../Navber/NavBar";
import './head.css'

const HeadTeacher = () => {
    const axiosPublic = useAxiosPublic();
    const [headTeacher, setHeadTeacher] = useState([]);

    useEffect(() => {
        const fetchHeadTeacher = async () => {
            try {
                const res = await axiosPublic.get('/headTeacher');
                setHeadTeacher(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHeadTeacher();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar />
            <div className=" bg-[#3a1f5e] pb-4">

                <div className="pt-5">
                    <h1 className=" text-center py-4 md:text-4xl text-xl font-bold uppercase text-white">Head Teacher Information</h1>
                </div>
                <div className=" overflow-x-auto container">
                    <div className="md:flex gap-2 mx-auto justify-center px-2 py-2 rounded-lg bg-gray-100">
                        {/* First Table */}
                        <div>
                            <table className="lg:w-[490px] md:w-[280px] w-full">
                                <tbody>
                                    {headTeacher.map((head, index) => (
                                        <tr key={index}>
                                            <tr className="bg-[#E9E9E9]">
                                                <th className="border2 lg:w-72 w-96 ">Teacher ID</th>
                                                <td className="border2 lg:w-72 w-96 ">{head['Teacher ID']}</td>
                                            </tr>
                                            <tr className="">
                                                <th className="border2 px-9">Designation</th>
                                                <td className="border2 " >{head.Designation}</td>
                                            </tr>
                                            <tr className="bg-[#E9E9E9]">
                                                <th className="border2 ">Teacher Name</th>
                                                <td className="border2 ">{head['Teacher Name']}</td>
                                            </tr>

                                            <tr>
                                                <th className="border2 ">Father Name</th>
                                                <td className="border2 ">{head['Father Name']}</td>
                                            </tr>

                                            <tr className="bg-[#E9E9E9]">
                                                <th className="border2">Mother Name</th>
                                                <td className="border2 ">{head['Mother Name']}</td>
                                            </tr>
                                            <tr>
                                                <th className="border2 ">Spouse Name</th>
                                                <td className="border2 ">{head['Spouse Name']}</td>
                                            </tr>
                                            <tr className="bg-[#E9E9E9]">
                                                <th className="border2 ">Date of Birth</th>
                                                <td className="border2 ">{head['Date of Birth']}</td>
                                            </tr>
                                            <tr>
                                                <th className="border2">Blood Group</th>
                                                <td className="border2">{head['Blood Group']}</td>
                                            </tr>
                                            <tr className="bg-[#E9E9E9]">
                                                <th className="border2">Gender</th>
                                                <td className="border2">{head.Gender}</td>
                                            </tr>
                                            <tr>
                                                <th className="border2">Marital Status</th>
                                                <td className="border2">{head['Marital Status']}</td>
                                            </tr>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Second Table */}
                        <div>
                            <table className="lg:w-[570px] md:w-[400px] w-full">
                                <tbody>
                                    {headTeacher.map((head, index) => (
                                        <tr key={index}>

                                            <tr>
                                                <th className="md:border border-[#d4d4d4] md:bg-[#E9E9E9] text-center ">Picture</th>
                                                <td className="md:border border-[#d4d4d4] md:bg-[#E9E9E9]"><img className="md:h-[104px] md:w-28 h-20 flex mx-auto justify-center rounded-full " src={head.Picture} alt="" /></td>
                                            </tr>
                                            <tr>
                                                <th className=" lg:w-72 w-96">Qualification</th>
                                                <td className="text-center py-7">{head.Qualification}</td>
                                            </tr>
                                            <tr className="bg-[#E9E9E9]">
                                                <th className="md:border2 border">Teaching Subject</th>
                                                <td className="border2">{head['Teaching Subject']}</td>
                                            </tr>
                                            <tr>
                                                <th className="border2 ">Email</th>
                                                <td className="border2 ">{head.Email}</td>
                                            </tr>

                                            <tr className="bg-[#E9E9E9]">
                                                <th className="border2 py-2">First Join Date</th>
                                                <td className="border2 ">{head['First Join Date']}</td>
                                            </tr>
                                            <tr>
                                                <th className="border2 py-7">Present Address</th>
                                                <td className="border2 ">{head['Present Address']}</td>
                                            </tr>
                                            <tr className="bg-[#E9E9E9] ">
                                                <th className="py-7 border">Permanent Address</th>
                                                <td className=" border">{head['Permanent Address']}</td>
                                            </tr>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadTeacher;
