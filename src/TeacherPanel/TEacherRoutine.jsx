import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hook/AxiosSecure';

const TeacherRoutine = () => {
    const axiosSecure = useAxiosSecure();
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await axiosSecure.get('/routine');
                setRoutines(response.data);
            } catch (error) {
                console.error('Error fetching the routine data:', error);
            }
        };

        fetchRoutines();
    }, [axiosSecure]);

    const deleteRoutine = async (id) => {
        try {
            await axiosSecure.delete(`/routine/${id}`);
            setRoutines(routines.filter(routine => routine._id !== id));
        } catch (error) {
            console.error('Error deleting the routine:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Class Routine</h1>
            <div className="container mx-auto p-4">

                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Added Date</th>
                            <th className="py-2 px-4">Class</th>
                            <th className="py-2 px-4">Year</th>
                            <th className="py-2 px-4">Link</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routines.map((routine, index) => (
                            <tr key={routine._id} className="border-b">
                                <td className="py-2 px-4">{index+1}</td>
                                <td className="py-2 px-4">{routine.added_date}</td>
                                <td className="py-2 px-4">{routine.class}</td>
                                <td className="py-2 px-4">{routine.year}</td>
                                <td className="py-2 px-4">
                                    {routine.link ? (
                                        <a
                                            href={routine.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            View
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                                        onClick={() => deleteRoutine(routine._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRoutine;
