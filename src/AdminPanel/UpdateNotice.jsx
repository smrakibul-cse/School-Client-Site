import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateNotice = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();
    const data = useLoaderData();


    const onSubmit = async (formData) => {
        try {
            const response = await fetch(`https://rowmari-c-g-zaman-server.vercel.app/news/${id}`, {
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
                    text: 'News information updated successfully!'
                });
            }
        } catch (error) {
            console.error("Error updating student information:", error);
        }
    };


    return (
        <div>
            <h1 className="md:text-2xl lg:text-3xl uppercase font-bold mt-6 text-center">Update News Information</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Notice Head</span>
                        </label>
                        <input type="text" defaultValue={data.head}  {...register("head", { required: true })} name="head" placeholder="Write your news Heading" className="input input-bordered border-lime-400" />

                    </div>
                    <textarea
                        {...register('news', { required: true })}
                        className={`border p-6 rounded-lg mt-8 border-lime-400 w-full shadow-md ${errors.news && 'border-red-500'}`}
                        placeholder="Write News"
                        cols="50"
                        rows="7"
                        defaultValue={data.news}
                    ></textarea>

                    <input
                        type="submit"
                        className="border-2 hover:bg-green-400 px-10 uppercase rounded-xl cursor-pointer border-orange-400 py-2 mx-auto flex mt-4"
                        value="Update News"
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateNotice;