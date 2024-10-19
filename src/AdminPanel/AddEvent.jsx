import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hook/AxiosSecure";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const AddEvent = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/postEvent', data);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Event added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 flex items-center justify-center py-10">
            <div>
                <button className="border-2 border-black px-4 py-2 font-bold rounded-lg hover:bg-black hover:text-white transition-all duration-300 flex justify-center mx-auto mb-4">
                    <Link to="/dashBoard/showEventAdmin">Show All Event</Link>
                </button>
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full mx-4">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Event Management</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="lg:flex lg:gap-4 mb-6">
                            <div className="form-control lg:w-1/2">
                                <label className="label text-gray-700 font-semibold">
                                    <span>Select Event Date</span>
                                </label>
                                <input
                                    type="date"
                                    {...register("date", { required: true })}
                                    className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {errors.date && <span className="text-red-600">Date is required</span>}
                            </div>
                            <div className="form-control lg:w-1/2 mt-4 lg:mt-0">
                                <label className="label text-gray-700 font-semibold">
                                    <span>Select Event Time</span>
                                </label>
                                <input
                                    type="time"
                                    {...register("time", { required: true })}
                                    className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {errors.time && <span className="text-red-600">Time is required</span>}
                            </div>
                        </div>
                        <div className="form-control mb-6">
                            <label className="label text-gray-700 font-semibold">
                                <span>Event Heading</span>
                            </label>
                            <input
                                type="text"
                                {...register("head", { required: true })}
                                placeholder="Write your event heading"
                                className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.head && <span className="text-red-600">Heading is required</span>}
                        </div>
                        <div className="form-control mb-6">
                            <label className="label text-gray-700 font-semibold">
                                <span>Event Details</span>
                            </label>
                            <textarea
                                {...register('details', { required: true })}
                                className={`border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.details && 'border-red-500'}`}
                                placeholder="Write event details"
                                rows="6"
                            ></textarea>
                            {errors.details && <span className="text-red-600">Details are required</span>}
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg cursor-pointer shadow-lg"
                                value="Submit Event"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
