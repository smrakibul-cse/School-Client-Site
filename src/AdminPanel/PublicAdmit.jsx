import React, { useState, useEffect } from 'react';
import useAxiosSecure from "../Hook/AxiosSecure";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const PublicAdmit = () => {
    const axiosSecure = useAxiosSecure();
    const [admitData, setAdmitData] = useState([]);

    useEffect(() => {
        axiosSecure.get('/Admit/publish')
            .then(response => {
                setAdmitData(response.data);
            })
            .catch(error => {
                console.error('Error fetching public admit data:', error);
            });
    }, []);

    const handleUnPublishResults = () => {
        axiosSecure.post('/Admit/unpublish')
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setAdmitData([]);
                    toast.success('All published Admit have been deleted');
                }
            })
            .catch(error => {
                console.error('Error unpublishing admit:', error);
            });
    };

    return (
        <div>
            <h1 className='text-2xl text-center font-bold mb-8'>Public Admit Data</h1>
            <table className='border mx-auto lg:w-[60%]'>
                <thead>
                    <tr className='border text-center'>
                        <th className='border text-center'>ID</th>
                        <th className='border text-center'>Class</th>
                        <th className='border text-center'>Shift</th>
                        <th className='border text-center'>Subject</th>
                        <th className='border text-center'>Date</th>
                        <th className='border text-center'>Day of Week</th>
                        <th className='border text-center'>Exam</th>
                        <th className='border text-center'>Exam Time</th>
                    </tr>
                </thead>
                <tbody>
                    {admitData.map((item, index) => (
                        <tr key={index}>
                            <td className='border text-center'>{index + 1}</td>
                            <td className='border text-center'>{item.class}</td>
                            <td className='border text-center'>{item.shift}</td>
                            <td className='border text-center'>{item.subject}</td>
                            <td className='border text-center'>{item.date}</td>
                            <td className='border text-center'>{item.dayOfWeek}</td>
                            <td className='border text-center'>{item.exam}</td>
                            <td className='border text-center'>{item.exam_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={handleUnPublishResults}
                className='btn btn-outline flex justify-center mx-auto mt-9'
                disabled={admitData.length === 0}
            >
                UnPublic Admit
            </button>

            <button className='text-center flex mx-auto mt-6 mb-8 border-b-2 border-blue-400'>
                <Link to={"/dashboard/seeAdmit"}>Go Back To Admit Card Page</Link>
            </button>
        </div>
    );
};

export default PublicAdmit;
