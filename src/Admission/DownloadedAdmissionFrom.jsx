import React, { useRef, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import NavBar from "../Navber/NavBar";
import logo from '../../src/assets/slider/cgzaman logo (1).png'
import { IoSearch } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";


const DownloadedAdmissionFrom = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: searchData, isLoading, refetch } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get(`/admissionApply?number=${searchTerm}`);
            return res.data;
        },
        enabled: false,
    });

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async () => {
        if (searchTerm) {
            await refetch();
        }
    };

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div>
            <NavBar />
            <div className=''>
                <h1 className='text-xl text-center my-2'>Admission Form Data</h1>
                <div className='flex justify-center py-4'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter phone number</span>
                        </label>
                        <input
                            className='h-8 w-52 p-2 border '
                            type="tel"
                            placeholder="Enter phone number"
                            value={searchTerm}
                            onChange={handleChange} />
                    </div>
                    <button className='border px-4 mt-9 border-black rounded-r-lg hover:bg-gray-600' onClick={handleSearch}><IoSearch /></button>
                </div>
            </div>
            <div className='overflow-x-auto'>
                {isLoading && <p>Loading...</p>}
                {searchData && searchData.length > 0 ? (
                    <div ref={componentRef} className='w-[700px]  mx-auto border rounded-lg border-black mt-5 mb-5 '>
                        <div className='px-4'>
                            <h1 className='border-b-2 w-32 border-b-black'>For Office Use Only</h1>
                            <div className='flex justify-evenly'>
                                {/* div 1 */}
                                <div >
                                    <div className='flex gap-6'>
                                        <h1>Admission Form Number:</h1> <span className=' font-bold'>{searchData[0]._id.slice(-17)}</span>
                                    </div>
                                    <div className='flex gap-10'>
                                        <h1>Transfer Certificate No:</h1>
                                        <p className='border-b border-black w-32 '></p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <h1>Admission Fees Receipt No:</h1>
                                        <p className='border-b border-black w-32 '></p>
                                    </div>
                                    <div className='flex gap-3'>
                                        <h1>Admission Student Number:</h1>
                                        <p className='border-b border-black w-32 '></p>
                                    </div>
                                </div>

                                <div>
                                    <div className='flex gap-2'>
                                        Date:
                                        <p className='border-b border-black w-8'></p>
                                        <p className='border-b border-black w-8'></p>
                                        <p className='border-b border-black w-20'></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border w-[680px] h-60 mx-auto mt-2 rounded-lg border-black'>
                            <div className=''>
                                <div className='flex justify-center'>
                                    <img className='h-20 w-24' src={logo} alt="logo" />
                                </div>

                                <div className='text-center'>
                                    <h1 className='text-2xl font-bold text-[#35749e]'>Rowmari C.G Zaman Govt. High School</h1>
                                    <h1 className=' font-bold text-[#11161e]'>Rowmari,Kurigram,Rangpur</h1>
                                    <h1 className='font-bold text-[#972338]'>Since:1949,School Code.122542</h1>
                                    <h1 className='font-bold text-[#972338]'>Email:rcgzghs132043@gmail.com website:https://rcgzghs.edu.bd</h1>
                                    <h1 className='font-bold text-2xl text-[#db4a64]'>Application For Admission</h1>
                                    <h1 className='font-bold text-xl text-[#db4a64]'>Session: 2025-2026</h1>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3 px-2 flex justify-evenly'>
                            {/* student photo */}
                            <div className='border border-black border-dashed h-36 w-[150px]'>
                                {searchData && searchData.photoURL ? (
                                    <img className='h-full w-full object-cover' src={searchData.photoURL} alt="Student" />
                                ) : (
                                    <p>No photo available</p>
                                )}
                            </div>

                            <div className='border border-black border-dashed h-36 w-[150px]'>
                                <h1 className='text-center my-4 px-2'>Included <span className='text-2xl text-bold'>Father's</span> Recent passport size photo</h1>
                            </div>
                            <div className='border border-black border-dashed h-36 w-[150px]'>
                                <h1 className='text-center my-4 px-2'>Included <span className='text-2xl text-bold'>Mother's</span> Recent passport size photo</h1>
                            </div>
                            <div className='border border-black border-dashed h-36 w-[150px]'>
                                <h1 className='text-center my-4 px-2'>Included <span className='text-2xl text-bold'>Local Guardian's</span> Recent passport size photo</h1>
                            </div>

                        </div>
                        <table className='w-[700px] mx-auto '>
                            <tbody >
                                {searchData.map(student => (
                                    student.number === searchTerm && (
                                        <React.Fragment key={student._id}>
                                            <div className=' mt-2 px-6 w-[790px]'>
                                                <h1 className='text-xl font-bold text-center py-1'>Student Personal Information</h1>
                                                <tr className="border">
                                                    <th className="border text-center">শিক্ষার্থীর নাম (বাংলা)</th>
                                                    <td className="border text-center p-2">{student.NameBangla}</td>

                                                    <th className="border text-center p-2"> শিক্ষার্থীর নাম (ইংরেজি)</th>
                                                    <td className="border text-center p-2">{student.NameEnglish}</td>

                                                </tr>

                                                <tr>
                                                    <th className="border text-center p-2">জন্ম নিবন্ধন নং</th>
                                                    <td className="border text-center p-2">{student.nibondon}</td>
                                                    <th className="border text-center p-2">জন্ম তারিখ</th>
                                                    <td className="border text-center p-2">{student.dateOfBirth}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center p-2">জন্মস্থান (জেলা)</th>
                                                    <td className="border text-center p-2">{student.জেলা}</td>
                                                    <th className="border text-center p-2">জেন্ডার</th>
                                                    <td className="border text-center p-2">{student.gender}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center p-2 ">জাতীয়তা</th>
                                                    <td className="border text-center">{student.জন্মস্থান}</td>
                                                    <th className="border text-center p-2 ">ধর্ম</th>
                                                    <td className="border text-center p-2">{student.ধর্ম}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center p-2">কনফার্মেশন নাম্বার</th>
                                                    <td className="border text-center p-2">{student.number}</td>
                                                    <th className="border text-center p-2 ">শ্রেণী</th>
                                                    <td className="border text-center p-2">Six</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center p-2">প্রতিবন্ধিতা</th>
                                                    <td className="border text-center p-2">{student.প্রতিবন্ধিতা}</td>
                                                    <th className="border text-center p-2">রক্তের গ্রুপ</th>
                                                    <td className="border text-center p-2">{student.bloodGroup}</td>
                                                </tr>


                                                <tr>
                                                    <th className="border text-center p-2">Primary School Name</th>
                                                    <td className="border text-center p-2">{student.primary}</td>
                                                    <th className="border text-center p-2">Result</th>
                                                    <td className="border text-center p-2 text-red-500 font-bold">{student.status}</td>

                                                </tr>
                                                <h1 className='text-xl font-bold text-center py-1'>Student Mother's Information</h1>

                                                <tr>
                                                    <th className="border text-center px-5 py-2">মাতার এনআইডি নং</th>
                                                    <td className="border text-center px-5 py-2">{student.MNid}</td>
                                                    <th className="border text-center px-5 py-2">মাতার মোবাইল নং</th>
                                                    <td className="border text-center px-5 py-2">{student.number}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center px-5 py-2 ">মাতার নাম(বাংলা):</th>
                                                    <td className="border text-center px-5 py-2">{student.mNameBangla}</td>
                                                    <th className="border text-center px-5 py-2"> মাতার নাম (ইংরেজি)</th>
                                                    <td className="border text-center px-5 py-2">{student.mNameEnglish}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center p-2"> মাতার পেশা</th>
                                                    <td className="border text-center p-2">গৃহিনী</td>

                                                </tr>
                                                <h1 className='text-xl font-bold text-center py-1'>Student Father's Information</h1>

                                                <tr>
                                                    <th className="border text-center px-6 py-2">পিতার এনআইডি নং</th>
                                                    <td className="border text-center px-6 py-2">{student.FNid}</td>
                                                    <th className="border text-center px-5 py-2"> পিতার মোবাইল নং</th>
                                                    <td className="border text-center px-5 py-2">{student.number}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center px-5 py-2"> পিতার নাম(বাংলা)</th>
                                                    <td className="border text-center px-5 py-2">{student.FNameBangla}</td>
                                                    <th className="border text-center px-5 py-2">  পিতার নাম (ইংরেজি)</th>
                                                    <td className="border text-center px-5 py-2">{student.FNameEnglish}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center px-5 py-2">পিতার পেশা</th>
                                                    <td className="border text-center px-5 py-2">শ্রমিক</td>
                                                </tr>
                                                <h1 className='text-xl font-bold text-center px-5 py-2'>Student Address</h1>

                                                <tr>
                                                    <th className="border text-center px-6 py-2">বিভাগ</th>
                                                    <td className="border text-center px-6 py-2">{student.বিভাগ}</td>
                                                    <th className="border text-center  px-6 py-2">জেলা</th>
                                                    <td className="border text-center px-6 py-2">{student.জেলা}</td>
                                                    <th className="border text-center px-6 py-2">উপাজেলা/থানা</th>
                                                    <td className="border text-center px-6 py-2">{student.উপজেলা}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center p-1">ইউনিয়ন</th>
                                                    <td className="border text-center">{student.ইউনিয়ন}</td>
                                                    <th className="border text-center p-1">গ্রাম</th>
                                                    <td className="border text-center">{student.গ্রাম}</td>
                                                    <th className="border text-center p-1">ডাকঘর</th>
                                                    <td className="border text-center">{student.ডাকঘর}</td>
                                                </tr>
                                                <tr>
                                                    <th className="border text-center p-1">কোড</th>
                                                    <td className="border text-center">{student.কোড}</td>
                                                </tr>

                                                <h1 className='text-xl font-bold text-center py-1'>পিতা/মাতা/অভিভাবক এর প্রত্যয়ন</h1>

                                                <div className='border  w-[650px] mb-2'>
                                                    <h1 className='border font-bold px-2 py-1 border-black'>এ তথ্যছকে উল্লিখিত তথ্য আমার জ্ঞান ও বিশ্বাস মতে সত্য।</h1>

                                                    <h1 className='border px-2 py-1 border-black'>পিতা/মাতা/অভিভাবক এর নাম:</h1>
                                                    <h1 className='border px-2 py-1 border-black'>স্বাক্ষর:</h1>
                                                    <h1 className='border px-2 py-1 border-black'>তারিখ:</h1>
                                                </div>

                                            </div>
                                        </React.Fragment>
                                    )
                                ))}
                            </tbody>
                        </table>


                    </div>
                ) : null}
                {!isLoading && searchData && searchData.length === 0 ? (
                    <p>No student found</p>
                ) : null}
            </div>

            <button onClick={handlePrint} className='btn my-4 btn-outline flex justify-center mx-auto'>Print</button>
        </div>
    );
};

export default DownloadedAdmissionFrom;
