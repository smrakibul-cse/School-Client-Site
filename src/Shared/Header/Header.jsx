import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import imgUser from '../../assets/imgGalary/user.png';
import logo from '../../assets/cgzaman logo (1).png';
import { AuthContext } from '../../Provider/AuthProvider';
import useAdmin from '../../PanelControl/UseAdmin';
import useTeacher from '../../PanelControl/UseTeacher';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isNameVisible, setIsNameVisible] = useState(false);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isTeacher, isTeacherLoading] = useTeacher();

    const toggleNameVisibility = () => {
        setIsNameVisible(!isNameVisible);
    };

    const handleSignOut = () => {
        logOut()
            .then()
            .catch();
    };

    return (
        <div className="bg-[#2C134D] px-4 py-4 lg:px-8 lg:py-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <div className="flex flex-col lg:flex-row lg:items-center">
                    <img src={logo} className="h-14 lg:h-24 lg:pl-6 w-20 lg:w-32 flex justify- mx-auto" alt="Logo" />
                    <div className="text-center lg:text-left lg:ml-6 mt-2 lg:mt-0">
                        <h1 className="text-white  lg:text-2xl font-bold">রৌমারী সি.জি জামান সরকারি উচ্চ বিদ্যালয়, রৌমারী</h1>
                        <p className="border-b-2 border-dashed hidden lg:block mt-2 mb-2"></p>
                        <h1 className="text-white  lg:text-2xl font-bold">Rowmari C.G Zaman Govt. High School, Rowmari</h1>
                        <h1 className="text-white lg:text-xl font-bold mt-2 lg:px-40">SINCE:1949, EIIN:122542</h1>
                    </div>
                </div>
                <div className="flex items-center mt-4 lg:mt-0 justify-end">
                    <div className="relative" onClick={toggleNameVisibility}>
                        {user && (isAdmin || isTeacher) && (
                            <img src={user?.photoURL || imgUser} className="w-10 h-10 rounded-full cursor-pointer" alt="User" />
                        )}
                        {isNameVisible && user && (isAdmin || isTeacher) && (
                            <p className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white bg-gray-800 rounded-md px-2 py-1 text-sm">{user?.displayName}</p>
                        )}
                    </div>
                    <div className="ml-4">
                        {user && (isAdmin || isTeacher) ? (
                            <>
                                <button onClick={handleSignOut} className="text-xl rounded-md text-red-800 bg-white font-bold px-2 py-2 ml-2">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link to={'/login'}>
                                <button className="text-xl rounded-md text-red-800 bg-white font-bold px-2 py-2">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
