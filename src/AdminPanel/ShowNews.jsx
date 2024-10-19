import { useEffect, useState } from 'react';
import useAxiosSecure from '../Hook/AxiosSecure';
import { FaEdit, FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const Modal = ({ children, onClose }) => {
    return (
        <dialog className="modal" open>
            <div className="modal-box w-11/12 max-w-3xl bg-white rounded-lg shadow-lg p-8">
                {children}
                <div className="modal-action flex justify-end mt-4">
                    <button className="btn bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg" onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

const ShowNews = () => {
    const axiosSecure = useAxiosSecure();
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axiosSecure.get('/news');
                setNotices(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotices();
    }, [axiosSecure]);

    const openModal = (index) => {
        setSelectedNotice(notices[index]);
    };

    const closeModal = () => {
        setSelectedNotice(null);
    };

    const handleDeleteNews = (newsId) => {
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
                axiosSecure.delete(`/news/${newsId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setNotices(notices.filter(notice => notice._id !== newsId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The news item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting news item:", error);
                    });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Notice Board Management</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notice</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {notices.map((notice, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.dateTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.head}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-teal-600 hover:text-teal-900" onClick={() => openModal(index)}>
                                            <FaEye className="inline mr-1" /> View
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <NavLink to={`updateNews/${notice._id}`}>
                                            <button className="text-blue-600 hover:text-blue-900 mr-2">
                                                <FaEdit />
                                            </button>
                                        </NavLink>
                                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteNews(notice._id)}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedNotice && (
                    <Modal onClose={closeModal}>
                        <div className="space-y-4">
                            <h3 className="font-bold text-2xl text-center text-gray-800">View News</h3>
                            <p className="font-semibold text-lg text-center">Date & Time: {selectedNotice.dateTime}</p>
                            <p className="font-semibold uppercase">Notice Heading: {selectedNotice.head}</p>
                            <p className="text-justify text-gray-700">{selectedNotice.news}</p>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default ShowNews;
