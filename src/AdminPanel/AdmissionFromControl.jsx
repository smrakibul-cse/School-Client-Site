import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hook/AxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdmissionFromControl = () => {

    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/admissionOpen', data);
            if (res.data.insertedId) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Admission form open this time',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-[#5586c622] md:h-[100vh] h-full">
            <h1 className="text-xl font-bold text-center py-2">Admission Form Control</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="border md:w-[720px] w-full border-black mx-auto py-4 rounded-lg shadow-lg px-2">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:w-[700px] w-full mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Start Date</span>
                            </label>
                            <input type="date"  {...register("startDate", { required: true })} name="startDate" placeholder="Name" className="input input-bordered" />
                            {errors.startDate && <span className="text-red-600">Start-date is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Start Time</span>
                            </label>
                            <input type="time"  {...register("startTime", { required: true })} name="startTime" placeholder="Name" className="input input-bordered" />
                            {errors.startTime && <span className="text-red-600">Start Time is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">End Date</span>
                            </label>
                            <input type="date"  {...register("endDate", { required: true })} name="endDate" placeholder="Name" className="input input-bordered" />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">End Time</span>
                            </label>
                            <input type="time"  {...register("endTime", { required: true })} name="endTime" placeholder="Name" className="input input-bordered" />
                            {errors.endTime && <span className="text-red-600">Start Time is required</span>}
                        </div>


                    </div>
                    <input className="border px-6 py-1 border-black rounded-lg hover:bg-black hover:text-white cursor-pointer flex justify-center mx-auto uppercase mt-7" type="submit" value="Submit" />
                </div>
            </form>

            <Link to={'/dashboard/admissionShow'}>
                <button className="text-red-400 link-hover flex justify-center mx-auto py-6">Go Back To Admission Home Page</button>
            </Link>
        </div>
    );
};

export default AdmissionFromControl;