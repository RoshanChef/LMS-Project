import React from 'react'
import { useSelector } from 'react-redux';

function Dashboard() {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <div className='custom-loader'></div>
        )
    }
    
    return (
        <div className='relative flex bg-richblack-400'>
            {/* <Sidebar /> */}
            Dashboard
            <div className=' flex-1 overflow-auto bg-gray-500'>
                <div className='py-10'>
                    {/* <Outlet /> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
