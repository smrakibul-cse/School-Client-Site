import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/AxiosSecure';

const AdminNews = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // Get current date and time
        const currentDate = new Date();
        const dateTime = currentDate.toLocaleString();

        // Add date and time to the submitted data
        data.dateTime = dateTime;

        try {
            const res = await axiosSecure.post('/News', data);
            if (res.data.insertedId) {
                console.log('News added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'News Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="md:text-2xl lg:text-3xl uppercase font-bold mt-6 text-center">Uploaded New News</h1>
            <div className='px-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Notice Head</span>
                        </label>
                        <input type="text"  {...register("head", { required: true })} name="head" placeholder="Write your news Heading" className="input input-bordered  " />
                        {errors.head && <span className="text-red-600">Heading is required</span>}
                    </div>
                    <textarea
                        {...register('news', { required: true })}
                        className={`border p-6 rounded-lg mt-8  w-full shadow-md ${errors.news && 'border-red-500'}`}
                        placeholder="Write News"
                        cols="50"
                        rows="7"
                    ></textarea>
                    {errors.news && <span className="text-red-500">News is required</span>}
                    <input
                        type="submit"
                        className="border hover:bg-green-400 px-10 uppercase rounded-xl cursor-pointer border-black py-4 mx-auto flex mt-4"
                        value="Submit News"
                    />
                </form>
            </div>
        </div>
    );
};

export default AdminNews;
