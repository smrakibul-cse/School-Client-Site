import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../Hook/UseAxiosPublic';
import Swal from 'sweetalert2';

const UploadResult = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            // Send form data to backend
            const response = await axiosPublic.post('/sscResult', data);
            if (response.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'SSC Data Added Successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            reset();
        } catch (error) {
            console.error('Error uploading result:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Upload SSC Result PDF</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Date</span>
                            </label>
                            <input type="date" {...register('added_date')} className="input input-bordered w-full border-gray-300" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Description</span>
                            </label>
                            <input type="text" {...register('description')} className="input input-bordered w-full border-gray-300" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Year</span>
                            </label>
                            <input type="number" {...register('year')} className="input input-bordered w-full border-gray-300" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Uploaded Drive Link</span>
                            </label>
                            <input type="text" {...register('link')} className="input input-bordered w-full border-gray-300" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-8 bg-purple-600 text-white hover:bg-purple-700 py-2 rounded-lg">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadResult;
