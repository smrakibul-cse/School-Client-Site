import { useEffect, useState } from "react";
import NavBar from "../Navber/NavBar";
import useAxiosSecure from "../Hook/AxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AdmissionNoticePublic from "./AdmissionNoticePublic";



const AdmissionApply = () => {

    const axiosSecure = useAxiosSecure();
    const [phoneNumber, setPhoneNumber] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState("");

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/admissionApply', data);
            if (res.data.insertedId) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Student Data Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        const fetchAdmissionPeriod = async () => {
            try {
                const response = await fetch("https://rowmari-c-g-zaman-server.vercel.app/admissionOpen");
                const data = await response.json();
                const admissionPeriod = data.find(item => item.startDate && item.endDate);
                if (admissionPeriod) {
                    const { startDate, endDate, startTime, endTime } = admissionPeriod;
                    const now = new Date();
                    const startDateTime = new Date(`${startDate} ${startTime}`);
                    const endDateTime = new Date(`${endDate} ${endTime}`);

                    if (now < startDateTime) {
                        // Admission hasn't started yet
                        setIsAdmissionOpen(false);
                        startCountdown(startDateTime);
                    } else if (now >= startDateTime && now <= endDateTime) {
                        // Admission is ongoing
                        setIsAdmissionOpen(true);
                        startCountdown(endDateTime);

                        // Automatically reload the page when admission opens
                        const admissionOpenTimeLeft = endDateTime - now;
                        setTimeout(() => window.location.reload(), admissionOpenTimeLeft);
                    } else {
                        // Admission has ended
                        setIsAdmissionOpen(false);
                        setTimeRemaining("Admission period has ended.");
                    }
                }
            } catch (error) {
                console.error("Error fetching admission period:", error);
            }
        };

        const startCountdown = (endDateTime) => {
            const update = () => {
                const now = new Date();
                const timeLeft = endDateTime - now;

                if (timeLeft > 0) {
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                    setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                } else {
                    setIsAdmissionOpen(true); // Admission is open
                    setTimeRemaining("Admission is open."); // Display admission open message
                    clearInterval(intervalId);
                }
            };

            update();
            const intervalId = setInterval(update, 1000);
            return () => clearInterval(intervalId);
        };

        fetchAdmissionPeriod();
    }, []);


    const handlePhoneNumberChange = (e) => {
        // Limit input to 11 characters
        const inputPhoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setPhoneNumber(inputPhoneNumber.slice(0, 11)); // Keep only the first 11 characters
    };

    return (
        <div>
            <div className="relative z-10">
                <NavBar></NavBar>
            </div>
            <div className="bg-[#1B1A55] py-5">

                <div>
                    <AdmissionNoticePublic></AdmissionNoticePublic>
                </div>


                <div className="flex justify-center mt-4">
                    <p className="text-white text-lg bg-[#27497022] p-4 border rounded-lg mb-4">Time remaining: {timeRemaining}</p>
                </div>
                {!isAdmissionOpen && <p className="text-xl text-white text-center py-28">Admission process has not started yet.</p>}
                {isAdmissionOpen && (
                    <div>
                        <h1 className="font-bold text-2xl text-center uppercase text-white py-2">School Admission Form</h1>

                        <div className=" lg:w-[900px] mx-auto border rounded-lg">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-2  '>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">জন্ম নিবন্ধন নং</span>
                                        </label>
                                        <input type="number"  {...register("nibondon", { required: true })} name="nibondon" placeholder="জন্ম নিবন্ধন নং" className="input input-bordered" />
                                        {errors.nibondon && <span className="text-red-600">Name is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">জন্ম তারিখ</span>
                                        </label>
                                        <input type="date" {...register("dateOfBirth", { required: true })} name="dateOfBirth" className="input input-bordered" />
                                        {errors.dateOfBirth && <span className="text-red-600">Date of birth is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">শিক্ষার্থীর নাম (বাংলায়)</span>
                                        </label>
                                        <input type="text"  {...register("NameBangla", { required: true })} name="NameBangla" placeholder="শিক্ষার্থীর নাম" className="input input-bordered" />
                                        {errors.NameBangla && <span className="text-red-600">Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">শিক্ষার্থীর নাম (ইংরেজি)</span>
                                        </label>
                                        <input type="text"  {...register("NameEnglish", { required: true })} name="NameEnglish" placeholder="শিক্ষার্থীর নাম" className="input input-bordered" />
                                        {errors.NameEnglish && <span className="text-red-600">Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">পিতার নাম (বাংলায়)</span>
                                        </label>
                                        <input type="text"  {...register("FNameBangla", { required: true })} name="FNameBangla" placeholder="পিতার নাম (বাংলায়)" className="input input-bordered" />
                                        {errors.FNameBangla && <span className="text-red-600">Father Name is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">পিতার নাম (ইংরেজি)</span>
                                        </label>
                                        <input type="text"  {...register("FNameEnglish", { required: true })} name="FNameEnglish" placeholder="পিতার নাম (ইংরেজি)" className="input input-bordered" />
                                        {errors.FNameEnglish && <span className="text-red-600">Father Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">পিতার এনআইডি নম্বর</span>
                                        </label>
                                        <input type="Number"  {...register("FNid", { required: true })} name="FNid" placeholder="পিতার এনআইডি নম্বর" className="input input-bordered" />
                                        {errors.FNameBangla && <span className="text-red-600">Father Name is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">মাতার নাম (বাংলায়)</span>
                                        </label>
                                        <input type="text"  {...register("mNameBangla", { required: true })} name="mNameBangla" placeholder="মাতার নাম (বাংলায়)" className="input input-bordered" />
                                        {errors.mNameBangla && <span className="text-red-600">Mother Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">মাতার নাম (ইংরেজি)</span>
                                        </label>
                                        <input type="text"  {...register("mNameEnglish", { required: true })} name="mNameEnglish" placeholder="মাতার নাম (ইংরেজি)" className="input input-bordered" />
                                        {errors.mNameBangla && <span className="text-red-600">Mother Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">মাতার এনআইডি নম্বর</span>
                                        </label>
                                        <input type="Number"  {...register("MNid", { required: true })} name="MNid" placeholder="মাতার এনআইডি নম্বর" className="input input-bordered" />
                                        {errors.MNid && <span className="text-red-600">Father Name is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">শিক্ষাবর্ষ</span>
                                        </label>
                                        <select {...register("শিক্ষাবর্ষ", { required: true })} name="শিক্ষাবর্ষ" className="select select-bordered">
                                            <option value="" disabled>শিক্ষাবর্ষ</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                        </select>
                                        {errors.শিক্ষাবর্ষ && <span className="text-red-600">শিক্ষাবর্ষ is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">প্রতিবন্ধিতা</span>
                                        </label>
                                        <select {...register("প্রতিবন্ধিতা", { required: true })} name="প্রতিবন্ধিতা" className="select select-bordered">
                                            <option value="" disabled>প্রতিবন্ধিতা</option>
                                            <option value="সমস্যা-নেই">সমস্যা-নেই</option>
                                            <option value="বাক-প্রতিবন্ধি">বাক-প্রতিবন্ধি</option>
                                            <option value="শ্রবন-প্রতিবন্ধি">শ্রবন-প্রতিবন্ধি</option>
                                            <option value="শারীরিক-প্রতিবন্ধি">শারীরিক-প্রতিবন্ধি</option>
                                            <option value="মানসিক-প্রতিবন্ধি">মানসিক-প্রতিবন্ধিি</option>
                                        </select>
                                        {errors.প্রতিবন্ধিতা && <span className="text-red-600">প্রতিবন্ধিতা is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">রক্তের গ্রুপ</span>
                                        </label>
                                        <select {...register("bloodGroup", { required: true })} name="bloodGroup" className="select select-bordered">
                                            <option value="" disabled>রক্তের গ্রুপ</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="O-">AB+</option>
                                            <option value="O-">AB-</option>

                                        </select>
                                        {errors.bloodGroup && <span className="text-red-600">Blood group is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">জন্মস্থান</span>
                                        </label>
                                        <input type="text"  {...register("জন্মস্থান", { required: true })} name="জন্মস্থান" placeholder="জন্মস্থান" className="input input-bordered" />
                                        {errors.জন্মস্থান && <span className="text-red-600">জন্মস্থান is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">ধর্ম </span>
                                        </label>
                                        <select {...register("ধর্ম", { required: true })} name="ধর্ম" className="select select-bordered">
                                            <option value="" disabled>ধর্ম</option>
                                            <option value="ইসলাম">ইসলাম</option>
                                            <option value="হিন্দু">হিন্দু</option>
                                            <option value="বৌদ্ধ">বৌদ্ধ</option>
                                            <option value="খ্রীস্টান">খ্রীস্টান</option>
                                            <option value="প্রকাশ করতে ইচ্ছুক নয়">প্রকাশ করতে ইচ্ছুক নয়</option>

                                        </select>
                                        {errors.ধর্ম && <span className="text-red-600">ধর্ম is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">Gender</span>
                                        </label>
                                        <select {...register("gender", { required: true })} name="gender" className="select select-bordered">
                                            <option value="" disabled>জেন্ডার</option>
                                            <option value="ছেলে">ছেলে</option>
                                            <option value="মেয়ে">মেয়ে</option>
                                            <option value="others">Others</option>
                                        </select>
                                        {errors.gender && <span className="text-red-600">Gender is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">Email</span>
                                        </label>
                                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">Primary School name</span>
                                        </label>
                                        <input type="text"  {...register("primary", { required: true })} placeholder="Enter your primary school name" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">Phone Number</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("number", {
                                                required: true,
                                                pattern: /^[0-9]{11}$/ // Ensure phone number is exactly 11 digits long
                                            })}
                                            name="number"
                                            placeholder="Enter your phone number"
                                            className="input input-bordered"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                        />
                                        {errors.number && <span className="text-red-600"> Phone number is required and must be 11 digits</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">Photo URL</span>
                                        </label>
                                        <input type="text"  {...register("photoURL", { required: true })} placeholder="Enter your photo URL" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">Select Shift</span>
                                        </label>
                                        <select {...register("shift", { required: true })} name="shift" className="select select-bordered">
                                            <option value="" disabled>Select Shift</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Day">Day</option>

                                        </select>
                                        {errors.bloodGroup && <span className="text-red-600">Class is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">বিভাগ</span>
                                        </label>
                                        <input type="text"  {...register("বিভাগ", { required: true })} placeholder="বিভাগ" className="input input-bordered" />
                                        {errors.photoURL && <span className="text-red-600"> বিভাগis required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">জেলা</span>
                                        </label>
                                        <input type="text"  {...register("জেলা", { required: true })} placeholder="জেলা" className="input input-bordered" />
                                        {errors.photoURL && <span className="text-red-600"> জেলা is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">উপজেলা</span>
                                        </label>
                                        <input type="text"  {...register("উপজেলা", { required: true })} placeholder="উপজেলা" className="input input-bordered" />
                                        {errors.photoURL && <span className="text-red-600"> উপজেলা is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">ইউনিয়ন</span>
                                        </label>
                                        <input type="text"  {...register("ইউনিয়ন", { required: true })} placeholder="ইউনিয়ন" className="input input-bordered" />
                                        {errors.ইউনিয়ন && <span className="text-red-600"> ইউনিয়ন is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">গ্রাম</span>
                                        </label>
                                        <input type="text"  {...register("গ্রাম", { required: true })} placeholder="গ্রাম" className="input input-bordered" />
                                        {errors.গ্রাম && <span className="text-red-600"> গ্রাম is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">ডাকঘর</span>
                                        </label>
                                        <input type="text"  {...register("ডাকঘর", { required: true })} placeholder="ডাকঘর" className="input input-bordered" />
                                        {errors.ডাকঘর && <span className="text-red-600"> ডাকঘর is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white">ডাকঘর কোড</span>
                                        </label>
                                        <input type="text"  {...register("কোড", { required: true })} placeholder="ডাকঘর-কোড" className="input input-bordered" />
                                        {errors.কোড && <span className="text-red-600"> ডাকঘর কোড is required</span>}
                                    </div>


                                </div>

                                <div className="form-control mt-6">
                                    <input className="border rounded-lg p-2 uppercase text-white cursor-pointer hover:bg-gray-600" type="submit" value="Send Application" />
                                </div>
                            </form>
                        </div>
                        <div className="flex mx-auto justify-center mt-4">
                            <Link to={'/fromDownload'} className="border rounded-lg p-2 uppercase text-white cursor-pointer hover:bg-gray-600">Download From</Link>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default AdmissionApply;