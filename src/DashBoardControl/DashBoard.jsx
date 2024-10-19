import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../PanelControl/UseAdmin';
import CustomDrawer from './CustomDrawer';
import { useState } from 'react';
import { FaAlignJustify } from "react-icons/fa";
import UseTeacher from '../PanelControl/UseTeacher';


const DashBoard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isTeacher, isTeacherLoading] = UseTeacher();
    const [drawerOpen, setDrawerOpen] = useState(false);


    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    if (isAdminLoading || isTeacherLoading) {
        return <div className='flex mx-auto justify-center h-[100vh]'>
            <span className="loading  loading-ring w-60"></span>
        </div>;
    }

    if (!isAdmin && !isTeacher) {
        return (
            <div className=''>
                <p className='text-center mb-3 text-red-500'>Data is loaded But no role detected.</p>
                {/* Assuming you have `img` imported or defined */}

                <Link to='/'>
                    <button className='btn mt-5 flex mx-auto justify-center'>Go Back Home</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex bg-white">

            <CustomDrawer isAdmin={isAdmin} isTeacher={isTeacher} isOpen={drawerOpen} onClose={toggleDrawer} />

            <div className="flex-1 ">
                <div>
                    {/* Button to toggle the drawer */}

                    <button className='bg-[#407490] p-6   w-full text-black text-2xl' onClick={toggleDrawer}><FaAlignJustify /></button>

                    <hr />

                </div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default DashBoard;
