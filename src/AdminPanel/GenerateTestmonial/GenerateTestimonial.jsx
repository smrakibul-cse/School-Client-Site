import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/AxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const GenerateTestimonial = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // Get current date and time
        const currentDate = new Date();
        const dateTime = currentDate.toLocaleString();

        // Generate random serial number
        const serial = Math.floor(Math.random() * 100000) + 1;

        // Add date, time, and serial number to the submitted data
        data.dateTime = dateTime;
        data.serial = serial;

        try {
            const res = await axiosSecure.post('/testimonial', data);
            if (res.data.insertedId) {
                console.log('Testimonial added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Testimonial added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="min-h-screen bg-purple-400 py-12">

            <button className="border-2 border-black px-4 py-2 font-bold rounded-lg hover:bg-black hover:text-white transition-all duration-300 flex justify-center mx-auto mb-8">
                <Link to="/dashBoard/viewTestimonial">View Testimonial</Link>
            </button>
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Generate Testimonial</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Passing Year</span>
                            </label>
                            <input type="number" {...register("year", { required: true })} className="input input-bordered w-full" placeholder="Input year" />
                            {errors.year && <span className="text-red-600">GPA is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Registration No.</span>
                            </label>
                            <input type="number" {...register("registration", { required: true })} className="input input-bordered w-full" placeholder="Registration No." />
                            {errors.registration && <span className="text-red-600">Registration No is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Session</span>
                            </label>
                            <input type="text" {...register("session", { required: true })} className="input input-bordered w-full" placeholder="Session" />
                            {errors.session && <span className="text-red-600">Session is required</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" {...register("date", { required: true })} className="input input-bordered w-full" placeholder="Date" />
                            {errors.date && <span className="text-red-600">Date is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Student Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} className="input input-bordered w-full" placeholder="Student Name" />
                            {errors.name && <span className="text-red-600">Student Name is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Father Name</span>
                            </label>
                            <input type="text" {...register("fname", { required: true })} className="input input-bordered w-full" placeholder="Father Name" />
                            {errors.fname && <span className="text-red-600">Father Name is required</span>}
                        </div>

                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mother Name</span>
                            </label>
                            <input type="text" {...register("mname", { required: true })} className="input input-bordered w-full" placeholder="Mother Name" />
                            {errors.mname && <span className="text-red-600">Mother Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">SSC Roll</span>
                            </label>
                            <input type="number" {...register("sscRoll", { required: true })} className="input input-bordered w-full" placeholder="SSC Roll" />
                            {errors.sscRoll && <span className="text-red-600">SSC Roll is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Group</span>
                            </label>
                            <select {...register("group", { required: true })} className="select select-bordered w-full">
                                <option value="" disabled>Select group</option>
                                <option value="Science">Science</option>
                                <option value="Arts">Arts</option>
                                <option value="Commerce">Commerce</option>
                            </select>
                            {errors.group && <span className="text-red-600">Group is required</span>}
                        </div>
                    </div>
                    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">GPA</span>
                            </label>
                            <input type="number" {...register("gpa", { required: true })} className="input input-bordered w-full" placeholder="GPA" />
                            {errors.gpa && <span className="text-red-600">GPA is required</span>}
                        </div>

                    </div>
                    <div className="flex justify-center">
                        <input type="submit" className="btn btn-primary w-full sm:w-auto" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenerateTestimonial;
