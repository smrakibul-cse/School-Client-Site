import React, { useState, useEffect } from 'react';
import useAxiosSecure from "../Hook/AxiosSecure";
import { Link, NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const ShowAdmitCard = () => {
    const axiosSecure = useAxiosSecure();
    const [AdmitPublic, setAdmitPublished] = useState(false);
    const [admitData, setAdmitData] = useState(false);


    useEffect((refetch) => {
        const checkAdmitPublished = async () => {
            try {
                const response = await axiosSecure.get("/Admit/publish");
                setAdmitData(response.data.length > 0);
                refetch();
            } catch (error) {
                console.error("Error checking published results:", error);
            }
        };

        checkAdmitPublished();
    }, [axiosSecure]);




    const { data: admitCardsClass6 = [], refetch: refetchClass6 } = useQuery({
        queryKey: ['admitCardsClass6'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '6');
        }
    });

    const { data: admitCardsClass7 = [], refetch: refetchClass7 } = useQuery({
        queryKey: ['admitCardsClass7'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '7');
        }
    });

    const { data: admitCardsClass8 = [], refetch: refetchClass8 } = useQuery({
        queryKey: ['admitCardsClass8'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '8');
        }
    });

    const { data: admitCardsClass9 = [], refetch: refetchClass9 } = useQuery({
        queryKey: ['admitCardsClass9'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '9');
        }
    });

    const { data: admitCardsClass10 = [], refetch: refetchClass10 } = useQuery({
        queryKey: ['admitCardsClass10'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '10');
        }
    });

    const handleDeleteAdmitCard = (admitCardId, refetch) => {
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
                axiosSecure.delete(`/admitPost/${admitCardId}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "The admit card has been deleted.",
                            icon: "success"
                        });


                    })
                    .catch((error) => {
                        console.error("Error deleting admit card:", error);
                    });
            }
        });
    };

    const handlePublishAdmitCards = () => {
        axiosSecure.post('/Admit/publish')
            .then(res => {
                console.log(res.data);
                setAdmitPublished(true);
                Swal.fire({
                    title: "Published!",
                    text: "Admit cards have been published.",
                    icon: "success"
                });
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error publishing admit cards:", error);
            });
    };

    const handleDoubleClickPublishButton = () => {
        Swal.fire({
            title: "Results Already Published!",
            text: "Results have already been published.",
            icon: "warning"
        });

    };


    const renderTable = (admitCards, refetch) => (
        <div>

            <div className='mx-8 container'>
                <table className="table-auto mx-auto ">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Class</th>
                            <th className="px-4 py-2 border">Exam</th>
                            <th className="px-4 py-2 border">Shift</th>
                            <th className="px-4 py-2 border">Subject</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Day of Week</th>
                            <th className="px-4 py-2 border">Exam Time</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admitCards.map((admitCard, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{admitCard.class}</td>
                                <td className="border px-4 py-2">{admitCard.exam}</td>
                                <td className="border px-4 py-2">{admitCard.shift}</td>
                                <td className="border px-4 py-2">{admitCard.subject}</td>
                                <td className="border px-4 py-2">{admitCard.date}</td>
                                <td className="border px-4 py-2">{admitCard.dayOfWeek}</td>
                                <td className="border px-4 py-2">{admitCard.exam_time}</td>
                                <td className="border text-center">
                                    <NavLink to={`updateAdmit/${admitCard?._id}`}>
                                        <button className="text-xl">
                                            <FaEdit></FaEdit>
                                        </button>
                                    </NavLink>
                                    <button className="text-xl text-red-500 ml-2" onClick={() => handleDeleteAdmitCard(admitCard?._id, refetch)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div>

            <div className="flex gap-3 mt-6 justify-center items-center">
                <button
                    className={`border px-10 py-3 rounded-lg hover:bg-black hover:text-white uppercase font-bold ${admitData ? "cursor-not-allowed" : ""}`}
                    onClick={admitData ? handleDoubleClickPublishButton : handlePublishAdmitCards}
                    disabled={admitData}
                >
                    Publish Admit Cards
                </button>

                <div className='flex justify-center cursor-pointer '>
                    <button className='border px-10 py-3 rounded-lg hover:bg-black hover:text-white uppercase font-bold'><Link to={"/dashBoard/publicAdmit"}>See Public Admit</Link></button>
                </div>
            </div>
            <div className='mb-6'>

                <h1 className="font-bold text-center">Admit Cards</h1>
                <div className="mt-4">
                    <h2 className="font-bold text-center w-48 mx-auto border px-4 py-4 rounded-lg bg-slate-100 ">Class 6</h2>
                    {renderTable(admitCardsClass6, refetchClass6)}
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-center w-48 mx-auto border px-4 py-4 rounded-lg bg-slate-100 ">Class 7</h2>
                    {renderTable(admitCardsClass7, refetchClass7)}
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-center w-48 mx-auto border px-4 py-4 rounded-lg bg-slate-100 ">Class 8</h2>
                    {renderTable(admitCardsClass8, refetchClass8)}
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-center w-48 mx-auto border px-4 py-4 rounded-lg bg-slate-100 ">Class 9</h2>
                    {renderTable(admitCardsClass9, refetchClass9)}
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-center w-48 mx-auto border px-4 py-4 rounded-lg bg-slate-100 ">Class 10</h2>
                    {renderTable(admitCardsClass10, refetchClass10)}
                </div>


            </div>
        </div>
    );
};

export default ShowAdmitCard;
