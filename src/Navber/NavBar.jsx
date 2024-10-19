import React, { useContext, useEffect, useState } from 'react';
import './navber.css';
import { NavLink } from 'react-router-dom';
import useAdmin from '../PanelControl/UseAdmin';
import UseTeacher from '../PanelControl/UseTeacher';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hook/AxiosSecure';

const NavBar = () => {
    const [isResponsive, setIsResponsive] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [isAdmin] = useAdmin();
    const [isTeacher] = UseTeacher();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axiosSecure.get(`/users/role/${user.email}`);
                const { student } = response.data;
                setIsStudent(student);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        if (user) {
            fetchUserRole();
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleResponsive = () => {
        setIsResponsive(!isResponsive);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const toggleDropdown2 = () => {
        setIsDropdownOpen2(!isDropdownOpen2);
    }
    const toggleDropdown3 = () => {
        setIsDropdownOpen3(!isDropdownOpen3);
    }
    const toggleDropdown4 = () => {
        setIsDropdownOpen4(!isDropdownOpen4);
    }

    return (
        <div className='overflow-y-auto'>
            <div className={`roboto-regular w-full ${isFixed ? 'fixed top-0 left-0' : ''}`}>
                <hr className='' />
                <div className={isResponsive ? "topnav responsive" : "topnav"} id="myTopnav">
                    <div className='md:flex md:mx-auto md:justify-center'>

                        <NavLink to={'/'}>Home</NavLink>

                        <div className="dropdown1">
                            <button className="dropbtn md:block hidden" onClick={toggleDropdown}>About Us
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={isDropdownOpen ? "dropdown-content show" : "dropdown-content"}>
                                <NavLink to={'/about'}>About Us</NavLink>
                                <NavLink to={'/vision'}>Vision</NavLink>
                                <NavLink to={'/mission'}>Mission</NavLink>
                                <NavLink to={'/documentary'}>Documentary</NavLink>
                            </div>
                        </div>

                        <div className="dropdown1">
                            <button className="dropbtn md:block hidden" onClick={toggleDropdown2}>Teacher
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={isDropdownOpen2 ? "dropdown-content show" : "dropdown-content"}>
                                <NavLink to={'/oldHeadTeacher'}>Former Headteachers</NavLink>
                                <NavLink to={'/headTeacher'}>Head Teacher</NavLink>
                                <NavLink to={'/allTeacher'}>All Teacher</NavLink>
                            </div>
                        </div>

                        <div className="dropdown1">
                            <button className="dropbtn md:block hidden" onClick={toggleDropdown3}>Student
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={isDropdownOpen3 ? "dropdown-content show" : "dropdown-content"}>
                                <NavLink to={'/allStu'}>All Students</NavLink>
                                <NavLink to={'/total'}>Class Summary</NavLink>
                                <NavLink to={'/stuAdmit'}>Exam Routine</NavLink>
                                <NavLink to={'/publicResult'}>All Result</NavLink>
                                <NavLink to={'/admit'}>Admit Card</NavLink>
                            </div>
                        </div>

                        <NavLink to={'/result'}>Result</NavLink>

                        <div className="dropdown1">
                            <button className="dropbtn md:block hidden" onClick={toggleDropdown4}>Administration
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={isDropdownOpen4 ? "dropdown-content show" : "dropdown-content"}>
                                <NavLink to={'/news'}>News</NavLink>
                                <NavLink to={'/ssc'}>Ssc Result</NavLink>
                                <NavLink to={'/studentEvent'}>Event Management</NavLink>
                                <NavLink to={'/contract'}>Contract</NavLink>
                                <NavLink to={'/classRoutine'}>Class Routine</NavLink>
                                <NavLink to={'/e-library'}>E-Library</NavLink>
                            </div>
                        </div>

                        {(isAdmin) && (
                            <NavLink to={'/dashBoard/home'}>DashBoard</NavLink>
                        )}
                        {(isTeacher) && (
                            <NavLink to={'/dashBoard/teacherHome'}>DashBoard</NavLink>
                        )}

                        {isStudent && (
                            <div className="dropdown1">
                                <button className="dropbtn md:block hidden" onClick={toggleDropdown3}>Student DashBoard
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={isDropdownOpen3 ? "dropdown-content show" : "dropdown-content"}>
                                    <NavLink to={'/result'}>Result</NavLink>
                                    <NavLink to={'/admit'}>Admit Card</NavLink>
                                </div>
                            </div>
                        )}

                        <div className="dropdown1">
                            <button className="dropbtn md:block hidden" onClick={toggleDropdown3}>Admission
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={isDropdownOpen3 ? "dropdown-content " : "dropdown-content"}>
                                <NavLink to={'/apply'}>Apply</NavLink>
                                <NavLink to={'/fromDownload'}>Download Form</NavLink>
                                <NavLink to={'/admissionNotice'}>Admission News</NavLink>
                            </div>
                        </div>


                        <a href="#" className="icon" onClick={toggleResponsive}>&#9776;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
