import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import Swal from "sweetalert2";

const UploadedClassRoutine = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            // Send form data to backend
            const response = await axiosPublic.post('/routine', data);
            if (response.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Routine Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }
        } catch (error) {
            console.error('Error uploading result:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Academic Routine Result PDF</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Date</span>
                        </label>
                        <input type="date" {...register('added_date')} className="input input-bordered w-full" />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class</span>
                        </label>
                        <select {...register("class", { required: true })} name="class" className="select select-bordered" required>
                            <option value="" disabled>Select Class</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        
                    </div>



                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Year</span>
                        </label>
                        <input type="number" {...register('year')} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Uploaded Drive Link</span>
                        </label>
                        <input type="text" {...register('link')} className="input input-bordered w-full" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-full py-3 font-bold text-lg">Submit</button>
            </form>
        </div>
    );
};

export default UploadedClassRoutine;
