import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaRegNewspaper, FaShoppingCart } from 'react-icons/fa';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import "./custom.css"
import { FaAddressCard, FaNewspaper, FaRegNoteSticky, FaUser } from 'react-icons/fa6';
import { PiStudentBold } from "react-icons/pi";
import { MdClass, MdEvent, MdOutlineAddToQueue, MdOutlineDriveFolderUpload, MdPieChart, MdPublic } from "react-icons/md";
import { LiaReadme } from "react-icons/lia";
import { FaEye } from "react-icons/fa6";
import { BiSlideshow } from "react-icons/bi";
import { TbTimelineEventText } from "react-icons/tb";
import { FaRegRegistered } from "react-icons/fa6";
import { AiFillProfile } from "react-icons/ai";
import { IoReaderOutline } from "react-icons/io5";



const CustomDrawer = ({ isAdmin, isTeacher, isOpen, onClose }) => (


    < Drawer
        open={isOpen}
        onClose={onClose}
        direction='left'
        className=' w-64 '
    >
        <ul className="bg-[#407490] h-full text-black overflow-y-auto">
            <div className='text-center'>
                <h1 className='uppercase text-2xl'>Welcome RCGZHS</h1>
                <span className=' uppercase'>DashBoard</span>

                <hr className='my-1' />
            </div>
            <li id='sidebar'>
                {isAdmin && (
                    <>
                        <NavLink to={'/dashboard/home'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Home
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/users'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaUser />
                                </div>
                                <div>
                                    All User
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/stuInfo'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <PiStudentBold />

                                </div>
                                <div>
                                    Student Info
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/studentInfo'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <PiStudentBold />
                                </div>
                                <div>
                                    Add Student Info
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/result'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaAddressCard />
                                </div>
                                <div>
                                    Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/publicResult'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <MdPublic />
                                </div>
                                <div>
                                    Published Result
                                </div>
                            </div>
                        </NavLink>

                        <NavLink to={'/dashboard/showNews'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaNewspaper />
                                </div>
                                <div>
                                    News
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/adNews'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <MdOutlineDriveFolderUpload />
                                </div>
                                <div>
                                    Upload News
                                </div>
                            </div>

                        </NavLink>

                        <NavLink to={'/dashboard/admit'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <LiaReadme />
                                </div>
                                <div>
                                    Admit Card
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to={'/dashboard/seeAdmit'}>
                            <div className='flex items-center px-2 gap-1 border-b  border-b-gray-400 py-1'>
                                <div>
                                    <FaEye />
                                </div>
                                <div>
                                    Show Admit
                                </div>
                            </div>

                        </NavLink>

                        <NavLink to={'/dashboard/testimonial'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaRegNoteSticky />
                                </div>
                                <div>
                                    Testimonial
                                </div>
                            </div>

                        </NavLink>

                        <NavLink to={'/dashboard/ssc'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <BiSlideshow />
                                </div>
                                <div>
                                    Ssc Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/addEvent'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <MdEvent />
                                </div>
                                <div>
                                    Event Management
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/admissionShow'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1 '>
                                <div>
                                    <FaNewspaper />
                                </div>
                                <div>
                                    Admission
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/NoticeByTeacher'}>
                            <div className='flex items-center px-2 gap-1 py-1'>
                                <div>
                                    <TbTimelineEventText />
                                </div>
                                <div>
                                    Teacher Notice
                                </div>
                            </div>

                        </NavLink>

                    </>
                )}
                {isTeacher && (
                    <>
                        <NavLink to={'/dashboard/teacherHome'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Teacher Home
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/teacherRegister'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaRegRegistered />
                                </div>
                                <div>
                                    Teacher Register
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/registerInfo'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <AiFillProfile />
                                </div>
                                <div>
                                    View Profile
                                </div>
                            </div>

                        </NavLink>

                        <NavLink to={'/dashboard/addResult'}>
                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <MdOutlineAddToQueue />
                                </div>
                                <div>
                                    Add Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/SeeResult'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaAddressCard />
                                </div>
                                <div>
                                    Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/teacherNotice'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <FaRegNewspaper />
                                </div>
                                <div>
                                    Admin Notice
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/teacherRoutineShow'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <MdClass />
                                </div>
                                <div>
                                    Class Routine
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/teacherClassRoutine'}>

                            <div className='flex items-center px-2 gap-1 border-b border-b-gray-400 py-1'>
                                <div>
                                    <IoReaderOutline />
                                </div>
                                <div>
                                    Add Routine
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/passingRate'}>
                            <div className='flex items-center px-2 gap-1 '>
                                <div>
                                    <MdPieChart />
                                </div>
                                <div>
                                    Passing Student
                                </div>
                            </div>

                        </NavLink>
                    </>
                )}

            </li>

            <div> <hr /> </div>

            <div className=''>
                <NavLink to={'/'}>
                    <div className="flex items-center gap-1 border-b border-b-gray-400 py-1 px-2">
                        <FaHome />
                        <span>Home</span>
                    </div>
                </NavLink>
            </div>
        </ul>
    </Drawer >
);

export default CustomDrawer;