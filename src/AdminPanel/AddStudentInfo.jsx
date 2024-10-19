import { useForm } from 'react-hook-form';
import './admin.css';
import useAxiosSecure from '../Hook/AxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';


const AddStudentInfo = () => {
    const axiosSecure = useAxiosSecure();
    const [phoneNumber, setPhoneNumber] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/students', data);
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


    const handlePhoneNumberChange = (e) => {
        // Limit input to 11 characters
        const inputPhoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setPhoneNumber(inputPhoneNumber.slice(0, 11)); // Keep only the first 11 characters
    };

    return (
        <div className=' bg-[#0d758f] py-4'>
            <h3 className='text-xl text-center py-2 lg:w-[600px] border mx-auto mt-2 rounded-lg bg-[#1a566b] text-white uppercase my-2'>Added Student Information</h3>
            <div className=" lg:w-[600px]  mx-auto bg-[#39c2cc] border rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className='lg:flex gap-8 mx-auto '>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered " />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Father Name</span>
                                </label>
                                <input type="text"  {...register("fName", { required: true })} name="fName" placeholder="Enter Father Name" className="input input-bordered" />
                                {errors.fName && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mother Name</span>
                                </label>
                                <input type="text"  {...register("mName", { required: true })} name="mName" placeholder="Enter Mother Name" className="input input-bordered" />
                                {errors.mName && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Roll</span>
                                </label>
                                <input type="number"  {...register("roll", { required: true })} name="roll" placeholder="Enter Class Roll" className="input input-bordered" />
                                {errors.roll && <span className="text-red-600">Roll is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select {...register("gender", { required: true })} name="gender" className="select select-bordered">
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                                {errors.gender && <span className="text-red-600">Gender is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select {...register("bloodGroup", { required: true })} name="bloodGroup" className="select select-bordered">
                                    <option value="" disabled>Select a blood group</option>
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

                        </div>
                        {/* part-2 */}
                        <div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of Barth</span>
                                </label>
                                <input type="date" {...register("dateOfBirth", { required: true })} name="dateOfBirth" className="input input-bordered" />
                                {errors.dateOfBirth && <span className="text-red-600">Date of birth is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class</span>
                                </label>
                                <select {...register("class", { required: true })} name="class" className="select select-bordered">
                                    <option value="" disabled>Select Class</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                {errors.bloodGroup && <span className="text-red-600">Class is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Section</span>
                                </label>
                                <select {...register("section", { required: true })} name="section" className="select select-bordered">
                                    <option value="" disabled>Select Section</option>
                                    <option value="A">A</option>
                                    <option value="A">B</option>
                                    <option value="B">C</option>
                                </select>
                                {errors.bloodGroup && <span className="text-red-600">Section is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
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
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Enter your photo URL" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Shift</span>
                                </label>
                                <select {...register("shift", { required: true })} name="shift" className="select select-bordered">
                                    <option value="" disabled>Select Shift</option>
                                    <option value="Morning">Morning</option>
                                    <option value="Day">Day</option>

                                </select>
                                {errors.bloodGroup && <span className="text-red-600">Class is required</span>}
                            </div>

                            <div className="form-control mx-auto">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text"  {...register("address", { required: true })} placeholder="Enter your Address" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600"> Address is required</span>}
                            </div>
                        </div>



                    </div>

                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Add Information" />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddStudentInfo;