import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';

function Dashboard() {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <div className='w-full h-[80vh] flex justify-center items-center'>
                <div className='custom-loader'></div>
            </div>
        )
    }

    return (
        <div className="relative flex">

            <Sidebar />
            <div className=" flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Dashboard
