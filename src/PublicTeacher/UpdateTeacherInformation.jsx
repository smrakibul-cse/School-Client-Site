import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import './head.css'



const UpdateTeacherInformation = () => {
    const data = useLoaderData();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();


    const onSubmit = async (formData) => {
        try {
            const response = await fetch(`https://rowmari-c-g-zaman-server.vercel.app/generalTeacher/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Teacher information updated successfully!'
                });
                reset();
                navigate('/dashboard/registerInfo');
            }
        } catch (error) {
            console.error("Error updating teacher information:", error);
        }
    };




    return (
        <div>
            <div >
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="border lg:w-[1000px] w-full mx-auto px-3 py-2 rounded-lg  bg3">

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-8 ">

                            {/* row-1 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Teacher Name</span>
                                </label>
                                <input type="text" defaultValue={data?.name} {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Designation</span>
                                </label>
                                <input type="text" defaultValue={data?.Designation}  {...register("Designation", { required: true })}

                                    name="Designation" placeholder="Designation" className="input input-bordered" />
                                {errors.Designation && <span className="text-red-600">Designation is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Father Name</span>
                                </label>
                                <input type="text" defaultValue={data?.Father}  {...register("Father", { required: true })} name="Father" placeholder="Father Name" className="input input-bordered" />
                                {errors.Father && <span className="text-red-600">Father Name is required</span>}
                            </div>


                            {/* row-2 */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Mother Name</span>
                                </label>
                                <input type="text" defaultValue={data?.Mother} {...register("Mother", { required: true })} name="Mother" placeholder="Mother Name" className="input input-bordered" />
                                {errors.Mother && <span className="text-red-600">Mother Name is required</span>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Spouse Name</span>
                                </label>
                                <input type="text" defaultValue={data?.Spouse}  {...register("Spouse", { required: true })} name="Spouse" placeholder="Spouse Name" className="input input-bordered" />
                                {errors.Spouse && <span className="text-red-600">Spouse Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Date of Birth</span>
                                </label>
                                <input type="date" defaultValue={data?.Birth}  {...register("Birth", { required: true })} name="Birth" placeholder="Date of Birth" className="input input-bordered" />
                                {errors.Birth && <span className="text-red-600">Date of Birth is required</span>}
                            </div>

                            {/* row-3 */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Gadget Serial No</span>
                                </label>
                                <input type="text" defaultValue={data?.Gadget}  {...register("Gadget", { required: true })} name="Gadget" placeholder="Gadget Serial No" className="input input-bordered" />
                                {errors.Gadget && <span className="text-red-600">Gadget Serial No is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Religion</span>
                                </label>
                                <select defaultValue={data?.Religion} {...register("Religion", { required: true })} name="Religion" className="select select-bordered">
                                    <option>Select Religion</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Hinduism">Hinduism</option>
                                    <option value="Buddhism">Buddhism</option>
                                </select>
                                {errors.Religion && <span className="text-red-600">Religion is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Blood Group</span>
                                </label>
                                <select defaultValue={data?.bloodGroup} {...register("bloodGroup", { required: true })} name="bloodGroup" className="select select-bordered">
                                    <option>Select a blood group</option>
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

                            {/* row-4 */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Gender</span>
                                </label>
                                <select defaultValue={data?.gender} {...register("gender", { required: true })} name="gender" className="select select-bordered">
                                    <option>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                                {errors.gender && <span className="text-red-600">Gender is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Marital Status</span>
                                </label>
                                <select defaultValue={data?.Marital} {...register("Marital", { required: true })} name="Marital" className="select select-bordered">
                                    <option>Select Marital Status</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                </select>
                                {errors.Marital && <span className="text-red-600"> Marital Status is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Shift</span>
                                </label>
                                <select defaultValue={data?.Shift} {...register("Shift", { required: true })} name="Shift" className="select select-bordered">
                                    <option>Select Shift</option>
                                    <option value="Morning">Morning</option>
                                    <option value="Day">Day</option>
                                </select>
                                {errors.Shift && <span className="text-red-600"> Shift is required</span>}
                            </div>

                            {/* row-5 */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Picture</span>
                                </label>
                                <input type="text" defaultValue={data?.Picture}  {...register("Picture", { required: true })} name="Picture" placeholder="Please Picture Link" className="input input-bordered" />
                                {errors.Picture && <span className="text-red-600">Picture is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Qualification</span>
                                </label>
                                <input type="text" defaultValue={data?.Qualification}  {...register("Qualification", { required: true })} name="Qualification" placeholder="Qualification" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Qualification is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Teaching Subject</span>
                                </label>
                                <input type="text" defaultValue={data?.Teaching}  {...register("Teaching", { required: true })} name="Teaching" placeholder="Teaching Subject" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Teaching Subject is required</span>}
                            </div>

                            {/* row-6 */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Email</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("Email", { required: true })}
                                    name="Email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    defaultValue={data?.Email} // Set defaultValue to user's email
                                    readOnly // Make the email field read-only
                                />
                                {errors.Email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">First Join Date</span>
                                </label>
                                <input type="date" defaultValue={data?.Join} {...register("Join", { required: true })} name="Join" placeholder="Name" className="input input-bordered" />
                                {errors.Join && <span className="text-red-600">First Join Date is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Present Address</span>
                                </label>
                                <input type="text" defaultValue={data?.Present}  {...register("Present", { required: true })} name="Present" placeholder="Present Address" className="input input-bordered" />
                                {errors.Present && <span className="text-red-600">Present Address is required</span>}
                            </div>

                            {/* row-7 */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Permanent Address</span>
                                </label>
                                <input type="text" defaultValue={data?.Permanent}  {...register("Permanent", { required: true })} name="Permanent" placeholder="Permanent Address" className="input input-bordered" />
                                {errors.Permanent && <span className="text-red-600">Permanent Address is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold text-[16px]">Phone Number</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={data?.number}
                                    {...register("number", {
                                        required: true,
                                        pattern: /^[0-9]{11}$/ // Ensure phone number is exactly 11 digits long
                                    })}
                                    name="number"
                                    placeholder="Enter your phone number"
                                    className="input input-bordered"


                                />
                                {errors.number && <span className="text-red-600"> Phone number is required and must be 11 digits</span>}
                            </div>

                        </div>
                        <div className="border my-3 text-center py-1 rounded-lg hover:bg-gray-400 cursor-pointer">
                            <input className="uppercase text-white font-bold " type="submit" value="Update Teacher Information" />
                        </div>
                    </div>



                </form>
            </div>
        </div>
    );
};

export default UpdateTeacherInformation;