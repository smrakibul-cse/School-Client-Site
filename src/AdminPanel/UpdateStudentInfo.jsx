import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateStudentInfo = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();
    const data = useLoaderData();


    const onSubmit = async (formData) => {
        try {
            const response = await fetch(`https://rowmari-c-g-zaman-server.vercel.app/students/${id}`, {
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
                    text: 'Student information updated successfully!'
                });
            }
        } catch (error) {
            console.error("Error updating student information:", error);
        }
    };


    return (
        <div>

            <h1 className="font-bold text-3xl text-center mt-6 mb-6 uppercase">Update Student Information</h1>
            <div className=" lg:w-[600px] mx-auto bg-slate-300">
                <form className="lg:w-[600px] mx-auto bg-slate-300 card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-evenly '>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" defaultValue={data.name} {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Father Name</span>
                                </label>
                                <input defaultValue={data.fName} type="text"  {...register("fName", { required: true })} name="fName" placeholder="Enter Father Name" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mother Name</span>
                                </label>
                                <input defaultValue={data.mName} type="text"  {...register("mName", { required: true })} name="mName" placeholder="Enter Mother Name" className="input input-bordered" />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Roll</span>
                                </label>
                                <input type="number"   {...register("roll", { required: true })} name="roll" placeholder="Enter Class Roll" defaultValue={data.roll} className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select value={data.gender} {...register("gender", { required: true })} name="gender" className="select select-bordered">
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" defaultValue={data?.email}  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select value={data.bloodGroup} {...register("bloodGroup", { required: true })} name="bloodGroup" className="select select-bordered">
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

                            </div>



                        </div>
                        {/* part-2 */}
                        <div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of Barth</span>
                                </label>
                                <input type="date" defaultValue={data.dateOfBirth} {...register("dateOfBirth", { required: true })} name="dateOfBirth" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class</span>
                                </label>
                                <select defaultValue={data.class} {...register("class", { required: true })} name="class" className="select select-bordered">
                                    <option value="" disabled>Select Class</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="Vocational">Vocational</option>
                                </select>

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Section</span>
                                </label>
                                <select defaultValue={data.section} {...register("section", { required: true })} name="section" className="select select-bordered">
                                    <option value="" disabled>Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
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
                                    defaultValue={data.number}

                                />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" defaultValue={data.photoURL}  {...register("photoURL", { required: true })} placeholder="Enter your photo URL" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Shift</span>
                                </label>
                                <select defaultValue={data.shift} {...register("shift", { required: true })} name="shift" className="select select-bordered">
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
                                <input defaultValue={data.address} type="text"  {...register("address", { required: true })} placeholder="Enter your Address" className="input input-bordered" />

                            </div>
                        </div>

                    </div>

                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Update Student Information" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudentInfo;