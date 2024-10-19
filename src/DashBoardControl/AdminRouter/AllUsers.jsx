import './user.css'
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/AxiosSecure";



const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Select Role",
            html: `
                <select id="role" class="swal2-input">
                    <option value="admin">Admin</option>
                    <option value="teacher">teacher</option>
                    <option value="student">student</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: "Set Role",
            preConfirm: () => {
                const selectedRole = document.getElementById('role').value;
                return selectedRole;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRole = result.value;
                if (selectedRole) {
                    axiosSecure.patch(`/users/role/${user._id}`, { role: selectedRole })
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name} is now a ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}!`,
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            }
                        })
                        .catch((error) => {
                            console.error("Error updating user role:", error);
                        });
                }
            }
        });
    };


    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {

                        refetch();
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                    });
            }
        });
    };

    return (
        <div className='py-8 overflow-x-auto'>
            <div className="flex justify-evenly ">
                <h1 className="animate-charcter font-bold">Total User: {users.length}</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra mx-auto lg:w-[900px] md:w-[600px] w-[300px]">
                    {/* head */}
                    <thead>
                        <tr className='border text-black'>
                            <th className='border text-center font-bold'>ID</th>
                            <th className='border text-center font-bold'>Name</th>
                            <th className='border text-center font-bold'>Email</th>
                            <th className='border text-center font-bold'>Role</th>
                            <th className='border text-center font-bold'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => <tr
                                key={user._id}>

                                <th className='border text-center'>{index + 1}</th>
                                <td className='border text-center'>{user.name}</td>
                                <td className='border text-center'>{user.email}</td>
                                <td className='border text-center'>
                                    {user.role === "user" ? <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn bg-orange-400 btn-xl text-red-500">
                                        <p>Select one</p>
                                    </button> : <p>{user.role}</p>}
                                </td>
                                <td className='border text-center'>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="button-85">
                                        <p>Delete</p>
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AllUsers;