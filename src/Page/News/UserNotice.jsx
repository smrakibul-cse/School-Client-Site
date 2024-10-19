import { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../Hook/AxiosSecure';
import NavBar from '../../Navber/NavBar';
import './UserNotice.css';
import logo from '../../assets/slider/cgzaman logo (1).png';
import { useReactToPrint } from 'react-to-print';

const Modal = ({ children, onClose }) => {

    return (
        <dialog className="modal" open>
            <div className="modal-box">
                {children}
                <div className="modal-action">
                    <button className="btn2" onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

const UserNotice = () => {
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

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div className='relative z-10'>
            <NavBar />
            <div className="user-notice-container">
                <div className="notice-board">
                    <h1 className="notice-board-heading">Notice Board</h1>
                    <div className="notice-list">
                        {notices.map((notice, index) => (
                            <div key={index} className="notice-item" onClick={() => openModal(index)}>
                                <div className="notice-header">
                                    <span className="notice-date">{notice.dateTime}</span>
                                    <span className="notice-view-icon"><FaEye /></span>
                                </div>
                                <div className="notice-content">
                                    <h3>{notice.head}</h3>
                                    <p>{notice.news}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedNotice && (
                    <Modal onClose={closeModal}>
                        <div className=''>
                            <div ref={componentRef} id="modal-content" className="modal-content border rounded-lg "  >
                                <div className=''>
                                    <div className='border-b-2 pb-4 mb-7'>
                                        <div className='flex justify-center'>
                                            <img className='h-24 w-24' src={logo} alt="logo" />
                                        </div>
                                        <div className='text-center'>
                                            <h1 className='text-2xl font-bold'>Rowmari C.G Zaman Govt. High School</h1>
                                            <h1 className=' font-bold text-[#11161e]'>Rowmari, Kurigram, Rangpur</h1>
                                            <h1 className='font-bold '>CBSE Affiliation No. 1030591, School Code.132043</h1>
                                            <h1 className='font-bold text-[#972338]'>Email: rcgzghs132043@gmail.com website: https://rcgzghs.edu.bd</h1>
                                        </div>
                                    </div>
                                </div>
                                <p className='flex justify-end'><span className="bold">Date & Time:</span> {selectedNotice.dateTime}</p>
                                <p className='font-bold text-center py-2'> {selectedNotice.head}</p>
                                <p className='text-justify py-2'>{selectedNotice.news}</p>
                                <div className='flex justify-end text-center mt-10 mb-6'>
                                    <p><span className='font-bold text-gray-600 text-xl'>(Abu Horayra)</span> <br />
                                        <span className='font-bold text-gray-600 text-[16px]'>Head Teacher</span> <br />
                                        <span className='text-[18px] font-bold text-gray-600'> Rowmari C. G. Zaman High School</span> <br />
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="download-button-container flex justify-center mt-4">
                            <button className="download-button btn btn-outline" onClick={handlePrint}>
                                <span>Download Notice</span>
                            </button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default UserNotice;
