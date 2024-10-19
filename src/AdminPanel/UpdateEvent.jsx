import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosSecure from "../Hook/AxiosSecure";

const UpdateEvent = () => {
    const event = useLoaderData();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset({
            date: event.date,
            time: event.time,
            head: event.head,
            details: event.details
        });
    }, [event, reset]);

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.put(`/event/${id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "The event has been updated.",
                    icon: "success"
                });
                navigate('/dashboard/showEventAdmin');
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "The event was not updated.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error updating event:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while updating the event.",
                icon: "error"
            });
        }
    };

    return (
        <div className="mx-4">
            <h1 className="text-2xl font-bold text-center my-3">Event Management</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="lg:flex lg:w-[800px] gap-4 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Event Date</span>
                        </label>
                        <input type="date" {...register("date", { required: true })} name="date" className="border p-6 rounded-lg mx-auto lg:w-[390px] w-full flex shadow-md" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Event Time</span>
                        </label>
                        <input type="time" {...register("time", { required: true })} name="time" className="border p-6 rounded-lg lg:w-[390px] w-full mx-auto flex shadow-md" />

                    </div>
                </div>
                <div className="form-control">
                    <input type="text" {...register("head", { required: true })} name="head" placeholder="Write your news Heading" className="border p-6 rounded-lg mt-8 lg:w-[800px] w-full mx-auto flex shadow-md" />
                    {errors.head && <span className="text-red-600">Heading is required</span>}
                </div>
                <textarea
                    {...register('details', { required: true })}
                    className={`border p-6 rounded-lg mt-8 lg:w-[800px] w-full mx-auto flex shadow-md ${errors.details && 'border-red-500'}`}
                    placeholder="Write Event Details"
                    cols="50"
                    rows="7"
                ></textarea>

                <input
                    type="submit"
                    className="border-2 hover:bg-green-400 px-10 uppercase rounded-xl cursor-pointer border-orange-400 py-4 mx-auto flex my-5"
                    value="Update Event"
                />
            </form>
        </div>
    );
};

export default UpdateEvent;
